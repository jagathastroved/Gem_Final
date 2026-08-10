import { getMockReportByDetails } from "../data/mock/mockGemstoneReport.js";

/**
 * Single service file, single exported function.
 * Connects to astrology computation engine or returns structured calculation mock.
 */
export async function getGemstoneReport(birthDetails) {
  // Simulate quick API latency if needed or return immediately
  return new Promise((resolve) => {
    setTimeout(() => {
      const report = getMockReportByDetails(birthDetails);
      resolve(report);
    }, 400);
  });
}
