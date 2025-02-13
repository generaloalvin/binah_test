export const BACKEND_BASE_URL = process.env.BACKEND_BASE_URL || "http://localhost:3000";

export enum TestType {
  TB = 'TB',
  SMK = 'SMK',
  TB_SMK = 'TB AND SMK',
}
