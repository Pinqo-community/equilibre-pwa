export type EncryptedData = {
  data: ArrayBuffer;
  iv: Uint8Array;
  salt: Uint8Array;
};
