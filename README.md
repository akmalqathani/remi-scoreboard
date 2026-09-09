# ♠ ♥ Scoreboard Remi ♦ ♣

Aplikasi pencatat skor permainan kartu remi berbasis web yang ringan, cepat, dan responsif. Berjalan sepenuhnya di sisi klien (*client-side*) menggunakan HTML5, CSS3, dan Vanilla JavaScript (ES Modules).

## 🚀 Fitur Utama

- **Otomatis Tersimpan**: Menggunakan Web Storage (`localStorage`), sehingga data permainan tidak akan hilang meski halaman dimuat ulang (*refresh*) atau tab tidak sengaja tertutup.
- **Fleksibel (2–8 Pemain)**: Mendukung pengaturan nama dinamis untuk 2 hingga 8 pemain dengan target skor yang bisa disesuaikan.
- **Tabel Ronde & Akumulasi**: Rekapitulasi nilai tiap ronde (+/-) dengan kalkulasi total otomatis di bagian bawah.
- **Indikator Pemimpin Skor**: Menandai pemain dengan skor tertinggi secara *real-time* di kolom tabel.
- **Fitur Undo**: Membatalkan ronde terakhir jika terjadi salah hitung atau salah memasukkan angka.
- **Deteksi Kemenangan Otomatis**: Muncul banner pemenang begitu ada pemain yang mencapai atau melampaui skor target.
- **Desain Meja Remi**: Antarmuka bertema *green felt* kasino klasik yang nyaman dilihat dan ramah perangkat *mobile*.

## 📁 Struktur File

```text
/
├── index.html        # Halaman awal (pengaturan nama pemain & target skor)
├── game.html         # Halaman utama permainan & papan skor
├── style.css         # Desain tampilan dan tata letak responsif
├── storage.js        # Utilitas pengelolaan state di localStorage
├── logic.js          # Logika murni penghitungan poin & evaluasi pemenang
├── setup.js          # Pengendali alur form dan validasi input pemain
└── scoreboard.js     # Pengendali interaksi tabel, undo, dan skor ronde




Dikembangkan oleh Fatih Akmal Alqathani © 2026. 