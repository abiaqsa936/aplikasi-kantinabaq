const menuKantin = [
    { nama: "Keripik Kentang", harga: 5000 },
    { nama: "Es Teh Manis", harga: 3000 },
    { nama: "Es Milo", harga: 7000 },
    { nama: "Ayam Geprek", harga: 12000 },
    { nama: "Sate Usus", harga: 2000 },
    { nama: "Gorengan", harga: 2000 }
];

let totalPemasukan = 0;

window.onload = function() {
    tampilkanMenu();
};

function tampilkanMenu() {
    const container = document.getElementById("tempat-menu");
    container.innerHTML = "";
    menuKantin.forEach((item, i) => {
        container.innerHTML += `
            <div class="menu-item">
                <div>
                    <div style="font-weight:bold">${item.nama}</div>
                    <div style="font-size:12px; color:green">Rp ${item.harga.toLocaleString()}</div>
                </div>
                <input type="number" id="qty-${i}" value="0" min="0">
            </div>
        `;
    });
}

// Fungsi Refresh/Ulang (Sesuai Permintaanmu)
function ulangIsi() {
    for (let i = 0; i < menuKantin.length; i++) {
        document.getElementById(`qty-${i}`).value = 0;
    }
    document.getElementById("display-harga").innerText = "Rp 0";
    document.getElementById("pesan-diskon").innerText = "";
}

function hitungTotal() {
    let totalBayar = 0;
    let rincian = "";

    for (let i = 0; i < menuKantin.length; i++) {
        let qty = parseInt(document.getElementById(`qty-${i}`).value) || 0;
        if (qty > 0) {
            let subtotal = 0;
            if (menuKantin[i].nama === "Gorengan") {
                subtotal = (Math.floor(qty / 2) * 3000) + ((qty % 2) * 2000);
            } else {
                subtotal = menuKantin[i].harga * qty;
            }
            totalBayar += subtotal;
        }
    }

    if (totalBayar === 0) return alert("Pilih menu dulu!");

    // Logika Diskon
    if (totalBayar > 50000) {
        totalBayar *= 0.9;
        document.getElementById("pesan-diskon").innerText = "🎉 Diskon 10% Aktif!";
    } else {
        document.getElementById("pesan-diskon").innerText = "";
    }

    // Tampilkan Total
    document.getElementById("display-harga").innerText = "Rp " + totalBayar.toLocaleString('id-ID');

    // Catat ke Riwayat Pemasukan
    catatRiwayat(totalBayar);
    
    // Setelah bayar, reset input (opsional, biar bisa input baru)
    // ulangIsi(); 
}

function catatRiwayat(nominal) {
    totalPemasukan += nominal;
    const list = document.getElementById("list-riwayat");
    const waktu = new Date().toLocaleTimeString();
    
    let itemBaru = `<li><span>Transaksi ${waktu}</span> <b>Rp ${nominal.toLocaleString()}</b></li>`;
    list.innerHTML = itemBaru + list.innerHTML; // Tambah di paling atas
    
    document.getElementById("total-pendapatan").innerText = "Rp " + totalPemasukan.toLocaleString('id-ID');
}