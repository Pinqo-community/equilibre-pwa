import { Mood } from "../../../MoodSelection/types";
import { EncryptedData } from "./types";

const MASTER_PASSWORD = "password";

async function getKeyMaterial() {
  const enc = new TextEncoder();
  return await window.crypto.subtle.importKey(
    "raw",
    enc.encode(MASTER_PASSWORD),
    "PBKDF2",
    false,
    ["deriveKey"]
  );
}

function generateIv() {
  return crypto.getRandomValues(new Uint8Array(12));
}

function serializeMood(data: Mood) {
  return new TextEncoder().encode(JSON.stringify(data));
}

function parsingMood(data: any) {
  return JSON.parse(new TextDecoder().decode(data));
}

async function deriveKey(salt: Uint8Array) {
  const keyMaterial = await getKeyMaterial();

  return await window.crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt,
      iterations: 100000,
      hash: "SHA-256",
    },
    keyMaterial,
    {
      name: "AES-GCM",
      length: 256,
    },
    true,
    ["encrypt", "decrypt"]
  );
}
export async function encryptData(
  data: Mood | undefined
): Promise<EncryptedData> {
  if (typeof data === "undefined") {
    throw new Error("No data to encrypt");
  }

  const dataToEncrypt = serializeMood(data);
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const derivedKey = await deriveKey(salt);
  const iv = generateIv();
  const encryptedData = await window.crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    derivedKey,
    dataToEncrypt
  );

  return { data: encryptedData, iv, salt };
}

export async function decryptData(
  encryptedData: EncryptedData | undefined
): Promise<string> {
  if (!encryptedData || encryptedData === undefined) {
    throw new Error("No data to decrypt");
  }

  const { data, iv, salt } = encryptedData;
  const derivedKey = await deriveKey(salt);
  const decryptedData = await window.crypto.subtle.decrypt(
    { name: "AES-GCM", iv },
    derivedKey,
    data
  );

  return parsingMood(decryptedData);
}
