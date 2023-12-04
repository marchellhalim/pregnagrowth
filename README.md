# pregnagrowth
Product Capstone Bangkit 2023
Aplikasi ini menyediakan API untuk pertanyaan yang sering diajukan oleh ibu hamil.

## Instalasi

1. Pastikan Anda sudah menginstall versi minimal v.20.10 [Node.js](https://nodejs.org/).
2. Clone repositori ini ke komputer Anda:

    ```bash
    https://github.com/marchellhalim/pregnagrowth.git
    ```

3. Pindah ke direktori aplikasi:

    ```bash
    cd pregnagrowth
    ```
    ```bash
    cd Cloud_Computing
    ```

4. Instal dependensi:

    ```bash
    npm install
    ```

5. Salin file `.env.example` ke `.env` dan sesuaikan konfigurasi database dan variabel lingkungan lainnya:

    ```bash
    cp .env.example .env
    ```

    Gantilah nilai variabel di dalam file `.env` sesuai dengan kebutuhan Anda.
   Buat Database MySql:
    ```bash
    pregnaGrowthDb
    ```

7. Migrasikan database menggunakan Prisma:

    ```bash
    npx prisma migrate dev
    ```

8. Jalankan aplikasi:

    ```bash
    npm run dev
    ```

    Aplikasi akan berjalan di [http://localhost:8000](http://localhost:8000).

## API

### 1. Mendapatkan Pertanyaan berdasarkan Kata Kunci / F&Q

- **Endpoint:** `/api/faq/:question`
- **Method:** GET
- **Deskripsi:** Mendapatkan pertanyaan dan jawaban berdasarkan kata kunci pertanyaan.
- **Contoh Penggunaan:**


  ## Daftar API

| No.  | Endpoint                    | Metode | Deskripsi                                      |
|------|-----------------------------|--------|------------------------------------------------|
| 1    | `/api/v1/question/faq/:question`       | GET    | Mendapatkan pertanyaan berdasarkan kata kunci. |
| 2    | `/api/v1/question/:id`                 | GET    | Mendapatkan pertanyaan berdasarkan id.         |
| 3    | `/api/v1/question`                     | GET    | Mendapatkan Seluruh data f&q didalam database. |
| 2    | `/api/v1/question`                     | POST   | Menambahkan data question.                     |

- Penggunaan API untuk memberikan berdasarkan pertanyaan yang serin ditanyakan ibu hamil
  ```http
  GET /api/v1/question/question/question/Berapa%20lama%20kehamilan%20normal?


### 2. Menggunakan API Login dan Register

- **Endpoint:** `/api/v1/auth`
- **Deskripsi:** Mendapatkan API untuk login dan register.
- **Contoh Penggunaan:**


  ## Daftar API

| No.  | Endpoint                    | Metode | Deskripsi                                      |
|------|-----------------------------|--------|------------------------------------------------|
| 1    | `/api/v1/auth/login`        | POST   | Mengunakan API untuk request login.            |
| 2    | `/api/v1/auth/login/admin`  | POST   | Menggunakan API login admin.                   |
| 3    | `/api/v1/auth/register`     | POST   | Untuk request API register .                   |

- Contoh Penggunaan API login dan register
  ```http
  POST /api/v1/auth/register

### 3. Menggunakan API Untuk Role

- **Endpoint:** `/api/v1/role`
- **Deskripsi:** Mendapatkan API untuk role login aplikasi.
- **Contoh Penggunaan:**


  ## Daftar API

| No.  | Endpoint                    | Metode | Deskripsi                                      |
|------|-----------------------------|--------|------------------------------------------------|
| 1    | `/api/v1/role`        | GET   | Mengunakan API untuk melihat semua data role.         |
| 2    | `/api/v1/role/:id`    | GET   | Menggunakan API untuk melihat role by id.             |
| 3    | `/api/v1/role`        | POST  | Untuk request API untuk membuat role.                 |
| 4    | `/api/v1/role/:id`    | PUT   | Menggunakan API untuk mengupdate role by id.          |
| 5    | `/api/v1/role/:id`    | DELETE| Menggunakan API untuk hapus role by id.               |

- Contoh Penggunaan API login dan register
  ```http
  GET /api/v1/role
