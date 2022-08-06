export function isTx(obj: unknown): obj is { hash: string } {
  return (
    typeof obj === 'object' && obj !== null && 'hash' in obj
  );
}