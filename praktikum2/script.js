
function hitungNilaiAkhir(tugas, uts, uas) {
    return tugas * 0.3 + uts * 0.3 + uas * 0.4;
}
function tentukanGrade(nilai) {
    if (nilai >= 85) return "A";
    else if (nilai >= 75) return "B";
    else if (nilai >= 60) return "C";
    else if (nilai >= 45) return "D";
    else return "E";
}
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
    Grade: ${grade}<br>
    Status: ${status}`;
    hasil.className = akhir >= 60 ? "lulus" : "gagal";
});
