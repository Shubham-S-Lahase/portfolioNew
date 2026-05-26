import { decryptSecret } from "@/lib/easter-eggs/secret-crypto";

const ROSE_MODE_HEADER = "rose";

export { ROSE_MODE_HEADER };

/** Encrypted poem lives only in env — never in the repo or client bundle. */
export function getPrivatePoemStanzas(): string[] | null {
  const key = process.env.AMREEN_SECRET_KEY?.trim();
  const payload = process.env.AMREEN_SECRET_PAYLOAD?.trim();
  if (!key || !payload) return null;

  try {
    const plain = decryptSecret(payload, key);
    const stanzas = plain
      .split(/\n\s*\n/)
      .map((s) => s.trim())
      .filter(Boolean);
    return stanzas.length > 0 ? stanzas : null;
  } catch {
    return null;
  }
}

/** Full-screen backdrop line — encrypted in env, same key as poem. */
export function getPrivateBackdropMessage(): string | null {
  const key = process.env.AMREEN_SECRET_KEY?.trim();
  const payload = process.env.AMREEN_BACKDROP_PAYLOAD?.trim();
  if (!key || !payload) return null;

  try {
    const plain = decryptSecret(payload, key).trim();
    return plain.length > 0 ? plain : null;
  } catch {
    return null;
  }
}
