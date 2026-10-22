# Praktikum 2: Kalkulator Nilai dan Grade

## Deskripsi & Tujuan
Praktikum ini bertujuan untuk memahami dan mempraktikkan pengolahan data masukan pengguna melalui antarmuka web, meliputi:
1. Membaca nilai dari elemen formulir HTML (`<input type="number">`).
2. Melakukan konversi tipe data eksplisit dari string ke tipe numerik menggunakan fungsi `Number()`.
3. Membangun dan memanggil fungsi (*function*) yang menerima parameter serta mengembalikan nilai (*return value*).
4. Menerapkan struktur kontrol percabangan (`if`, `else if`, `else`) berjenjang untuk klasifikasi nilai ke dalam huruf mutu (*grade*).
5. Menerapkan validasi masukan sederhana dan manipulasi antarmuka dinamis berbasis status kelulusan.

---

## Struktur Berkas
- **`index.html`**: Halaman antarmuka yang menyediakan formulir masukan nilai Tugas, UTS, UAS, tombol eksekusi, serta wadah output hasil.
- **`style.css`**: Lembar gaya visual CSS untuk tata letak kartu form, penataan elemen input/tombol, dan pewarnaan status kelulusan (`.lulus` hijau, `.gagal` merah).
- **`script.js`**: Berkas logika JavaScript yang menangani perhitungan nilai akhir terbobot, penentuan grade, penanganan event klik, validasi rentang nilai, dan pembaruan DOM.
- **`README.md`**: Dokumentasi pembahasan kode, hasil tabel pengujian skenario, serta jawaban lengkap atas pertanyaan analisis.

---

## Pembahasan Kode

### 1. Antarmuka Formulir (`index.html`)
- Menggunakan elemen `<div class="wadah">` sebagai kontainer utama.
- Tiga elemen input bertipe angka:
  ```html
  <input type="number" id="tugas" min="0" max="100">
  <input type="number" id="uts" min="0" max="100">
  <input type="number" id="uas" min="0" max="100">
  ```
  Atribut `min="0"` dan `max="100"` memberikan batasan bawaan peramban untuk nilai terendah dan tertinggi.
- Tombol `<button id="hitung">Hitung</button>` memicu jalannya fungsi evaluasi nilai saat diklik.
- Elemen `<div id="hasil"></div>` berfungsi sebagai wadah penampil ringkasan nilai akhir, grade, dan status kelulusan.

### 2. Penataan Gaya CSS (`style.css`)
- Memberikan tata letak responsif dan bersih dengan lebar `340px` dan perataan tengah menggunakan `margin: 40px auto;`.
- Kelas CSS dinamis untuk status hasil:
  ```css
  .lulus { color: #15803d; } /* Hijau untuk status kelulusan */
  .gagal { color: #b91c1c; } /* Merah untuk status gagal / pesan validasi error */
  ```

### 3. Logika Pemrograman JavaScript (`script.js`)

#### A. Fungsi Perhitungan Nilai Akhir
```javascript
function hitungNilaiAkhir(tugas, uts, uas) {
    return tugas * 0.3 + uts * 0.3 + uas * 0.4;
}
```
- Menerima 3 parameter numerik (`tugas`, `uts`, `uas`).
- Menerapkan rumus persentase pembobotan akademik:
  $$\text{Nilai Akhir} = (30\% \times \text{Tugas}) + (30\% \times \text{UTS}) + (40\% \times \text{UAS})$$
- Mengembalikan nilai float hasil perhitungan melalui perintah `return`.

#### B. Fungsi Penentuan Grade (Huruf Mutu)
```javascript
function tentukanGrade(nilai) {
    if (nilai >= 85) return "A";
    else if (nilai >= 75) return "B";
    else if (nilai >= 60) return "C";
    else if (nilai >= 45) return "D";
    else return "E";
}
```
- Menggunakan struktur percabangan bertingkat `if - else if - else`.
- Ambang batas dievaluasi berurutan dari kategori nilai tertinggi hingga terendah.

#### C. Penanganan Event Klik dan Validasi Masukan
```javascript
document.getElementById("hitung").addEventListener("click", function () {
    const tugas = Number(document.getElementById("tugas").value);
    const uts = Number(document.getElementById("uts").value);
    const uas = Number(document.getElementById("uas").value);
    const hasil = document.getElementById("hasil");

    // Validasi sederhana
    if ([tugas, uts, uas].some(n => n < 0 || n > 100)) {
        hasil.textContent = "Nilai harus antara 0 sampai 100!";
        hasil.className = "gagal";
        return;
    }

    const akhir = hitungNilaiAkhir(tugas, uts, uas);
    const grade = tentukanGrade(akhir);
    const status = akhir >= 60 ? "LULUS" : "TIDAK LULUS";

    hasil.innerHTML = `Nilai Akhir: ${akhir.toFixed(2)}<br>
Grade: ${grade}<br>Status: ${status}`;
    hasil.className = akhir >= 60 ? "lulus" : "gagal";
});
```
- **Konversi Tipe Data**: Nilai dari input HTML bertipe string sehingga diubah secara eksplisit menjadi angka dengan fungsi `Number()`.
- **Validasi Nilai**: Menggunakan metode array `some()` untuk memeriksa apakah salah satu dari nilai bernilai `< 0` atau `> 100`. Jika ya, pesan kesalahan ditampilkan, kelas CSS diubah menjadi `"gagal"` (merah), dan proses dihentikan (`return`).
- **`akhir.toFixed(2)`**: Memformat bilangan desimal menjadi tepat 2 angka di belakang koma (misalnya `87.7` menjadi `87.70`).
- **Pewarnaan Dinamis**: Menetapkan properti `hasil.className` dengan operator ternary: jika `akhir >= 60`, menggunakan kelas `"lulus"` (hijau), selain itu `"gagal"` (merah).

---

## Tabel Hasil Uji Coba

Berdasarkan langkah pengujian yang ditentukan di modul praktikum:

| Uji ke- | Nilai Tugas | Nilai UTS | Nilai UAS | Nilai Akhir yang Didapat | Grade | Status | Keterangan / Warna |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :--- |
| **1** | 90 | 85 | 88 | **87.70** | **A** | LULUS | Berhasil dihitung (Teks Hijau) |
| **2** | 70 | 80 | 75 | **75.00** | **B** | LULUS | Berhasil dihitung (Teks Hijau) |
| **3** | 50 | 40 | 45 | **45.00** | **D** | TIDAK LULUS | Berhasil dihitung (Teks Merah) |
| **4** | 120 | 80 | 80 | *Pesan kesalahan* | – | – | *"Nilai harus antara 0 sampai 100!"* (Teks Merah) |

---

## Jawaban dan Penjelasan Pertanyaan Analisis

### Pertanyaan 1
> **Apa yang terjadi jika `Number()` dihapus dari ketiga baris input? Jelaskan dengan hasil percobaan.**

#### Jawaban & Hasil Percobaan:
1. **Tipe Data Masukan**:
   Secara spesifikasi HTML DOM, properti `.value` dari setiap elemen form (termasuk `<input type="number">`) **selalu mengembalikan nilai bertipe String**, bukan Number.
2. **Perilaku pada Fungsi Matematika**:
   - Jika kita menulis:
     ```javascript
     const tugas = document.getElementById("tugas").value; // contoh: "90"
     ```
     Ketika operasi perkalian dilakukan di dalam `hitungNilaiAkhir`:
     ```javascript
     return tugas * 0.3 + uts * 0.3 + uas * 0.4;
     ```
     JavaScript melakukan konversi tipe data implisit (*type coercion*) karena operator perkalian (`*`) secara khusus hanya bekerja pada angka. Akibatnya, `"90" * 0.3` tetap menghasilkan nilai numerik `27`.
3. **Bahaya dan Masalah Fatal yang Terjadi**:
   - **Perbandingan Leksikografis (String Comparison)**: Jika dilakukan operasi perbandingan seperti `"120" > "100"`, atau perbandingan lain, string dibandingkan berdasarkan urutan kode karakter alfabetis, bukan nilai numerik.
   - **Karakter Non-Angka atau Kosong**: Jika pengguna memasukkan input kosong atau spasi, operasi tanpa konversi eksplisit dapat dengan mudah menghasilkan nilai `NaN` (*Not a Number*).
   - **Operasi Penjumlahan Langsung**: Jika rumus perhitungan memiliki operasi penjumlahan langsung tanpa perkalian (misalnya `tugas + uts`), yang terjadi adalah **penggabungan string (*string concatenation*)**, contohnya `"80" + "70"` menghasilkan `"8070"`, bukan `150`.
4. **Kesimpulan**:
   Membungkus nilai input dengan fungsi `Number()` sangat krusial untuk menjamin konsistensi tipe data, mencegah kesalahan logika tak terduga (*unexpected coercion*), dan memastikan integritas proses validasi matematis.

---

### Pertanyaan 2
> **Mengapa urutan kondisi `if` dimulai dari nilai terbesar?**

#### Penjelasan:
1. **Mekanisme Evaluasi Berurutan (*Sequential Evaluation*)**:
   Struktur percabangan `if - else if - else` dievaluasi dari atas ke bawah secara sekuensial. Begitu sebuah kondisi bernilai `true`, blok kode di dalamnya akan langsung dieksekusi dan seluruh kondisi `else if` di bawahnya **akan langsung dilewati (*short-circuit*)**.
2. **Konsekuensi Jika Dimulai dari Nilai Terkecil**:
   Misalkan kondisi dibalik dimulai dari yang terkecil:
   ```javascript
   if (nilai >= 45) return "D";
   else if (nilai >= 60) return "C";
   else if (nilai >= 75) return "B";
   else if (nilai >= 85) return "A";
   else return "E";
   ```
   Jika seorang mahasiswa memperoleh nilai **`92`** (yang seharusnya mendapatkan nilai huruf **A**):
   - Mesin JavaScript akan mengevaluasi baris pertama: `92 >= 45`, yang menghasilkan nilai `true`.
   - Fungsi langsung mengembalikan nilai `"D"`.
   - Kondisi `nilai >= 85` tidak akan pernah tersentuh sama sekali.
3. **Kesimpulan**:
   Karena himpunan nilai yang lebih besar (misal $\ge 85$) adalah bagian (*subset*) dari himpunan nilai yang lebih kecil ($\ge 45$), kondisi dengan kriteria yang paling ketat dan bernilai paling tinggi wajib diletakkan di urutan paling atas.

---

### Pertanyaan 3
> **Tambahkan validasi agar input kosong tidak dihitung. Tuliskan kode tambahan Anda.**

#### Masalah pada Kode Asal:
Pada kode awal, jika input form dibiarkan kosong, `document.getElementById("tugas").value` menghasilkan string kosong `""`. Fungsi `Number("")` mengonversi string kosong menjadi angka `0`. Akibatnya, input kosong dianggap sebagai nilai 0 tanpa ada peringatan bahwa kolom belum diisi.

#### Kode Tambahan:
Pemeriksaan dilakukan dengan mengecek nilai `.trim() === ""` pada setiap elemen input sebelum proses kalkulasi dijalankan:

```javascript
document.getElementById("hitung").addEventListener("click", function () {
    // 1. Ambil nilai teks mentah dari setiap input
    const inputTugas = document.getElementById("tugas").value.trim();
    const inputUts = document.getElementById("uts").value.trim();
    const inputUas = document.getElementById("uas").value.trim();
    const hasil = document.getElementById("hasil");

    // 2. Validasi tambahan: Cegah jika ada kolom input yang masih kosong
    if (inputTugas === "" || inputUts === "" || inputUas === "") {
        hasil.textContent = "Semua kolom nilai wajib diisi!";
        hasil.className = "gagal";
        return; // Hentikan eksekusi program
    }

    // 3. Konversi ke tipe Number setelah dipastikan tidak kosong
    const tugas = Number(inputTugas);
    const uts = Number(inputUts);
    const uas = Number(inputUas);

    // 4. Validasi rentang nilai (0 - 100)
    if ([tugas, uts, uas].some(n => n < 0 || n > 100)) {
        hasil.textContent = "Nilai harus antara 0 sampai 100!";
        hasil.className = "gagal";
        return;
    }

    // 5. Hitung nilai akhir, grade, dan status
    const akhir = hitungNilaiAkhir(tugas, uts, uas);
    const grade = tentukanGrade(akhir);
    const status = akhir >= 60 ? "LULUS" : "TIDAK LULUS";

    hasil.innerHTML = `Nilai Akhir: ${akhir.toFixed(2)}<br>
Grade: ${grade}<br>Status: ${status}`;
    hasil.className = akhir >= 60 ? "lulus" : "gagal";
});
```
