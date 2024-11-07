export interface CustomPouchError extends Error {
  stack: string;
  status: number;
  name: string;
  docId: string;
  error: boolean;
}
