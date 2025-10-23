# Raja Snippets Manager

VS Code extension untuk menyimpan & mengelola kode snippets: buat grup, simpan dari selection, sisipkan di kursor, atau jalankan di terminal.

## Cara menjalankan
```powershell
npm install
npm run compile
# Buka folder ini di VS Code, lalu tekan F5 (Extension Development Host)
```

## Perintah
- Add Group (buat grup baru)
- Add Snippet from Selection (simpan selection atau seluruh buffer sebagai snippet ke grup)
- Insert Snippet (pilih dari quick pick & sisipkan)
- Run Snippet in Terminal (jalankan snippet di integrated terminal)
- List Snippets (tampilkan & sisipkan sebagai SnippetString)
- Edit or Delete Snippet (pilih lalu edit title/content/pindah grup/hapus)
- Delete Group
- Export to JSON
- Import from JSON

## Tambahan
- Tree view di sidebar Explorer: “Raja Snippets” menampilkan grup dan snippet-nya.
- Storage: file JSON di `globalStorageUri/snippets.json` (bebas dibackup).
- Refresh otomatis setelah penambahan/penghapusan.

## Penggunaan ideal
1. Buat grup per proyek/kategori.
2. Highlight kode di editor → Add Snippet from Selection → pilih grup.
3. Insert:sidebar atau quick pick; klik snippet di sidebar untuk insert di kursor.
4. Run: gunakan Run Snippet untuk perintah satu-baris atau script.

## Catatan
- Pengeditan konten membuka temporary editor; simpan untuk apply.
- Semua data tersimpan di `globalStorageUri` (biasanya di `%APPDATA%/Code/User/globalStorage/...`).
