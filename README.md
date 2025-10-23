# Snippet Manager

Snippet Manager adalah ekstensi VS Code yang memudahkan Anda mengelola snippet
kode secara terstruktur. Dengan antarmuka pohon (tree view) yang terintegrasi
di sidebar, Anda dapat menambah, mengedit, menghapus, dan menyalin snippet
langsung dari panel ekstensi.

## Fitur
- **Tree View**: Lihat semua snippet yang tersimpan dalam folder `snippets`.
- **CRUD Snippet**: Tambah, edit, dan hapus snippet melalui UI.
- **Copy to Clipboard**: Salin isi snippet ke clipboard dengan satu klik.
- **Live Reload**: Perubahan pada file snippet akan otomatis terdeteksi.

## Persyaratan
- Node.js v18+ (untuk pembangunan)
- VS Code 1.80+ (untuk penggunaan ekstensi)

## Instalasi
1. Clone repositori:
   ```powershell
   git clone https://github.com/ridwans2/snippetsmanager.git
   cd snippetsmanager
   ```
2. Instal dependensi:
   ```powershell
   npm install
   ```
3. Bangun ekstensi:
   ```powershell
   npm run compile
   ```
4. Jalankan VS Code dalam mode pengembangan:
   ```powershell
   code --extensionDevelopmentPath=.
   ```
   Setelah VS Code terbuka, tekan `Ctrl+Shift+P` dan pilih **Reload Window**.

## Penggunaan
- **Menampilkan Tree View**: Setelah ekstensi aktif, panel **Snippet Manager** akan muncul di sidebar.
- **Menambah Snippet**: Klik tombol **+** di panel, masukkan nama dan isi snippet.
- **Mengedit Snippet**: Klik kanan pada snippet dan pilih **Edit**.
- **Menghapus Snippet**: Klik kanan pada snippet dan pilih **Delete**.
- **Menyalin Snippet**: Klik ikon salin di samping snippet.

## Pengembangan
- **Watch Mode**: Jalankan `npm run watch` untuk memantau perubahan.
- **Linting**: Ekstensi menggunakan ESLint; jalankan `npm run lint`.

## Kontribusi
Silakan fork repositori, buat branch baru, dan kirim pull request. Pastikan
untuk menjalankan `npm test` sebelum mengirim.

## Lisensi
Proyek ini dilisensikan di bawah MIT License. Lihat file `LICENSE` untuk detail.
# Snippet Manager

Snippet Manager adalah ekstensi VS Code yang memudahkan Anda mengelola snippet
kode secara terstruktur. Dengan antarmuka pohon (tree view) yang terintegrasi
di sidebar, Anda dapat menambah, mengedit, menghapus, dan menyalin snippet
langsung dari panel ekstensi.

## Fitur
- **Tree View**: Lihat semua snippet yang tersimpan dalam folder `snippets`.
- **CRUD Snippet**: Tambah, edit, dan hapus snippet melalui UI.
- **Copy to Clipboard**: Salin isi snippet ke clipboard dengan satu klik.
- **Live Reload**: Perubahan pada file snippet akan otomatis terdeteksi.

## Persyaratan
- Node.js v18+ (untuk pembangunan)
- VS Code 1.80+ (untuk penggunaan ekstensi)

## Instalasi
1. Clone repositori:
   ```powershell
   git clone https://github.com/ridwans2/snippetsmanager.git
   cd snippetsmanager
   ```
2. Instal dependensi:
   ```powershell
   npm install
   ```
3. Bangun ekstensi:
   ```powershell
   npm run compile
   ```
4. Jalankan VS Code dalam mode pengembangan:
   ```powershell
   code --extensionDevelopmentPath=.
   ```
   Setelah VS Code terbuka, tekan `Ctrl+Shift+P` dan pilih **Reload Window**.

## Penggunaan
- **Menampilkan Tree View**: Setelah ekstensi aktif, panel **Snippet Manager** akan muncul di sidebar.
- **Menambah Snippet**: Klik tombol **+** di panel, masukkan nama dan isi snippet.
- **Mengedit Snippet**: Klik kanan pada snippet dan pilih **Edit**.
- **Menghapus Snippet**: Klik kanan pada snippet dan pilih **Delete**.
- **Menyalin Snippet**: Klik ikon salin di samping snippet.

## Pengembangan
- **Watch Mode**: Jalankan `npm run watch` untuk memantau perubahan.
- **Linting**: Ekstensi menggunakan ESLint; jalankan `npm run lint`.

## Kontribusi
Silakan fork repositori, buat branch baru, dan kirim pull request. Pastikan
untuk menjalankan `npm test` sebelum mengirim.

## Lisensi
Proyek ini dilisensikan di bawah MIT License. Lihat file `LICENSE` untuk detail.
# Raja Snippets Manager

VS Code extension untuk menyimpan & mengelola kode snippets: buat grup, simpan dari selection, sisipkan di kursor, atau jalankan di terminal.

![Version](https://img.shields.io/badge/version-1.2.0-blue.svg)
![VS Code](https://img.shields.io/badge/VS%20Code-1.60.0+-blue.svg)

##  Fitur Utama

- **Manajemen Grup**: Buat grup untuk mengkategorikan snippets berdasarkan proyek atau topik
- **Berbagai Tipe Snippet**: Dukungan untuk snippet kode dan perintah terminal
- **Editor WebView**: Interface editor yang modern untuk mengedit snippets
- **Placeholder Dinamis**: Gunakan {$variabel} untuk prompt input dinamis saat snippet digunakan
- **Tree View**: Navigasi visual yang intuitif melalui sidebar
- **Impor/Ekspor**: Backup dan bagikan snippets dalam format JSON
- **Penyimpanan Fleksibel**: Pilih lokasi penyimpanan custom atau gunakan default

##  Instalasi

### Cara 1: Dari VS Code Marketplace
1. Buka VS Code
2. Tekan `Ctrl+Shift+X` untuk membuka Extensions
3. Cari "Raja Snippets Manager"
4. Klik Install

### Cara 2: Manual Development
1. Clone repository ini:
   ```bash
   git clone https://github.com/ridwans2/raja-snippets-manager.git
   cd raja-snippets-manager
   ```
2. Install dependencies:
   ```powershell
   npm install
   ```
3. Compile:
   ```powershell
   npm run compile
   ```
4. Buka folder ini di VS Code, lalu tekan `F5` untuk menjalankan di Extension Development Host

##  Cara Penggunaan

### Membuat Grup
1. Klik ikon Raja Snippets di Activity Bar
2. Klik tombol "Add Group" di bar judul tree view
3. Atau gunakan Command Palette (`Ctrl+Shift+P`) dan pilih "Raja Snippets: Add Group"
4. Masukkan nama grup (misalnya: React, JavaScript, Database, dll.)

### Menambah Snippet

#### Dari Selection (Cara paling umum)
1. Blok kode yang ingin disimpan di editor
2. Klik kanan dan pilih "Raja Snippets: Add Snippet from Selection" 
3. atau gunakan Command Palette (`Ctrl+Shift+P`)  "Raja Snippets: Add Snippet from Selection"
4. Beri judul snippet
5. Pilih grup tempat menyimpan snippet
6. Otom tersimpan!

#### Membuat Snippet Baru
1. Di tree view, klik kanan pada grup
2. Pilih "Add Snippet to This Group"
3. Atau klik ikon "+" pada grup
4. Masukkan judul snippet
5. Editor WebView akan terbuka untuk mengisi konten

### Menggunakan Snippet

#### Sisipkan Kode (Code Snippets)
1. **Cara 1**: Klik snippet di tree view
2. **Cara 2**: Klik kanan snippet  "Sisipkan"
3. **Cara 3**: Command Palette  "Raja Snippets: Insert Snippet"
4. Kode akan disisipkan di posisi kursor

#### Jalankan di Terminal (Terminal Snippets)
1. Klik kanan snippet bertipe Terminal
2. Pilih "Terminal >" atau "Jalankan"
3. Perintah akan dijalankan di integrated terminal

### Mengedit Snippet
1. Klik kanan snippet di tree view
2. Pilih "Edit"
3. Editor WebView akan terbuka dengan form lengkap:
   - Ubah judul
   - Edit konten
   - Ganti tipe (Code/Terminal)
   - Pindahkan ke grup lain
   - Simpan atau hapus snippet

### Tips: Placeholder Dinamis
Gunakan placeholder `{$variabel}` untuk membuat snippet interaktif:
```
console.log("Hello, {$nama}!");
const {$variable} = {$value};
```
Saat snippet digunakan, VS Code akan meminta input untuk setiap placeholder.

##  Interface Tree View

- **Folder Ikon**: Menampilkan grup snippets
- **Code Ikon**: Snippet bertipe kode (bisa disisipkan ke editor)
- **Terminal Ikon**: Snippet bertipe terminal (bisa dijalankan di terminal)
- **Angka di Deskripsi**: Menampilkan total snippets dan detail tipe

##  Konfigurasi Storage

### Lokasi Default
Secara default, snippets tersimpan di:
```
%APPDATA%\Code\User\globalStorage\ridwans2.raja-snippets-manager\snippets.json
```

### Lokasi Custom
1. Klik ikon gear () di bar judul tree view
2. Pilih "Atur Lokasi Storage"
3. Pilih folder yang diinginkan
4. Snippets akan tersimpan di `[folder-pilihan]/snippets.json`

### Melihat Lokasi Storage
- Command Palette  "Raja Snippets: Tampilkan Lokasi Storage"
- Atau klik ikon gear  "Buka Storage" untuk membuka file snippets.json

##  Impor & Ekspor

### Ekspor Snippets
1. Klik ikon export () di bar judul tree view
2. Atau Command Palette  "Raja Snippets: Export to JSON"
3. Pilih lokasi penyimpanan
4. File JSON berisi semua grup dan snippets akan dibuat

### Impor Snippets
1. Klik ikon import () di bar judul tree view
2. Atau Command Palette  "Raja Snippets: Import from JSON"
3. Pilih file JSON yang akan diimpor
4. Pilih opsi:
   - **Merge**: Gabungkan dengan snippets yang ada
   - **Replace**: Ganti semua snippets yang ada

##  Semua Perintah

### Perintah Utama
- `rajaSnippets.addGroup` - Tambah grup baru
- `rajaSnippets.addSnippet` - Tambah snippet dari selection
- `rajaSnippets.insertSnippet` - Sisipkan snippet di kursor
- `rajaSnippets.runSnippet` - Jalankan snippet di terminal
- `rajaSnippets.listSnippets` - Tampilkan daftar snippets

### Perintah Manajemen
- `rajaSnippets.editOrDeleteSnippet` - Edit/hapus snippet
- `rajaSnippets.deleteSnippet` - Hapus snippet
- `rajaSnippets.deleteGroup` - Hapus grup
- `rajaSnippets.changeSnippetType` - Ubah tipe snippet

### Perintah Storage
- `rajaSnippets.openStorage` - Buka file storage
- `rajaSnippets.showStoragePath` - Tampilkan lokasi storage
- `rajaSnippets.configureStorage` - Atur lokasi storage

### Perintah Impor/Ekspor
- `rajaSnippets.exportSnippets` - Ekspor ke JSON
- `rajaSnippets.importSnippets` - Impor dari JSON

##  Tips Penggunaan Lanjutan

### Organisasi Grup
- Buat grup berdasarkan proyek atau teknologi
- Gunakan nama yang konsisten (misalnya: React Hooks, Node.js Utils)
- Manfaatkan deskripsi grup untuk mengetahui jumlah dan tipe snippet

### Best Practices Penggunaan
1. **Snippets Kode**: Simpan template, boilerplate, atau pattern yang sering digunakan
2. **Snippets Terminal**: Simpan perintah CLI, script, atau workflow automation
3. **Placeholder**: Gunakan untuk membuat snippet yang fleksibel
4. **Backup**: Rutin ekspor snippets untuk backup

### Jenis Snippet yang Berguna
**Code Snippets:**
- Function templates
- Class structures
- React components
- API endpoints
- Test templates
- Configuration files

**Terminal Snippets:**
- Git commands
- Build scripts
- Database queries
- Deployment commands
- Environment setup

##  Development

### Struktur Proyek
```
src/
 extension.ts      # Registrasi perintah dan aktivasi extension
 snippetManager.ts # Logika manajemen data snippets
 treeProvider.ts   # Tree view provider untuk sidebar
```

### Build & Publish
```powershell
# Build
npm run compile

# Package
npm run package

# Publish ke marketplace
npm run publish
```

##  Kontribusi

1. Fork proyek ini
2. Buat branch fitur (`git checkout -b fitur-baru`)
3. Commit perubahan (`git commit -m "Tambah fitur X"`)
4. Push ke branch (`git push origin fitur-baru`)
5. Buka Pull Request

##  Lisensi

[LICENSE](LICENSE)

##  Bug Reports & Feature Requests

Buka issue di [GitHub Issues](https://github.com/ridwans2/raja-snippets-manager/issues)

---

**Dibuat dengan  untuk meningkatkan produktivitas development**
