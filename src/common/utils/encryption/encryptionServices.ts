import { deriveKEK, generateDEK } from "./services/keyService";
import {
  encryptData,
  decryptData,
  wrapDEK,
  unwrapDEK,
} from "./tools/cryptoTools";
import {
  storeDEKInWorker,
  getDEKFromWorker,
} from "./services/webWorkerService";

import db from "../../../db";
import { CryptedDEK, CustomPouchError } from "./types";

const iv = crypto.getRandomValues(new Uint8Array(12));

export async function isDEKExists(): Promise<boolean> {
  const dek = await getDEKFromWorker();
  return Boolean(dek);
}

export async function initializeEncryption(password: string): Promise<void> {
  try {
    const dek: CryptedDEK = await getEncryptedDEKFromDB();
    const kek: CryptoKey = await deriveKEK(password, dek.salt);
    const unwrapedDEK: CryptoKey = await unwrapDEK(
      dek.encryptedDEK,
      kek,
      dek.iv,
    );
    await storeDEKInWorker(unwrapedDEK);
  } catch (e) {
    if ((e as CustomPouchError).status === 404) {
      const salt: Uint8Array = crypto.getRandomValues(new Uint8Array(16));
      const dek: CryptoKey = await generateDEK();
      const kek: CryptoKey = await deriveKEK(password, salt);
      const wrappedDEK: string = await wrapDEK(dek, kek, iv);

      await storeEncryptedDEKInDB({
        encryptedDEK: wrappedDEK,
        iv,
        salt,
      } as CryptedDEK);

      await storeDEKInWorker(dek);
    } else {
      console.log(e);
      throw new Error("Encryption error");
    }
  }
}

async function getEncryptedDEKFromDB(): Promise<CryptedDEK> {
  return (await db.get("dek")) as CryptedDEK;
}

async function storeEncryptedDEKInDB(dekEncrypted: CryptedDEK) {
  await db.put({
    _id: "dek",
    encryptedDEK: dekEncrypted.encryptedDEK,
    iv: dekEncrypted.iv,
    salt: dekEncrypted.salt,
  });
}

export async function encryptUserData(data: string): Promise<string> {
  const dek = await getDEKFromWorker();

  if (!dek) {
    throw new Error("DEK not available. Ask the user a password.");
  }

  return await encryptData(data, dek, iv);
}

export async function decryptUserData(encryptedData: string): Promise<string> {
  const dek = await getDEKFromWorker();

  if (!dek) {
    throw new Error("DEK not available. Ask the user a password.");
  }

  return await decryptData(encryptedData, dek, iv);
}
