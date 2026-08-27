import fs from "node:fs";
import path from "node:path";
import {verifyNode} from "./verify-node.mjs";

const clone = value => JSON.parse(JSON.stringify(value));
const uniqueCodes = result => [...new Set(result.issues.map(item => item.code))];

function deriveMutations(node) {
  const mutations = [];
  const oneGeneratorIndex = node.generators.findIndex(generator => ["one", "value"].includes(generator.answer.kind));
  if (oneGeneratorIndex >= 0) {
    const mutated = clone(node);
    const original = mutated.generators[oneGeneratorIndex].answer.value;
    mutated.generators[oneGeneratorIndex].answer.value = {
      op: "add",
      args: [original, {literal: 1}]
    };
    mutations.push({
      name: "wrong-answer-formula",
      expectedCode: node.verification.oracle === "value"
        ? "answer-does-not-match-value"
        : "answer-does-not-satisfy-problem",
      node: mutated
    });
  }

  const specialGeneratorIndex = node.generators.findIndex(generator => ["none", "infinite"].includes(generator.answer.kind));
  if (specialGeneratorIndex >= 0) {
    const mutated = clone(node);
    const answer = mutated.generators[specialGeneratorIndex].answer;
    answer.kind = answer.kind === "none" ? "infinite" : "none";
    mutations.push({
      name: "wrong-special-classification",
      expectedCode: answer.kind === "none" ? "claimed-none-but-solution-found" : "claimed-infinite-but-counterexample-found",
      node: mutated
    });
  } else {
    const mutated = clone(node);
    mutated.generators[0].constraints.push({literal: false});
    mutations.push({
      name: "explicitly-unsatisfiable-constraint",
      expectedCode: "unsatisfiable-literal-constraint",
      node: mutated
    });
  }

  {
    const mutated = clone(node);
    mutated.generators[0].problem = {
      op: "and",
      args: [
        mutated.generators[0].problem,
        {op: "equal", args: [{var: "undeclaredmutation"}, {literal: 0}]}
      ]
    };
    mutations.push({
      name: "undeclared-problem-variable",
      expectedCode: "undeclared-problem-variable",
      node: mutated
    });
  }

  {
    const mutated = clone(node);
    mutated.misconceptions[0].detector = "linear.detector-that-does-not-exist";
    mutations.push({
      name: "missing-detector",
      expectedCode: "missing-detector-registry",
      node: mutated
    });
  }
  return mutations;
}

const nodePaths = process.argv.slice(2);
if (nodePaths.length < 2) {
  console.error("Usage: node mutation-suite.mjs NODE_A.json NODE_B.json [more nodes]");
  process.exit(2);
}

const originals = [];
const mutations = [];
for (const nodePath of nodePaths) {
  const node = JSON.parse(fs.readFileSync(path.resolve(nodePath), "utf8"));
  const originalResult = verifyNode(node);
  originals.push({
    nodeId: node.id,
    status: originalResult.status,
    caseCount: originalResult.cases.length,
    issueCodes: uniqueCodes(originalResult)
  });
  for (const mutation of deriveMutations(node)) {
    const result = verifyNode(mutation.node);
    const actualCodes = uniqueCodes(result);
    mutations.push({
      nodeId: node.id,
      name: mutation.name,
      expectedStatus: "fail",
      actualStatus: result.status,
      expectedCode: mutation.expectedCode,
      actualCodes,
      passed: result.status === "fail" && actualCodes.includes(mutation.expectedCode)
    });
  }
}

const report = {
  verifier: "parameterized-exact-rational-v1",
  originalCount: originals.length,
  mutationCount: mutations.length,
  originals,
  mutations,
  status: originals.every(item => item.status === "pass") && mutations.length === nodePaths.length * 4 && mutations.every(item => item.passed)
    ? "pass"
    : "fail"
};

const reportPath = path.resolve("authoring", "cross-node-mutation-report.json");
fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);
for (const item of originals) console.log(`ORIGINAL ${item.nodeId}: ${item.status.toUpperCase()} ${item.caseCount}`);
for (const item of mutations) console.log(`MUTATION ${item.nodeId}/${item.name}: ${item.passed ? "EXPECTED FAIL" : "UNEXPECTED"} [${item.actualCodes.join(", ")}]`);
console.log(`SUITE ${report.status.toUpperCase()}: ${mutations.filter(item => item.passed).length}/${mutations.length} expected failures`);
if (report.status !== "pass") process.exitCode = 1;
