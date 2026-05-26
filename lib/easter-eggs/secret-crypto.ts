import { createDecipheriv, scryptSync } from "node:crypto";

/** Decrypts server-only secret payload (AES-256-GCM + scrypt). */
export function decryptSecret(payload: string, passphrase: string): string {
  const parts = payload.split(".");
  if (parts.length !== 4) {
    throw new Error("Invalid secret payload format.");
  }

  const [saltB64, ivB64, tagB64, dataB64] = parts;
  const salt = Buffer.from(saltB64, "base64");
  const iv = Buffer.from(ivB64, "base64");
  const tag = Buffer.from(tagB64, "base64");
  const data = Buffer.from(dataB64, "base64");
  const key = scryptSync(passphrase, salt, 32);

  const decipher = createDecipheriv("aes-256-gcm", key, iv);
  decipher.setAuthTag(tag);
  return Buffer.concat([decipher.update(data), decipher.final()]).toString(
    "utf8"
  );
}
