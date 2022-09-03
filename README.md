
# Toko Buku Restful Api

Aplikasi ini adalah sample dari implementasu tekologi Restful API, caching,clean code, pattern dan transaction SQL
 


## Tech Stack

**Server:** Node js, Express ,Mysql , sequelize(ORM) , node-cache (caching)


## Run Locally

Clone the project

```bash
  git clone https://github.com/hanafiadhi/Server--Toko-Buku.git
```

Go to the project directory

```bash
  cd Server--Toko-Buku
```

Install dependencies

```bash
  npm install
```

Install Database And Make Seeder

```bash
  drop database
  npx sequelize-cli db:drop 
  
  create database
  npx sequelize-cli db:create 
  
  migration data
  npx sequelize-cli db:migrate 
  
  seeder
  npx sequelize-cli db:seed:all 
```

Start the server

```bash
  npm run start / npm run dev
```


## Documentation

[Documentation Api By Postman](https://documenter.getpostman.com/view/9008466/VUxRP6Lf)


## Demo

[Demo Aplikasi just Waiting](https://linktodocumentation)


## Pattern

- Dependency Injection Pattern
  - Karena memudahkan kita saat membutuhkan sesuatu untuk digunakan

- Facade Pattern
  - Ketika kita ada code yang sama, bisa kita pisahkan saja menjadi function lalu Ketika di butuhkan kita tinggal panggil saja

- Adapter Pattern
  - karena sering di pakai, contohya di ORM

- Builder Pattern
  - Karena sing digunakan dan juga membantu saya untuk mengelola code agar tidak terlalu complex


## Pertanyaan

### Apa perbedaan Type dan Interface pada TypeScript ?
 - dari yang saya pahami di TypeScript untuk Type itu lebih banyak di gunakan seperti union, primitive, intersection, tuple,
 - Interface TypeScript biasanya menggambarkan data Shape contohnya Object

### Bagaimana cara untuk mendebugging sebuah aplikasi di local maupun sudah di production ?
 - dari yang saya tau kita bisa menggunakan teknologi yang namanya Logging contoh librarynya yaitu wiston dan wiston-daily-rotate (WDR). Dari Logging tersebut bisa kita spread atau bagi berdasarkan level. contoh ketika ada erro kita bisa memasukanya ke wiston dengan transport fileName execpion.log nantinya ketika ada error si aplikasi bisa mengirim pemberitahuan bahwa aplikasinya erro lewat email. tetapi jika masih di local kita bisa menggunakan unit testing seperti Jest dan Supertest

### Bagaimana cara mengetahui kompleksitas sebuah query dan cara untuk menguranginya ?
 - untuk mengetahui sebuah kompleksitas sebuah query yaitu dengan mencoba menghitung berapa lama data itu tampil setelah di query,
 - dari pengalam saya beberapa cara untuk menguranginya adalah 
   - (1) dengan menerapkan Eager Loading pada masalah N+1 problem,
   - (2) untuk masalah pagination kita bisa batasi seperti kita query untuk menampilkan tetapi kita limit 100 dari data yang sesungguhnya 200 lalu kita paginate
   - (3) kita bisa menampilkan semua data berdasarkan daya yang kita filer berdasarkan category, contoh diambil dari https://mariadb.com/kb/en/pagination-optimization/
   - (4) bisa menggunakan teknik yang namanya Lazy Loading. jadi ketika query pertama kita limit 10 nah ketika ada request lagi  kita ambil lagi 10 lalu kita respone
   - (5) kita bisa menggunakan technik caching dengan redis contohnya jadi ketika ada query get kita ambil datanya lalu kirim ke client dan juga redis, ketika ada user lain request ke query get kita bisa kembalikan data yang ada di redis. kasus ini untuk data yang sering di lihat contohnya book pada aplikasi ini.
   - (6) bisa menggunakan elastic search untuk mencari data lebih cepat tetapi kita bisa menggunakan Mysql sebagai cadangan data/ backup dari elastic search
   - (7) membatasi tampil data 30 hari kebelakang (studi kasuk pada BCA) dan juga lebih spesific ke tanggal contoh getHistoryBelanja(dari tanggal - sampai tanggal) (studi kasus di Tokopedia/ Bli Bli)

