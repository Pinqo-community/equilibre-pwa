const MASTER_PASSWORD = "password";

async function getKeyMaterial() {
  const enc = new TextEncoder();
  return await window.crypto.subtle.importKey("raw", enc.encode(MASTER_PASSWORD), "PBKDF2", false, ["deriveKey"]);
}

function generateIv() {
  return crypto.getRandomValues(new Uint8Array(12));
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
export async function encrypt(data: string | undefined) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const derivedKey = await deriveKey(salt);

  if (typeof data === "undefined") {
    throw new Error("No data to encrypt");
  }

  const dataToEncrypt = new TextEncoder().encode(data);
  const iv = generateIv();
  const encryptedData = await window.crypto.subtle.encrypt({ name: "AES-GCM", iv }, derivedKey, dataToEncrypt);

  return { encryptedData, iv, salt };
}

export async function decrypt(data: Uint8Array | undefined, iv: Uint8Array, salt: Uint8Array) {
  if (typeof data === "undefined") {
    throw new Error("No data to decrypt");
  }

  const derivedKey = await deriveKey(salt);

  return window.crypto.subtle.decrypt({ name: "AES-GCM", iv }, derivedKey, data);
}
