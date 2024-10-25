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

export async function checkIfDEKExists(): Promise<boolean> {
  const dek = await getDEKFromWorker();
  return !dek ? false : true;
}

export async function initializeEncryption(password: string): Promise<void> {
  try {
    const dek = (await db.get("dek")) as CryptedDEK;
    const kek = await deriveKEK(password, dek.salt);
    const unwrapedDEK = await unwrapDEK(dek.encryptedDEK, kek, dek.iv);
    await storeDEKInWorker(unwrapedDEK);
  } catch (e) {
    if ((e as CustomPouchError).status === 404) {
      const salt = crypto.getRandomValues(new Uint8Array(16));
      const dek = await generateDEK();
      const kek = await deriveKEK(password, salt);
      const wrappedDEK = await wrapDEK(dek, kek, iv);

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
