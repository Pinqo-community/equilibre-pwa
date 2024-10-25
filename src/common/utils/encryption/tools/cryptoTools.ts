export async function encryptData(
  data: string,
  dek: CryptoKey,
  iv: Uint8Array,
): Promise<string> {
  const enc = new TextEncoder().encode(data);
  const cryptedData = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    dek,
    enc,
  );
  return arrayBufferToBase64(cryptedData);
}

export async function decryptData(
  encryptedData: string,
  dek: CryptoKey,
  iv: Uint8Array,
): Promise<string> {
  const decrypted = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv },
    dek,
    base64ToArrayBuffer(encryptedData),
  );
  return new TextDecoder().decode(decrypted);
}

export async function wrapDEK(
  dek: CryptoKey,
  kek: CryptoKey,
  iv: Uint8Array,
): Promise<string> {
  const wrapedDEK: ArrayBuffer = await crypto.subtle.wrapKey("raw", dek, kek, {
    name: "AES-GCM",
    iv,
  });
  return arrayBufferToBase64(wrapedDEK);
}

export async function unwrapDEK(
  encryptedDEK: string,
  kek: CryptoKey,
  iv: Uint8Array,
): Promise<CryptoKey> {
  return await crypto.subtle.unwrapKey(
    "raw",
    base64ToArrayBuffer(encryptedDEK),
    kek,
    { name: "AES-GCM", iv },
    { name: "AES-GCM", length: 256 },
    true,
    ["encrypt", "decrypt"],
  );
}

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function base64ToArrayBuffer(base64: string): ArrayBuffer {
  const binary = atob(base64);
  const buffer = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    buffer[i] = binary.charCodeAt(i);
  }
  return buffer.buffer;
}
