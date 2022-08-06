export function isTx(obj: unknown): obj is { hash: string, wait: (blocks: number) => void } {
  return (
    typeof obj === 'object' && obj !== null && 'hash' in obj && 'wait' in obj
  );
}