# 🥗 NutriPlate - Healthy Integrator
**Tugas 3 - Teknologi Sistem Terintegrasi (TST)**

Platform integrasi layanan mikro (*microservices*) yang menghubungkan **Recipe Service** dan **Nutritional Analysis Service** dalam satu antarmuka terpadu.

---

## Link Demo & Deployment
Aplikasi ini telah di-deploy menggunakan **GitHub Pages** dan dapat diakses secara publik:
* **Link Web:** https://vincentiabelindaa.github.io/uas-tst-tugas3/ 
* **Repository:** https://github.com/vincentiabelindaa/uas-tst-tugas3.git 

---

## Deskripsi Proyek
**NutriPlate Integrator** adalah aplikasi berbasis web (*client-side application*) yang berfungsi sebagai orkestrator untuk dua layanan backend yang berbeda. Aplikasi ini bertujuan menyelesaikan masalah pengguna yang ingin mengetahui estimasi kalori dari sebuah resep masakan secara instan.

### Fitur Utama:
1.  **Katalog Resep Otomatis:** Mengambil daftar resep dari *Recipe Service* (API Internal).
2.  **Kalkulasi Nutrisi Real-time:** Menghitung total kalori berdasarkan bahan resep menggunakan *Calorie Service* (API Mitra).
3.  **Responsive UI:** Tampilan antarmuka yang responsif menggunakan CSS Grid.

---

## Arsitektur Integrasi
Aplikasi ini menerapkan pola **Client-Side Orchestration**. Browser pengguna bertindak sebagai penghubung yang mengambil data dari Layanan A, memprosesnya, lalu mengirimkannya ke Layanan B.

### Alur Kerja Sistem:
1.  **Fetch Data:** Aplikasi me-request daftar resep ke `Recipe API`.
2.  **User Action:** Pengguna memilih salah satu kartu resep.
3.  **Data Parsing (Middleware Logic):**
    * *Recipe API* memberikan data bahan dalam format String: `"chicken, rice, egg"`
    * *Script.js* memecah string tersebut menjadi Array JSON: `["chicken", "rice", "egg"]` agar sesuai dengan spesifikasi *Calorie API*.
4.  **Calculate:** Array bahan dikirim ke `Calorie API` milik teman.
5.  **Display:** Hasil perhitungan kalori ditampilkan berdampingan dengan detail resep.

---

## Teknologi yang Digunakan
* **Frontend:** HTML, CSS, JavaScript.
* **Deployment:** GitHub Pages (Static Hosting).

---

## Dokumentasi API yang Diintegrasikan

Aplikasi ini mengonsumsi dua endpoint API berikut:

### 1. Recipe Service (Internal)
Layanan penyedia konten resep.
* **Base URL:** `https://recipes.otwdochub.my.id/recipes`
* **Method:** `GET`
* **Auth Header:** `X-API-KEY: belin123`

### 2. Nutritional Analysis Service (Mitra)
Layanan kalkulator kalori makanan.
* **Base URL:** `https://cal.otwdochub.my.id/index.php/calculate`
* **Method:** `POST`
* **Auth Header:** `X-API-KEY: nutriplate`
* **Payload Format:** `{"ingredients": ["item1", "item2"]}`

---

## Cara Menjalankan (Local Development)

1.  **Clone Repository**
    ```bash
    git clone https://github.com/vincentiabelindaa/uas-tst-tugas3.git 
    ```

2.  **Buka File**
    Buka file `index.html` menggunakan browser (Chrome, Edge, Firefox). Pastikan koneksi internet aktif karena aplikasi perlu mengambil API eksternal.

---

## Tangkapan Web NutriPlate

<img width="1919" height="1089" alt="Screenshot 2026-01-05 103502" src="https://github.com/user-attachments/assets/a747f2f6-f3d0-464c-a22e-b0f25222f2e9" />

---
