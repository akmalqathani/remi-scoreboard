import { saveGame, loadGame } from './storage.js';

// Cek apakah ada game yang sedang berjalan. Jika ada, paksa pindah ke halaman game
if (loadGame()) {
  window.location.href = 'game.html';
}

const playerList = document.getElementById('player-list');
const addPlayerBtn = document.getElementById('add-player-btn');
const startBtn = document.getElementById('start-btn');
const targetInput = document.getElementById('target-score');
const globalError = document.getElementById('global-error');

function showError(msg) {
  globalError.textContent = msg;
  globalError.classList.remove('hidden');
}

function createPlayerRow() {
  const row = document.createElement('div');
  row.className = 'player-row';
  row.innerHTML = `
    <input type="text" class="player-name-input" placeholder="Nama pemain">
    <button class="remove-btn" type="button">×</button>
  `;
  row.querySelector('.remove-btn').addEventListener('click', () => {
    if (playerList.children.length > 2) row.remove();
  });
  return row;
}

// Inisialisasi form awal (2 pemain)
playerList.appendChild(createPlayerRow());
playerList.appendChild(createPlayerRow());

addPlayerBtn.addEventListener('click', () => {
  if (playerList.children.length >= 8) return;
  playerList.appendChild(createPlayerRow());
});

startBtn.addEventListener('click', () => {
  globalError.classList.add('hidden');
  
  const names = Array.from(document.querySelectorAll('.player-name-input'))
    .map(i => i.value.trim())
    .filter(Boolean);
  
  const target = Number(targetInput.value);

  if (names.length < 2) return showError('Minimal 2 nama pemain yang valid.');
  if (names.length > 8) return showError('Maksimal 8 pemain.');
  if (!Number.isFinite(target) || target <= 0) return showError('Target skor harus lebih dari 0.');

  // Buat state game & simpan
  const newGame = {
    players: names,
    target: Math.round(target),
    rounds: []
  };
  
  saveGame(newGame);
  window.location.href = 'game.html'; // Pindah ke halaman skor
});