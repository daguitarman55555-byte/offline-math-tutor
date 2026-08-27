import fs from "node:fs";
import {detectors, detectorFixtures} from "./detectors.mjs";

const results = [];
for (const [name, detector] of Object.entries(detectors)) {
  const fixtures = detectorFixtures[name];
  const baselinePass = fixtures.positives.every(detector) && fixtures.negatives.every(item => !detector(item));
  const inverted = attempt => !detector(attempt);
  const invertedCaught = !fixtures.positives.every(inverted) || !fixtures.negatives.every(item => !inverted(item));
  results.push({
    detector: name,
    positiveFixtures: fixtures.positives.length,
    negativeFixtures: fixtures.negatives.length,
    baselinePass,
    invertedMutationCaught: invertedCaught,
    passed: baselinePass && invertedCaught
  });
}

const report = {
  attemptFormat: "ordered-expression-ast-steps-v1",
  detectorCount: results.length,
  signalPropertyReads: 0,
  results,
  status: results.every(item => item.passed) ? "pass" : "fail"
};
fs.writeFileSync("authoring/detector-mutation-report.json", `${JSON.stringify(report, null, 2)}\n`);
for (const item of results) {
  console.log(`${item.detector}: ${item.passed ? "PASS" : "FAIL"} (${item.positiveFixtures}+/${item.negativeFixtures}-, inverted ${item.invertedMutationCaught ? "caught" : "missed"})`);
}
console.log(`DETECTOR SUITE ${report.status.toUpperCase()}: ${results.filter(item => item.passed).length}/${results.length}`);
if (report.status !== "pass") process.exitCode = 1;
