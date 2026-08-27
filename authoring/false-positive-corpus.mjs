import fs from "node:fs";
import {
  rational, evaluateExact, equalRational, divideRational,
  subtractRational, linearPolynomial, isZero
} from "./exact-rational.mjs";
import {detectors, detectorPolicy, selectHints} from "./detectors.mjs";

const lit = literal => ({literal});
const variable = name => ({var: name});
const op = (name, ...args) => ({op: name, args});
const eq = (a, b) => op("equal", a, b);
const add = (a, b) => op("add", a, b);
const sub = (a, b) => op("subtract", a, b);
const mul = (a, b) => op("multiply", a, b);
const div = (a, b) => op("divide", a, b);
const x = variable("x");

const nodes = [
  "nodes/solve-equations-with-variables-on-both-sides.json",
  "nodes/solve-multiplication-equations.json",
  "nodes/multiply-two-fractions.json"
].map(path => JSON.parse(fs.readFileSync(path, "utf8")));

function environments(generator, count) {
  const names = Object.keys(generator.parameters);
  const results = [];
  const visit = (index, environment) => {
    if (results.length >= count) return;
    if (index === names.length) {
      try {
        if (generator.constraints.every(constraint => evaluateExact(constraint, environment) === true)) results.push({...environment});
      } catch {}
      return;
    }
    const name = names[index];
    const {min, max} = generator.parameters[name];
    const values = [];
    for (let value = min; value <= max; value += 1) values.push(value);
    values.sort((a, b) => Math.abs(a) - Math.abs(b) || a - b);
    for (const value of values) visit(index + 1, {...environment, [name]: value});
  };
  visit(0, {});
  return results;
}

function instantiate(expression, environment) {
  if (Object.hasOwn(expression, "var") && Object.hasOwn(environment, expression.var)) return lit(environment[expression.var]);
  if (!expression.args) return structuredClone(expression);
  return {op: expression.op, args: expression.args.map(argument => instantiate(argument, environment))};
}

const rationalAst = value => value.denominator === 1n
  ? lit(Number(value.numerator))
  : div(lit(Number(value.numerator)), lit(Number(value.denominator)));

function rootOfEquation(equation) {
  const left = linearPolynomial(equation.args[0]);
  const right = linearPolynomial(equation.args[1]);
  const coefficient = subtractRational(left.coefficient, right.coefficient);
  const constant = subtractRational(left.constant, right.constant);
  if (isZero(coefficient)) throw new Error("corpus route requires a unique linear solution");
  return divideRational(rational(-constant.numerator, constant.denominator), coefficient);
}

function assertValidEquationTrace(trace) {
  const root = rootOfEquation(trace.steps[0]);
  for (const step of trace.steps) {
    if (step.op !== "equal" || evaluateExact(step, {x: root}) !== true || !equalRational(rootOfEquation(step), root)) {
      throw new Error(`invalid generated equation route: ${trace.source}`);
    }
  }
}

const corpus = [];
const bothSides = nodes[0].generators.find(item => item.id === "integer-unique-solution");
for (const [index, env] of environments(bothSides, 24).entries()) {
  const {a, b, c, d} = env;
  const original = instantiate(bothSides.problem, env);
  const root = rational(BigInt(d - b), BigInt(a - c));
  const steps = index % 2 === 0
    ? [
        original,
        eq(add(mul(lit(a - c), x), lit(b)), lit(d)),
        eq(lit(d), add(mul(lit(a - c), x), lit(b))),
        eq(lit(d - b), mul(lit(a - c), x)),
        eq(rationalAst(root), x),
        eq(x, rationalAst(root))
      ]
    : [
        original,
        eq(lit(b), add(mul(lit(c - a), x), lit(d))),
        eq(lit(b - d), mul(lit(c - a), x)),
        eq(mul(lit(c - a), x), lit(b - d)),
        eq(x, rationalAst(root))
      ];
  const trace = {source: `${nodes[0].id}/${bothSides.id}`, route: index % 2 ? "collect-right" : "collect-left-swap", steps};
  assertValidEquationTrace(trace);
  corpus.push(trace);
}

const multiplicationNode = nodes[1];
for (const generator of multiplicationNode.generators) {
  for (const env of environments(generator, 6)) {
    const original = instantiate(generator.problem, env);
    const root = rational(BigInt(env.b), BigInt(env.a));
    const trace = {
      source: `${multiplicationNode.id}/${generator.id}`,
      route: "swap-divide-swap",
      steps: [
        original,
        eq(lit(env.b), mul(lit(env.a), x)),
        eq(rationalAst(root), div(mul(lit(env.a), x), lit(env.a))),
        eq(rationalAst(root), x),
        eq(x, rationalAst(root))
      ]
    };
    assertValidEquationTrace(trace);
    corpus.push(trace);
  }
}

const fractionNode = nodes[2];
for (const generator of fractionNode.generators) {
  for (const env of environments(generator, 9)) {
    const original = instantiate(generator.problem, env);
    const value = evaluateExact(original);
    corpus.push({
      source: `${fractionNode.id}/${generator.id}`,
      route: "multiply-then-reduce",
      steps: [original, div(mul(lit(env.a), lit(env.c)), mul(lit(env.b), lit(env.d))), rationalAst(value)]
    });
  }
}

const decimalRegression = {
  source: "regression/exact-decimal-simplification",
  route: "simplify-right-side",
  steps: [
    eq(mul(lit(0.3), x), add(lit(0.1), lit(0.2))),
    eq(mul(lit(0.3), x), lit(0.3))
  ]
};
assertValidEquationTrace(decimalRegression);
corpus.push(decimalRegression);

const findings = [];
for (const [index, trace] of corpus.entries()) {
  const fired = selectHints(trace);
  if (fired.length) findings.push({index, source: trace.source, route: trace.route, fired, steps: trace.steps});
}

let nonlinearThrows = false;
try {
  linearPolynomial(mul(x, x));
} catch (error) {
  nonlinearThrows = error.message.includes("nonlinear");
}

const report = {
  corpusSource: "node-generator-declarations",
  traceCount: corpus.length,
  minimumRequired: 50,
  fiveStepTraceCount: corpus.filter(item => item.steps.length >= 5).length,
  includesUnitCoefficients: corpus.some(item => item.source.endsWith("/unit-coefficient")),
  includesSideSwaps: corpus.some(item => item.route.includes("swap")),
  includesCollectRight: corpus.some(item => item.route === "collect-right"),
  includesFractionalAnswers: corpus.some(item => item.steps.some(step => step.op === "divide")),
  includesExactDecimalRegression: true,
  nonlinearInputThrows: nonlinearThrows,
  detectorPolicy,
  falsePositives: findings,
  status: corpus.length >= 50 && findings.length === 0 && nonlinearThrows && detectorPolicy.mayChangeGrade === false ? "pass" : "fail"
};
fs.writeFileSync("reports/false-positive-corpus-report.json", `${JSON.stringify(report, null, 2)}\n`);
console.log(`CORPUS ${report.status.toUpperCase()}: ${report.traceCount} correct traces, ${findings.length} false positives`);
console.log(`COVERAGE: ${report.fiveStepTraceCount} long traces; unit coefficients ${report.includesUnitCoefficients}; nonlinear throws ${report.nonlinearInputThrows}`);
if (report.status !== "pass") {
  for (const finding of findings) console.log(`FALSE POSITIVE ${finding.index} ${finding.source}: ${finding.fired.join(", ")}`);
  process.exitCode = 1;
}
