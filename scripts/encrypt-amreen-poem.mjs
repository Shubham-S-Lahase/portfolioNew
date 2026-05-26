/**
 * One-time helper: encrypts the poem for server env vars.
 * Usage: node scripts/encrypt-amreen-poem.mjs path/to/poem.txt
 * Output: AMREEN_SECRET_KEY and AMREEN_SECRET_PAYLOAD (add to .env.local + Vercel).
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

const poemPath = process.argv[2];
if (!poemPath) {
  console.error("Usage: node scripts/encrypt-amreen-poem.mjs <poem.txt>");
  process.exit(1);
}

const plain = readFileSync(poemPath, "utf8").trim();
const secretKey = randomBytes(32).toString("base64url");
const payload = encrypt(plain, secretKey);

console.log("\nAdd these to .env.local and Vercel (never commit):\n");
console.log(`AMREEN_SECRET_KEY=${secretKey}`);
console.log(`AMREEN_SECRET_PAYLOAD=${payload}`);
console.log("\nThen delete the plaintext poem file.\n");
