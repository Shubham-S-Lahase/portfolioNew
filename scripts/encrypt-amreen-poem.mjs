/**
 * One-time helper: encrypts the poem for server env vars.
 * Usage:
 *   node scripts/encrypt-amreen-poem.mjs path/to/poem.txt
 *   node scripts/encrypt-amreen-poem.mjs path/to/backdrop.txt --backdrop
 * Output: AMREEN_SECRET_KEY (+ payloads). Reuse existing key for --backdrop only.
 */
import { createCipheriv, randomBytes, scryptSync } from "node:crypto";
import { readFileSync } from "node:fs";

function encrypt(plain, passphrase) {
  const salt = randomBytes(16);
  const key = scryptSync(passphrase, salt, 32);
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", key, iv);
  const enc = Buffer.concat([
    cipher.update(plain, "utf8"),
    cipher.final(),
  ]);
  const tag = cipher.getAuthTag();
  return [
    salt.toString("base64"),
    iv.toString("base64"),
    tag.toString("base64"),
    enc.toString("base64"),
  ].join(".");
}

const filePath = process.argv[2];
const backdropOnly = process.argv.includes("--backdrop");
const existingKey = process.env.AMREEN_SECRET_KEY?.trim();

if (!filePath) {
  console.error(
    "Usage: node scripts/encrypt-amreen-poem.mjs <file.txt> [--backdrop]"
  );
  process.exit(1);
}

const plain = readFileSync(filePath, "utf8").trim();
const secretKey =
  backdropOnly && existingKey
    ? existingKey
    : randomBytes(32).toString("base64url");
const payload = encrypt(plain, secretKey);

console.log("\nAdd these to .env.local and Vercel (never commit):\n");
if (!backdropOnly) {
  console.log(`AMREEN_SECRET_KEY=${secretKey}`);
  console.log(`AMREEN_SECRET_PAYLOAD=${payload}`);
} else {
  console.log(`AMREEN_BACKDROP_PAYLOAD=${payload}`);
}
console.log("\nThen delete the plaintext file.\n");
