const STORAGE_KEY = "character-explorer.characters";

function readStorage() {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function writeStorage(value) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
}

export function getCharacterOverrides(id) {
  const store = readStorage();
  return store?.[id] ?? null;
}

export function saveCharacterOverrides(id, overrides) {
  const store = readStorage();
  store[id] = { ...(store[id] ?? {}), ...overrides };
  writeStorage(store);
}

export function deleteCharacter(id) {
  saveCharacterOverrides(id, { deleted: true });
}

export function restoreCharacter(id) {
  const store = readStorage();
  if (!store[id]) return;
  delete store[id].deleted;
  if (Object.keys(store[id]).length === 0) {
    delete store[id];
  }
  writeStorage(store);
}

export function isCharacterDeleted(id) {
  return Boolean(getCharacterOverrides(id)?.deleted);
}

export function mergedCharacter(apiCharacter) {
  const overrides = getCharacterOverrides(apiCharacter?.id);
  if (!overrides) return apiCharacter;
  if (overrides.deleted) return { ...apiCharacter, deleted: true };
  return { ...apiCharacter, ...overrides };
}

export function filterDeletedCharacters(characters = []) {
  return characters.filter((c) => !isCharacterDeleted(c.id));
}
