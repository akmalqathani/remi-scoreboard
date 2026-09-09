import { loadGame, saveGame, clearGame } from './storage.js';
import { evaluateGame } from './logic.js';

let gameState = loadGame();

// Kalau tidak ada data game, kembalikan ke halaman setup
if (!gameState) {
  window.location.href = 'index.html';
}

const els = {
  targetDisplay: document.getElementById('target-display'),
  resetBtn: document.getElementById('reset-btn'),
  winnerBanner: document.getElementById('winner-banner'),
  winnerName: document.getElementById('winner-name'),
  winnerDesc: document.getElementById('winner-desc'),
  tableHead: document.getElementById('table-head'),
  tableBody: document.getElementById('table-body'),
  tableFoot: document.getElementById('table-foot'),
  addRoundSection: document.getElementById('add-round-section'),
  roundInputs: document.getElementById('round-inputs'),
  undoBtn: document.getElementById('undo-btn'),
  addRoundBtn: document.getElementById('add-round-btn'),
};

function initUI() {
  els.targetDisplay.textContent = `Target: ${gameState.target}`;
  
  // Buat Header Tabel
  els.tableHead.innerHTML = '<th>Ronde</th>' + gameState.players.map(p => `<th data-player="${p}">${p}</th>`).join('');
  
  // Buat Form Input Skor
  els.roundInputs.innerHTML = gameState.players.map((p, idx) => `
    <div class="round-input-row">
      <span class="name">${p}</span>
      <input type="number" class="round-score-input" data-idx="${idx}" placeholder="0" inputmode="numeric">
    </div>
  `).join('');

  renderTable();
}

function renderTable() {
  const { totals, maxTotal, isFinished, winners } = evaluateGame(gameState.players, gameState.rounds, gameState.target);

  // Render Baris Tabel
  els.tableBody.innerHTML = gameState.rounds.map((r, ri) => {
    const cells = r.map(s => {
      const cls = s > 0 ? 'pos' : (s < 0 ? 'neg' : '');
      const sign = s > 0 ? '+' : '';
      return `<td class="${cls}">${sign}${s}</td>`;
    }).join('');
    return `<tr><td>${ri + 1}</td>${cells}</tr>`;
  }).join('');

  // Render Total
  els.tableFoot.innerHTML = '<td>Total</td>' + totals.map(t => {
    const isLeader = gameState.rounds.length > 0 && t === maxTotal;
    return `<td class="${isLeader ? 'leader-total' : ''}">${t}</td>`;
  }).join('');

  // Update Tombol & Highlight Leader
  els.undoBtn.disabled = gameState.rounds.length === 0;
  els.tableHead.querySelectorAll('th[data-player]').forEach((th, i) => {
    th.classList.toggle('leader', gameState.rounds.length > 0 && totals[i] === maxTotal);
  });

  // Tampilkan Banner Pemenang jika Selesai
  if (isFinished) {
    els.winnerName.textContent = winners.length === 1
      ? `${winners[0]} menang!`
      : `${winners.join(' & ')} seri!`;
    els.winnerDesc.textContent = `Skor akhir: ${maxTotal} poin`;
    els.winnerBanner.classList.remove('hidden');
    els.addRoundSection.classList.add('hidden');
  } else {
    els.winnerBanner.classList.add('hidden');
    els.addRoundSection.classList.remove('hidden');
  }
}

// Event Listeners
els.addRoundBtn.addEventListener('click', () => {
  const scores = gameState.players.map((_, i) => {
    const input = document.querySelector(`.round-score-input[data-idx="${i}"]`);
    const v = Number(input.value);
    return Number.isFinite(v) ? Math.round(v) : 0;
  });

  gameState.rounds.push(scores);
  saveGame(gameState);
  renderTable();

  // Reset kolom input
  document.querySelectorAll('.round-score-input').forEach(i => i.value = '');
});

els.undoBtn.addEventListener('click', () => {
  if (gameState.rounds.length === 0) return;
  gameState.rounds.pop();
  saveGame(gameState);
  renderTable();
});

els.resetBtn.addEventListener('click', () => {
  if (!confirm('Akhiri game ini dan mulai dari awal?')) return;
  clearGame();
  window.location.href = 'index.html'; // Kembali ke halaman setup
});

// Jalankan saat pertama dimuat
initUI();