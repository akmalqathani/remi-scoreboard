const STORAGE_KEY = 'remi_local_game';

export function saveGame(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function loadGame() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : null;
}

export function clearGame() {
  localStorage.removeItem(STORAGE_KEY);
}