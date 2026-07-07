// ===================================================
// SISTEM FORM BUKU TAMU & LOCALSTORAGE UNTUK UAS WCD
// ===================================================

function saveFeedback(event) {
    event.preventDefault(); // Mencegah form memuat ulang (reload) halaman otomatis

    // Mengambil nilai dari elemen-elemen input form
    const name = document.getElementById('reader-name').value;
    const email = document.getElementById('reader-email').value;
    const type = document.querySelector('input[name="message-type"]:checked').value;
    const message = document.getElementById('reader-message').value;

    // Menyusun data ke dalam bentuk objek tunggal
    const guestData = {
        readerName: name,
        readerEmail: email,
        messageType: type,
        readerMessage: message
    };

    // Menyimpan objek ke LocalStorage dalam bentuk JSON String
    localStorage.setItem('portfolio_guestbook', JSON.stringify(guestData));

    // Render hasil penyimpanan ke layar portofolio
    renderGuestbookData(guestData);
}

function renderGuestbookData(data) {
    if (!data) return;

    // Menampilkan rangkuman teks ke elemen output di bawah form
    document.getElementById('out-name').innerText = data.readerName;
    document.getElementById('out-email').innerText = data.readerEmail;
    document.getElementById('out-type').innerText = data.messageType;

    // Mengisi ulang field input agar data yang baru diketik tidak hilang saat di-refresh
    document.getElementById('reader-name').value = data.readerName;
    document.getElementById('reader-email').value = data.readerEmail;
    document.getElementById('reader-message').value = data.readerMessage;
    
    const selectedRadio = document.querySelector(`input[name="message-type"][value="${data.messageType}"]`);
    if (selectedRadio) selectedRadio.checked = true;

    // Mengunci semua kolom input (Disable) agar data aman sebelum tombol update ditekan
    lockGuestForm(true);

    // Menukar visibilitas tombol aksi (Sembunyikan Kirim, Tampilkan Tombol Update)
    document.getElementById('btn-submit-guest').classList.add('hidden');
    document.getElementById('btn-update-guest').classList.remove('hidden');
    document.getElementById('guestbook-status').classList.remove('hidden');
}

function enableGuestUpdate() {
    lockGuestForm(false); // Membuka kembali gembok field input agar bisa diedit
    
    // Mengembalikan tombol Simpan ke layar dan menyembunyikan tombol Update
    document.getElementById('btn-submit-guest').classList.remove('hidden');
    document.getElementById('btn-update-guest').classList.add('hidden');
}

function lockGuestForm(isLocked) {
    document.getElementById('reader-name').disabled = isLocked;
    document.getElementById('reader-email').disabled = isLocked;
    document.getElementById('reader-message').disabled = isLocked;
    document.querySelectorAll('input[name="message-type"]').forEach(radio => {
        radio.disabled = isLocked;
    });
}

// Fungsi otomatis memeriksa ketersediaan data di LocalStorage saat halaman di-load ulang
function loadSavedGuestbook() {
    const localData = localStorage.getItem('portfolio_guestbook');
    if (localData) {
        const parsedData = JSON.parse(localData);
        renderGuestbookData(parsedData);
    }
}

// Mendaftarkan fungsi auto-load pada lifecycle DOM browser
window.addEventListener('DOMContentLoaded', loadSavedGuestbook);