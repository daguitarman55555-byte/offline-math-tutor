const lit = literal => ({literal});
const variable = name => ({var: name});
const op = (name, ...args) => ({op: name, args});
const eq = (left, right) => op("equal", left, right);
const add = (a, b) => op("add", a, b);
const sub = (a, b) => op("subtract", a, b);
const mul = (a, b) => op("multiply", a, b);
const div = (a, b) => op("divide", a, b);
const x = variable("x");

const gcd = (a, b) => {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) [a, b] = [b, a % b];
  return a;
};

function evaluate(node, xValue = 0) {
  if (Object.hasOwn(node, "literal")) return Number(node.literal);
  if (node.var === "x") return xValue;
  if (!node.op) return Number.NaN;
  const values = node.args.map(arg => evaluate(arg, xValue));
  if (node.op === "add") return values[0] + values[1];
  if (node.op === "subtract") return values[0] - values[1];
  if (node.op === "multiply") return values[0] * values[1];
  if (node.op === "divide") return values[0] / values[1];
  return Number.NaN;
}

const polynomial = node => {
  const constant = evaluate(node, 0);
  return {x: evaluate(node, 1) - constant, constant};
};
const samePolynomial = (a, b) => a.x === b.x && a.constant === b.constant;
const equationPair = attempt => {
  if (!Array.isArray(attempt.steps) || attempt.steps.length < 2) return null;
  const previous = attempt.steps.at(-2);
  const current = attempt.steps.at(-1);
  if (previous.op !== "equal" || current.op !== "equal") return null;
  return {
    beforeLeft: polynomial(previous.args[0]), beforeRight: polynomial(previous.args[1]),
    afterLeft: polynomial(current.args[0]), afterRight: polynomial(current.args[1])
  };
};

function changeOneSideOnly(attempt) {
  const pair = equationPair(attempt);
  if (!pair) return false;
  const leftChanged = !samePolynomial(pair.beforeLeft, pair.afterLeft);
  const rightChanged = !samePolynomial(pair.beforeRight, pair.afterRight);
  return leftChanged !== rightChanged;
}

function moveTermWithoutInverse(attempt) {
  const p = equationPair(attempt);
  if (!p) return false;
  const deltas = [p.afterLeft.x - p.beforeLeft.x, p.afterRight.x - p.beforeRight.x,
    p.afterLeft.constant - p.beforeLeft.constant, p.afterRight.constant - p.beforeRight.constant];
  return (deltas[0] !== 0 && deltas[0] === -deltas[1]) ||
    (deltas[2] !== 0 && deltas[2] === -deltas[3]);
}

function combineUnlikeTerms(attempt) {
  const p = equationPair(attempt);
  if (!p) return false;
  for (const [before, after] of [[p.beforeLeft, p.afterLeft], [p.beforeRight, p.afterRight]]) {
    if (before.x !== 0 && before.constant !== 0 &&
        ((after.x === before.x + before.constant && after.constant === 0) ||
         (after.x === 0 && after.constant === before.x + before.constant))) return true;
  }
  return false;
}

function multiplicationEquation(attempt) {
  const first = attempt.steps?.[0];
  const last = attempt.steps?.at(-1);
  if (first?.op !== "equal" || last?.op !== "equal") return null;
  const left = first.args[0];
  if (left?.op !== "multiply" || left.args[1]?.var !== "x" || last.args[0]?.var !== "x") return null;
  return {a: evaluate(left.args[0]), b: evaluate(first.args[1]), submitted: evaluate(last.args[1])};
}
const multiplyInstead = attempt => {
  const p = multiplicationEquation(attempt);
  return !!p && p.submitted === p.a * p.b;
};
const wrongDivisionOrder = attempt => {
  const p = multiplicationEquation(attempt);
  return !!p && p.submitted === p.a / p.b && p.submitted !== p.b / p.a;
};
const lostNegative = attempt => {
  const p = multiplicationEquation(attempt);
  return !!p && p.b / p.a < 0 && p.submitted === Math.abs(p.b / p.a);
};

function fractionProduct(attempt) {
  const first = attempt.steps?.[0];
  const last = attempt.steps?.at(-1);
  if (first?.op !== "multiply" || first.args.some(arg => arg?.op !== "divide") || !last) return null;
  const [[a, b], [c, d]] = first.args.map(arg => arg.args.map(value => evaluate(value)));
  return {a, b, c, d, submitted: evaluate(last), last};
}
const addFractions = attempt => {
  const p = fractionProduct(attempt);
  const close = (a, b) => Math.abs(a - b) < 1e-12;
  return !!p && close(p.submitted, p.a / p.b + p.c / p.d) && !close(p.submitted, (p.a * p.c) / (p.b * p.d));
};
const crossMultiply = attempt => {
  const p = fractionProduct(attempt);
  return !!p && (p.submitted === (p.a * p.d) / (p.b * p.c) || p.submitted === (p.a * p.d) / (p.c * p.b));
};
const leaveUnreduced = attempt => {
  const p = fractionProduct(attempt);
  if (!p || p.last.op !== "divide" || !p.last.args.every(arg => Object.hasOwn(arg, "literal"))) return false;
  const [n, d] = p.last.args.map(arg => Number(arg.literal));
  return p.submitted === (p.a * p.c) / (p.b * p.d) && gcd(n, d) > 1;
};

export const detectors = {
  "linear.change-one-side-only": changeOneSideOnly,
  "linear.move-term-without-inverse": moveTermWithoutInverse,
  "linear.combine-unlike-terms": combineUnlikeTerms,
  "linear.multiply-instead-of-divide": multiplyInstead,
  "linear.divide-in-wrong-order": wrongDivisionOrder,
  "linear.lose-negative-coefficient-sign": lostNegative,
  "fraction.add-instead-of-multiply": addFractions,
  "fraction.cross-multiply-product": crossMultiply,
  "fraction.leave-product-unreduced": leaveUnreduced
};

const axb = (a, b, c, d) => eq(add(mul(lit(a), x), lit(b)), add(mul(lit(c), x), lit(d)));
const mx = (a, b) => eq(mul(lit(a), x), lit(b));
const solved = value => eq(x, value);
const fp = (a, b, c, d) => mul(div(lit(a), lit(b)), div(lit(c), lit(d)));
const attempt = (...steps) => ({steps});

const validLinear = [
  attempt(axb(3, 5, 1, 9), eq(add(mul(lit(2), x), lit(5)), lit(9)), eq(mul(lit(2), x), lit(4)), solved(lit(2))),
  attempt(axb(2, -3, -1, 6), eq(add(mul(lit(3), x), lit(-3)), lit(6)), eq(mul(lit(3), x), lit(9)), solved(lit(3))),
  attempt(axb(-2, 4, 1, -5), eq(add(mul(lit(-3), x), lit(4)), lit(-5)), eq(mul(lit(-3), x), lit(-9)), solved(lit(3))),
  attempt(axb(4, 2, 2, 8), eq(add(mul(lit(2), x), lit(2)), lit(8)), eq(mul(lit(2), x), lit(6)), solved(lit(3))),
  attempt(axb(5, -7, 3, 1), eq(add(mul(lit(2), x), lit(-7)), lit(1)), eq(mul(lit(2), x), lit(8)), solved(lit(4)))
];
const validMultiplication = [
  attempt(mx(2, 3), solved(div(lit(3), lit(2)))),
  attempt(mx(4, -5), solved(div(lit(-5), lit(4)))),
  attempt(mx(-3, 2), solved(div(lit(-2), lit(3)))),
  attempt(mx(-5, -7), solved(div(lit(7), lit(5)))),
  attempt(mx(6, 5), eq(div(mul(lit(6), x), lit(6)), div(lit(5), lit(6))), solved(div(lit(5), lit(6))))
];
const validFractions = [
  attempt(fp(1, 2, 3, 5), div(lit(3), lit(10))),
  attempt(fp(2, 3, 3, 4), div(lit(1), lit(2))),
  attempt(fp(-2, 5, 5, 6), div(lit(-1), lit(3))),
  attempt(fp(7, 8, 2, 3), div(lit(7), lit(12))),
  attempt(fp(3, 10, 5, 9), div(lit(1), lit(6)))
];

export const detectorFixtures = {
  "linear.change-one-side-only": {
    positives: [
      attempt(axb(3, 5, 1, 9), eq(add(mul(lit(3), x), lit(3)), add(mul(lit(1), x), lit(9)))),
      attempt(axb(2, -4, -1, 8), eq(add(mul(lit(3), x), lit(-4)), add(mul(lit(-1), x), lit(8)))),
      attempt(axb(5, 2, 2, 11), eq(add(mul(lit(5), x), lit(2)), add(mul(lit(2), x), lit(9))))
    ], negatives: validLinear
  },
  "linear.move-term-without-inverse": {
    positives: [
      attempt(axb(3, 5, 1, 9), eq(add(mul(lit(2), x), lit(5)), add(mul(lit(2), x), lit(9)))),
      attempt(axb(2, -3, -1, 6), eq(add(mul(lit(3), x), lit(-3)), add(mul(lit(-2), x), lit(6)))),
      attempt(axb(4, 2, 2, 8), eq(mul(lit(4), x), add(mul(lit(2), x), lit(10))))
    ], negatives: validLinear
  },
  "linear.combine-unlike-terms": {
    positives: [
      attempt(axb(3, 5, 1, 9), eq(mul(lit(8), x), add(mul(lit(1), x), lit(9)))),
      attempt(axb(2, -3, -1, 6), eq(lit(-1), add(mul(lit(-1), x), lit(6)))),
      attempt(axb(-2, 4, 1, -5), eq(mul(lit(2), x), add(mul(lit(1), x), lit(-5))))
    ], negatives: validLinear
  },
  "linear.multiply-instead-of-divide": {
    positives: [attempt(mx(2, 3), solved(lit(6))), attempt(mx(-3, 4), solved(lit(-12))), attempt(mx(5, -2), solved(lit(-10)))],
    negatives: validMultiplication
  },
  "linear.divide-in-wrong-order": {
    positives: [attempt(mx(2, 3), solved(div(lit(2), lit(3)))), attempt(mx(4, -5), solved(div(lit(-4), lit(5)))), attempt(mx(-3, 2), solved(div(lit(-3), lit(2))))],
    negatives: validMultiplication
  },
  "linear.lose-negative-coefficient-sign": {
    positives: [attempt(mx(-2, 3), solved(div(lit(3), lit(2)))), attempt(mx(4, -5), solved(div(lit(5), lit(4)))), attempt(mx(-3, 2), solved(div(lit(2), lit(3))))],
    negatives: validMultiplication
  },
  "fraction.add-instead-of-multiply": {
    positives: [attempt(fp(1, 2, 1, 3), div(lit(5), lit(6))), attempt(fp(2, 5, 1, 5), div(lit(3), lit(5))), attempt(fp(-1, 4, 3, 4), div(lit(1), lit(2)))],
    negatives: validFractions
  },
  "fraction.cross-multiply-product": {
    positives: [attempt(fp(1, 2, 3, 5), div(lit(5), lit(6))), attempt(fp(2, 3, 4, 7), div(lit(14), lit(12))), attempt(fp(-2, 5, 3, 8), div(lit(-16), lit(15)))],
    negatives: validFractions
  },
  "fraction.leave-product-unreduced": {
    positives: [attempt(fp(2, 3, 3, 4), div(lit(6), lit(12))), attempt(fp(4, 5, 5, 8), div(lit(20), lit(40))), attempt(fp(-2, 3, 3, 7), div(lit(-6), lit(21)))],
    negatives: validFractions
  }
};
