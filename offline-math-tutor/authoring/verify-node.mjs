import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";
import {detectors, detectorFixtures} from "./detectors.mjs";

const registryPath = new URL("./detector-registry.json", import.meta.url);
const registry = JSON.parse(fs.readFileSync(registryPath, "utf8"));

const abs = value => value < 0n ? -value : value;
function gcd(a, b) {
  a = abs(a);
  b = abs(b);
  while (b !== 0n) [a, b] = [b, a % b];
  return a;
}

function rational(numerator, denominator = 1n) {
  if (denominator === 0n) throw new Error("division by zero");
  if (denominator < 0n) {
    numerator = -numerator;
    denominator = -denominator;
  }
  const divisor = gcd(numerator, denominator) || 1n;
  return {numerator: numerator / divisor, denominator: denominator / divisor};
}

const asRational = value => {
  if (typeof value === "number" && Number.isInteger(value)) return rational(BigInt(value));
  if (value && typeof value.numerator === "bigint") return value;
  throw new Error("expected exact integer or rational");
};
const add = (a, b) => rational(a.numerator * b.denominator + b.numerator * a.denominator, a.denominator * b.denominator);
const subtract = (a, b) => rational(a.numerator * b.denominator - b.numerator * a.denominator, a.denominator * b.denominator);
const multiply = (a, b) => rational(a.numerator * b.numerator, a.denominator * b.denominator);
const divide = (a, b) => rational(a.numerator * b.denominator, a.denominator * b.numerator);
const equalRational = (a, b) => a.numerator === b.numerator && a.denominator === b.denominator;
const compare = (a, b) => {
  const difference = a.numerator * b.denominator - b.numerator * a.denominator;
  return difference < 0n ? -1 : difference > 0n ? 1 : 0;
};

export function evaluate(expression, environment) {
  if (Object.hasOwn(expression, "literal")) {
    return typeof expression.literal === "boolean" ? expression.literal : rational(BigInt(expression.literal));
  }
  if (Object.hasOwn(expression, "var")) {
    if (!Object.hasOwn(environment, expression.var)) throw new Error(`unbound variable: ${expression.var}`);
    return asRational(environment[expression.var]);
  }
  const values = expression.args.map(argument => evaluate(argument, environment));
  switch (expression.op) {
    case "add": return values.reduce(add);
    case "subtract": return subtract(values[0], values[1]);
    case "multiply": return values.reduce(multiply);
    case "divide": return divide(values[0], values[1]);
    case "mod": {
      const [left, right] = values;
      if (left.denominator !== 1n || right.denominator !== 1n) throw new Error("mod requires integers");
      return rational(left.numerator % right.numerator);
    }
    case "equal": return typeof values[0] === "boolean" ? values[0] === values[1] : equalRational(values[0], values[1]);
    case "not-equal": return typeof values[0] === "boolean" ? values[0] !== values[1] : !equalRational(values[0], values[1]);
    case "less": return compare(values[0], values[1]) < 0;
    case "less-equal": return compare(values[0], values[1]) <= 0;
    case "greater": return compare(values[0], values[1]) > 0;
    case "greater-equal": return compare(values[0], values[1]) >= 0;
    case "and": return values.every(Boolean);
    case "or": return values.some(Boolean);
    case "between-inclusive": return compare(values[0], values[1]) >= 0 && compare(values[0], values[2]) <= 0;
    default: throw new Error(`unsupported operator: ${expression.op}`);
  }
}

export function serializeRational(value) {
  return {
    numerator: value.numerator.toString(),
    denominator: value.denominator.toString(),
    text: value.denominator === 1n ? value.numerator.toString() : `${value.numerator}/${value.denominator}`
  };
}

function variablesIn(expression, found = new Set()) {
  if (Object.hasOwn(expression, "var")) found.add(expression.var);
  for (const argument of expression.args ?? []) variablesIn(argument, found);
  return found;
}
const issue = (code, details = {}) => ({code, ...details});

function staticChecks(node) {
  const issues = [];
  if (node.schemaVersion !== 4) issues.push(issue("wrong-schema-version", {actual: node.schemaVersion}));
  if (!["equation-classification", "value"].includes(node.verification?.oracle)) issues.push(issue("unsupported-oracle"));
  for (const generator of node.generators ?? []) {
    const parameters = new Set(Object.keys(generator.parameters ?? {}));
    const learners = new Set(generator.learnerVariables ?? []);
    if (node.verification.oracle === "equation-classification" && learners.size !== 1) {
      issues.push(issue("oracle-requires-one-learner-variable", {generator: generator.id}));
    }
    if (node.verification.oracle === "value" && learners.size !== 0) {
      issues.push(issue("value-oracle-forbids-learner-variables", {generator: generator.id}));
    }
    for (const [name, definition] of Object.entries(generator.parameters ?? {})) {
      if (learners.has(name)) issues.push(issue("parameter-learner-name-collision", {generator: generator.id, name}));
      if (definition.type !== "integer" || !Number.isInteger(definition.min) || !Number.isInteger(definition.max) || definition.min > definition.max) {
        issues.push(issue("invalid-parameter-definition", {generator: generator.id, name}));
      }
    }
    for (const name of variablesIn(generator.problem)) {
      if (!parameters.has(name) && !learners.has(name)) issues.push(issue("undeclared-problem-variable", {generator: generator.id, name}));
    }
    for (const constraint of generator.constraints ?? []) {
      for (const name of variablesIn(constraint)) {
        if (!parameters.has(name)) issues.push(issue("undeclared-constraint-variable", {generator: generator.id, name}));
      }
    }
    if (generator.answer?.value) {
      for (const name of variablesIn(generator.answer.value)) {
        if (!parameters.has(name)) issues.push(issue("undeclared-answer-variable", {generator: generator.id, name}));
      }
    }
  }
  for (const misconception of node.misconceptions ?? []) {
    const name = misconception.detector;
    if (!registry.detectors.includes(name)) issues.push(issue("missing-detector-registry", {detector: name}));
    else if (typeof detectors[name] !== "function") issues.push(issue("missing-detector-implementation", {detector: name}));
    else if (!detectorFixtures[name]) issues.push(issue("missing-detector-fixture", {detector: name}));
    else {
      const fixtures = detectorFixtures[name];
      if (!Array.isArray(fixtures.positives) || fixtures.positives.length < 3) {
        issues.push(issue("insufficient-positive-detector-fixtures", {detector: name}));
      }
      if (!Array.isArray(fixtures.negatives) || fixtures.negatives.length < 5) {
        issues.push(issue("insufficient-negative-detector-fixtures", {detector: name}));
      }
      if (fixtures.positives?.some(fixture => detectors[name](fixture) !== true)
        || fixtures.negatives?.some(fixture => detectors[name](fixture) !== false)) {
        issues.push(issue("detector-fixture-failure", {detector: name}));
      }
    }
  }
  return issues;
}

function mulberry32(seed) {
  return function random() {
    let value = seed += 0x6D2B79F5;
    value = Math.imul(value ^ value >>> 15, value | 1);
    value ^= value + Math.imul(value ^ value >>> 7, value | 61);
    return ((value ^ value >>> 14) >>> 0) / 4294967296;
  };
}

function generateEnvironment(generator, random, maxAttempts = 10000) {
  if ((generator.constraints ?? []).some(item => Object.hasOwn(item, "literal") && item.literal === false)) {
    return {error: "unsatisfiable-literal-constraint"};
  }
  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    const environment = {};
    for (const [name, definition] of Object.entries(generator.parameters)) {
      environment[name] = Math.floor(random() * (definition.max - definition.min + 1)) + definition.min;
    }
    try {
      if (generator.constraints.every(constraint => evaluate(constraint, environment) === true)) return {environment, attempts: attempt};
    } catch {
      // Undefined arithmetic rejects only this candidate.
    }
  }
  return {error: "generation-inconclusive"};
}

function resolveAnswer(answer, environment) {
  return ["one", "value"].includes(answer.kind)
    ? {kind: answer.kind, value: evaluate(answer.value, environment)}
    : {kind: answer.kind};
}

function classificationSamples(environment, random) {
  const samples = [rational(0n), rational(1n), rational(-1n)];
  for (let index = 0; index < 24; index += 1) {
    const numerator = BigInt(Math.floor(random() * 401) - 200);
    const denominator = BigInt(Math.floor(random() * 25) + 1);
    samples.push(rational(numerator, denominator));
  }
  const parameters = Object.values(environment).map(value => rational(BigInt(value)));
  const derived = [...parameters];
  for (const left of parameters) {
    for (const right of parameters) derived.push(subtract(left, right));
  }
  samples.push(...derived);
  for (const numerator of derived) {
    for (const denominator of derived) {
      if (denominator.numerator !== 0n) samples.push(divide(numerator, denominator));
    }
  }
  const unique = new Map();
  for (const sample of samples) unique.set(`${sample.numerator}/${sample.denominator}`, sample);
  return [...unique.values()];
}

function verifyAnswer(node, generator, environment, answer, random) {
  if (node.verification.oracle === "value") {
    const actual = evaluate(generator.problem, environment);
    return equalRational(actual, answer.value)
      ? null
      : issue("answer-does-not-match-value", {generator: generator.id});
  }
  const learner = generator.learnerVariables[0];
  if (answer.kind === "one") {
    return evaluate(generator.problem, {...environment, [learner]: answer.value}) === true
      ? null
      : issue("answer-does-not-satisfy-problem", {generator: generator.id});
  }
  const samples = classificationSamples(environment, random);
  const results = samples.map(value => evaluate(generator.problem, {...environment, [learner]: value}));
  if (answer.kind === "infinite" && !results.every(Boolean)) return issue("claimed-infinite-but-counterexample-found", {generator: generator.id});
  if (answer.kind === "none" && !results.every(value => value === false)) return issue("claimed-none-but-solution-found", {generator: generator.id});
  return null;
}

export function verifyNode(node, seed = 185) {
  const issues = staticChecks(node);
  const cases = [];
  if (issues.length) return {status: "fail", issues, cases};
  const random = mulberry32(seed);
  const total = node.verification.generatedCaseCount;
  const base = Math.floor(total / node.generators.length);
  let remainder = total % node.generators.length;
  for (const generator of node.generators) {
    const required = base + (remainder-- > 0 ? 1 : 0);
    for (let index = 0; index < required; index += 1) {
      const generated = generateEnvironment(generator, random);
      if (generated.error) {
        issues.push(issue(generated.error, {generator: generator.id}));
        break;
      }
      const answer = resolveAnswer(generator.answer, generated.environment);
      const failure = verifyAnswer(node, generator, generated.environment, answer, random);
      cases.push({
        generator: generator.id,
        parameters: generated.environment,
        attempts: generated.attempts,
        answer: ["one", "value"].includes(answer.kind)
          ? {kind: answer.kind, value: serializeRational(answer.value)}
          : answer,
        passed: failure === null
      });
      if (failure) issues.push(failure);
    }
  }
  return {status: issues.length === 0 && cases.length === total ? "pass" : "fail", issues, cases};
}

function runCli() {
  const [, , inputPath, outputPath] = process.argv;
  if (!inputPath) {
    console.error("Usage: node verify-node.mjs NODE.json [REPORT.json]");
    process.exitCode = 2;
    return;
  }
  const resolved = path.resolve(inputPath);
  const node = JSON.parse(fs.readFileSync(resolved, "utf8"));
  const result = verifyNode(node);
  const report = {nodeId: node.id, arithmetic: "exact-rational-v1", ...result};
  if (outputPath) fs.writeFileSync(path.resolve(outputPath), `${JSON.stringify(report, null, 2)}\n`);
  console.log(`${node.id}: ${result.status.toUpperCase()} ${result.cases.length}/${node.verification.generatedCaseCount}`);
  if (result.issues.length) console.log([...new Set(result.issues.map(item => item.code))].join(", "));
  if (result.status !== "pass") process.exitCode = 1;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) runCli();
