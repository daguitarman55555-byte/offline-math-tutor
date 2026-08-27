const abs = value => value < 0n ? -value : value;

export function gcd(a, b) {
  a = abs(a);
  b = abs(b);
  while (b !== 0n) [a, b] = [b, a % b];
  return a;
}

export function rational(numerator, denominator = 1n) {
  if (denominator === 0n) throw new Error("division by zero");
  if (denominator < 0n) [numerator, denominator] = [-numerator, -denominator];
  const divisor = gcd(numerator, denominator) || 1n;
  return {numerator: numerator / divisor, denominator: denominator / divisor};
}

export function rationalFromLiteral(value) {
  if (typeof value === "bigint") return rational(value);
  if (typeof value !== "number" || !Number.isFinite(value)) throw new Error("expected a finite numeric literal");
  if (Number.isInteger(value)) return rational(BigInt(value));
  const text = String(value);
  const match = text.match(/^(-?)(\d+)(?:\.(\d+))?(?:e([+-]?\d+))?$/i);
  if (!match) throw new Error(`unsupported numeric literal: ${text}`);
  const [, sign, whole, fraction = "", exponentText = "0"] = match;
  const exponent = Number(exponentText);
  let numerator = BigInt(`${sign}${whole}${fraction}`);
  let denominator = 10n ** BigInt(fraction.length);
  if (exponent > 0) numerator *= 10n ** BigInt(exponent);
  if (exponent < 0) denominator *= 10n ** BigInt(-exponent);
  return rational(numerator, denominator);
}

export const asRational = value => {
  if (typeof value === "number" || typeof value === "bigint") return rationalFromLiteral(value);
  if (value && typeof value.numerator === "bigint" && typeof value.denominator === "bigint") return rational(value.numerator, value.denominator);
  throw new Error("expected exact integer or rational");
};
export const addRational = (a, b) => rational(a.numerator * b.denominator + b.numerator * a.denominator, a.denominator * b.denominator);
export const subtractRational = (a, b) => rational(a.numerator * b.denominator - b.numerator * a.denominator, a.denominator * b.denominator);
export const multiplyRational = (a, b) => rational(a.numerator * b.numerator, a.denominator * b.denominator);
export const divideRational = (a, b) => rational(a.numerator * b.denominator, a.denominator * b.numerator);
export const equalRational = (a, b) => a.numerator === b.numerator && a.denominator === b.denominator;
export const compareRational = (a, b) => {
  const difference = a.numerator * b.denominator - b.numerator * a.denominator;
  return difference < 0n ? -1 : difference > 0n ? 1 : 0;
};
export const isZero = value => value.numerator === 0n;

export function evaluateExact(expression, environment = {}) {
  if (Object.hasOwn(expression, "literal")) {
    return typeof expression.literal === "boolean" ? expression.literal : rationalFromLiteral(expression.literal);
  }
  if (Object.hasOwn(expression, "var")) {
    if (!Object.hasOwn(environment, expression.var)) throw new Error(`unbound variable: ${expression.var}`);
    return asRational(environment[expression.var]);
  }
  const values = expression.args.map(argument => evaluateExact(argument, environment));
  switch (expression.op) {
    case "add": return values.reduce(addRational);
    case "subtract": return subtractRational(values[0], values[1]);
    case "multiply": return values.reduce(multiplyRational);
    case "divide": return divideRational(values[0], values[1]);
    case "mod": {
      const [left, right] = values;
      if (left.denominator !== 1n || right.denominator !== 1n) throw new Error("mod requires integers");
      return rational(left.numerator % right.numerator);
    }
    case "equal": return typeof values[0] === "boolean" ? values[0] === values[1] : equalRational(values[0], values[1]);
    case "not-equal": return typeof values[0] === "boolean" ? values[0] !== values[1] : !equalRational(values[0], values[1]);
    case "less": return compareRational(values[0], values[1]) < 0;
    case "less-equal": return compareRational(values[0], values[1]) <= 0;
    case "greater": return compareRational(values[0], values[1]) > 0;
    case "greater-equal": return compareRational(values[0], values[1]) >= 0;
    case "and": return values.every(Boolean);
    case "or": return values.some(Boolean);
    case "between-inclusive": return compareRational(values[0], values[1]) >= 0 && compareRational(values[0], values[2]) <= 0;
    default: throw new Error(`unsupported operator: ${expression.op}`);
  }
}

export function linearPolynomial(expression, variableName = "x") {
  if (Object.hasOwn(expression, "literal")) return {coefficient: rational(0n), constant: rationalFromLiteral(expression.literal)};
  if (Object.hasOwn(expression, "var")) {
    if (expression.var !== variableName) throw new Error(`unsupported variable in linear expression: ${expression.var}`);
    return {coefficient: rational(1n), constant: rational(0n)};
  }
  const args = expression.args.map(argument => linearPolynomial(argument, variableName));
  const combine = operation => ({
    coefficient: operation(args[0].coefficient, args[1].coefficient),
    constant: operation(args[0].constant, args[1].constant)
  });
  if (expression.op === "add") return args.slice(1).reduce((result, item) => ({coefficient: addRational(result.coefficient, item.coefficient), constant: addRational(result.constant, item.constant)}), args[0]);
  if (expression.op === "subtract") return combine(subtractRational);
  if (expression.op === "multiply") {
    if (args.filter(item => !isZero(item.coefficient)).length > 1) throw new Error("nonlinear expression is not supported");
    return args.reduce((result, item) => {
      if (!isZero(result.coefficient) && !isZero(item.coefficient)) throw new Error("nonlinear expression is not supported");
      return {
        coefficient: addRational(multiplyRational(result.coefficient, item.constant), multiplyRational(item.coefficient, result.constant)),
        constant: multiplyRational(result.constant, item.constant)
      };
    }, {coefficient: rational(0n), constant: rational(1n)});
  }
  if (expression.op === "divide") {
    if (!isZero(args[1].coefficient)) throw new Error("division by a variable expression is not linear");
    return {coefficient: divideRational(args[0].coefficient, args[1].constant), constant: divideRational(args[0].constant, args[1].constant)};
  }
  throw new Error(`unsupported operator in linear expression: ${expression.op}`);
}

export const equalPolynomial = (a, b) => equalRational(a.coefficient, b.coefficient) && equalRational(a.constant, b.constant);
export const serializeRational = value => ({
  numerator: value.numerator.toString(),
  denominator: value.denominator.toString(),
  text: value.denominator === 1n ? value.numerator.toString() : `${value.numerator}/${value.denominator}`
});
