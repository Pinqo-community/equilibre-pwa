export type EncryptedData = {
  data: ArrayBuffer;
  iv: Uint8Array;
  salt: Uint8Array;
};
export interface CustomPouchError extends Error {
  stack: string;
  status: number;
  name: string;
  docId: string;
  error: boolean;
}

export type CryptedDEK = {
  encryptedDEK: string;
  iv: Uint8Array;
  salt: Uint8Array;
};
