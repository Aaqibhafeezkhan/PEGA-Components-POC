export function getMappedKey(key: string): string {
  try {
    const namespace = PCore.getNameSpaceUtils?.().getDefaultQualifiedName?.(key);
    const mapped = namespace && PCore.getEnvironmentInfo?.().getKeyMapping?.(namespace);
    return mapped || namespace || key;
  } catch {
    return key;
  }
}
