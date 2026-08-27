import {
  rational, rationalFromLiteral, addRational, subtractRational, multiplyRational,
  divideRational, equalRational, compareRational, isZero, evaluateExact,
  linearPolynomial, equalPolynomial, gcd
} from "./exact-rational.mjs";

const lit = literal => ({literal});
const variable = name => ({var: name});
const op = (name, ...args) => ({op: name, args});
const eq = (left, right) => op("equal", left, right);
const add = (a, b) => op("add", a, b);
const sub = (a, b) => op("subtract", a, b);
const mul = (a, b) => op("multiply", a, b);
const div = (a, b) => op("divide", a, b);
const x = variable("x");

const equationTransitions = attempt => {
  if (!Array.isArray(attempt.steps)) return [];
  const transitions = [];
  for (let index = 1; index < attempt.steps.length; index += 1) {
    const previous = attempt.steps[index - 1];
    const current = attempt.steps[index];
    if (previous?.op !== "equal" || current?.op !== "equal") continue;
    const pair = {
      beforeLeft: linearPolynomial(previous.args[0]), beforeRight: linearPolynomial(previous.args[1]),
      afterLeft: linearPolynomial(current.args[0]), afterRight: linearPolynomial(current.args[1])
    };
    pair.sideSwap = equalPolynomial(pair.beforeLeft, pair.afterRight) && equalPolynomial(pair.beforeRight, pair.afterLeft);
    transitions.push(pair);
  }
  return transitions;
};

const exactDelta = (after, before) => subtractRational(after, before);
const equationClass = pair => {
  const coefficient = subtractRational(pair.beforeLeft.coefficient, pair.beforeRight.coefficient);
  const constant = subtractRational(pair.beforeLeft.constant, pair.beforeRight.constant);
  if (isZero(coefficient)) return {kind: isZero(constant) ? "infinite" : "none"};
  return {kind: "one", root: divideRational(rational(-constant.numerator, constant.denominator), coefficient)};
};
const sameSolutionSet = pair => {
  const before = equationClass(pair);
  const after = equationClass({beforeLeft: pair.afterLeft, beforeRight: pair.afterRight});
  return before.kind === after.kind && (before.kind !== "one" || equalRational(before.root, after.root));
};

function changeOneSideOnly(attempt) {
  return equationTransitions(attempt).some(pair => {
    if (pair.sideSwap) return false;
    const leftChanged = !equalPolynomial(pair.beforeLeft, pair.afterLeft);
    const rightChanged = !equalPolynomial(pair.beforeRight, pair.afterRight);
    return leftChanged !== rightChanged && !sameSolutionSet(pair);
  });
}

function moveTermWithoutInverse(attempt) {
  return equationTransitions(attempt).some(p => {
    if (p.sideSwap) return false;
    const deltas = [
      exactDelta(p.afterLeft.coefficient, p.beforeLeft.coefficient), exactDelta(p.afterRight.coefficient, p.beforeRight.coefficient),
      exactDelta(p.afterLeft.constant, p.beforeLeft.constant), exactDelta(p.afterRight.constant, p.beforeRight.constant)
    ];
    return (!isZero(deltas[0]) && equalRational(deltas[0], multiplyRational(rational(-1n), deltas[1]))) ||
      (!isZero(deltas[2]) && equalRational(deltas[2], multiplyRational(rational(-1n), deltas[3])));
  });
}

function combineUnlikeTerms(attempt) {
  return equationTransitions(attempt).some(p => {
    if (p.sideSwap) return false;
    for (const [before, after] of [[p.beforeLeft, p.afterLeft], [p.beforeRight, p.afterRight]]) {
      const combined = addRational(before.coefficient, before.constant);
      if (!isZero(before.coefficient) && !isZero(before.constant) &&
          ((equalRational(after.coefficient, combined) && isZero(after.constant)) ||
           (isZero(after.coefficient) && equalRational(after.constant, combined)))) return true;
    }
    return false;
  });
}

function multiplicationEquation(attempt) {
  const first = attempt.steps?.[0];
  const last = attempt.steps?.at(-1);
  if (first?.op !== "equal" || last?.op !== "equal") return null;
  const left = first.args[0];
  if (left?.op !== "multiply" || left.args[1]?.var !== "x" || last.args[0]?.var !== "x") return null;
  return {a: evaluateExact(left.args[0]), b: evaluateExact(first.args[1]), submitted: evaluateExact(last.args[1])};
}
const multiplyInstead = attempt => {
  const p = multiplicationEquation(attempt);
  if (!p) return false;
  const wrong = multiplyRational(p.a, p.b);
  const correct = divideRational(p.b, p.a);
  return !equalRational(wrong, correct) && equalRational(p.submitted, wrong);
};
const wrongDivisionOrder = attempt => {
  const p = multiplicationEquation(attempt);
  if (!p || isZero(p.b)) return false;
  const wrong = divideRational(p.a, p.b);
  const correct = divideRational(p.b, p.a);
  return !equalRational(wrong, correct) && equalRational(p.submitted, wrong);
};
const lostNegative = attempt => {
  const p = multiplicationEquation(attempt);
  if (!p) return false;
  const correct = divideRational(p.b, p.a);
  const absolute = rational(correct.numerator < 0n ? -correct.numerator : correct.numerator, correct.denominator);
  return compareRational(correct, rational(0n)) < 0 && equalRational(p.submitted, absolute);
};

function fractionProduct(attempt) {
  const first = attempt.steps?.[0];
  const last = attempt.steps?.at(-1);
  if (first?.op !== "multiply" || first.args.some(arg => arg?.op !== "divide") || !last) return null;
  const [[a, b], [c, d]] = first.args.map(arg => arg.args.map(value => evaluateExact(value)));
  return {a, b, c, d, submitted: evaluateExact(last), last};
}
const addFractions = attempt => {
  const p = fractionProduct(attempt);
  if (!p) return false;
  const wrong = addRational(divideRational(p.a, p.b), divideRational(p.c, p.d));
  const correct = divideRational(multiplyRational(p.a, p.c), multiplyRational(p.b, p.d));
  return equalRational(p.submitted, wrong) && !equalRational(wrong, correct);
};
const crossMultiply = attempt => {
  const p = fractionProduct(attempt);
  if (!p || isZero(p.c)) return false;
  const wrong = divideRational(multiplyRational(p.a, p.d), multiplyRational(p.b, p.c));
  return equalRational(p.submitted, wrong);
};
const leaveUnreduced = attempt => {
  const p = fractionProduct(attempt);
  if (!p || p.last.op !== "divide" || !p.last.args.every(arg => Object.hasOwn(arg, "literal"))) return false;
  const [n, d] = p.last.args.map(arg => rationalFromLiteral(arg.literal).numerator);
  const correct = divideRational(multiplyRational(p.a, p.c), multiplyRational(p.b, p.d));
  return equalRational(p.submitted, correct) && gcd(n, d) > 1n;
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

export const detectorPolicy = Object.freeze({
  role: "hint-selection-only",
  mayRejectStep: false,
  mayChangeGrade: false,
  gradingAuthority: "answer-verifier"
});

export function selectHints(attempt) {
  const selected = [];
  for (const [name, detector] of Object.entries(detectors)) {
    try {
      if (detector(attempt)) selected.push(name);
    } catch {
      // Unsupported expression families fail closed: no hint is preferable to a false accusation.
    }
  }
  return selected;
}

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
