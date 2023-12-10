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


## Deploy Aplikasi Nodejs in GCP
### Deploy Aplikasi Node.js di GCP dengan Compute Engine

### Dokumentasi

- Prasyarat
1. Akun Google Cloud Platform
2. Proyek Google Cloud Platform
3. Lingkungan pengembangan Node.js
4. Cloud SQL instance (opsional)

### Langkah-langkah

- Buat Proyek Google Cloud Platform:
    Buka https://console.cloud.google.com/: https://console.cloud.google.com/.
- Klik tombol Create Project.
- Aktifkan API:
    Buka https://console.cloud.google.com/apis/library/: https://console.cloud.google.com/apis/library/.
- Aktifkan API Compute Engine.
- (Opsional) Aktifkan API Cloud SQL jika menggunakan database.
- Buat VM Instance and Firewal:
    Buka https://console.cloud.google.com/compute/instances/: https://console.cloud.google.com/compute/instances/.
      - Create VM Firewale in Compute Engine
      - Create VM Instance
      - Klik tombol Create Instance.
- Konfigurasikan VM instance sesuai kebutuhan.
      - KOnfigurasi VM Instance
      ```bash
      gcloud compute instance list
      ```
      - Masuk ke ssh instance
      ```bash
      gcloud compute ssh <nama instance> --zone <isi zone instance>
      ```
      - Update pakage
      ```bash
      sudo apt update
      ```     
- Instal Node.js di VM Instance melalui cloud run :
- Buka terminal pada VM instance.
    Jalankan perintah:
```bash
curl -sL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
```
```bash
sudo apt-get install -y nodejs
```
- Remove node_modules/
      ```bash
      rm -r node_modules/
      ```
- Keluar derectory
      ```bash
      cd ..
      ```
- Jalankan compute scp
      ```bash
      gcloud compute scp --recurse <nama folder apps> <nama instance>: --zone <zone instance>
      ```
Deploy Aplikasi Node.js:
Salin aplikasi Node.js ke VM instance.
Jalankan perintah:
```bash
cd /path/to/app
```
```bash
npm install
```
```bash
npm start
```
Akses Aplikasi:
Buka http://<instance_ip>:8080 di browser.

### Running tu pm2 
- change derectory folder apps
- install pm2 in instance
  ```bash
  sudo npm install pm2@latest -g
  ```
- use derectory folder index
- running server apps with pm2
  ```bash
  PORT=8080 DEBUG=<nama folder apps>:* pm2 start <nama folder index>
  ```
- monitoring pm2
  ```bash
  pm2 logs
  ```

  ### selesai backend running/ online
  HTTP://<externalIP>:8080 in browser
