export type EncryptedData = {
  data: ArrayBuffer;
  iv: Uint8Array;
  salt: Uint8Array;
};

export type CryptedDEK = {
  encryptedDEK: string;
  iv: Uint8Array;
  salt: Uint8Array;
};
