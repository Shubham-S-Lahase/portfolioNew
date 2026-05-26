/** Obfuscated name token — not stored as a plain string in source. */
function nameToken(): string {
  return String.fromCharCode(97, 109, 114, 101, 101, 110);
}

/**
 * Server-only trigger for the private assistant easter egg.
 * Matches the name alone or "who is …" style questions.
 */
export function isPrivateLoveTrigger(text: string): boolean {
  const normalized = text.trim().toLowerCase().replace(/\s+/g, " ");
  if (!normalized) return false;

  const token = nameToken();
  if (normalized === token) return true;
  if (normalized.includes(token)) return true;

  const whoPattern = new RegExp(
    `^who\\s+is\\s+${token}[\\s?!.,]*$`,
    "i"
  );
  if (whoPattern.test(normalized)) return true;

  return false;
}
