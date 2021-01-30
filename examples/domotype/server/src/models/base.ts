export enum ModelScopes {
  Public,
  Private,
}

export const serializeMap = (
  map: Map<string, any>
): { [index: string]: any } => {
  const result: { [index: string]: any } = {};
  for (const [key, value] of map[Symbol.iterator]()) {
    result[key as string] = value;
  }
  return result;
};
