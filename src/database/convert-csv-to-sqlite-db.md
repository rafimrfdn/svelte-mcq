# Cara convert csv file ke sqlite3 file database.

1. Pastikan sudah install sqlite di komputer
2. Buka terminal pada folder yang sama dengan file file.csv yang akan diconvert
3. Ketik `sqlite3 namafile.db`
4. Ketik `.mode csv`
5. Ketik `.import file.csv namatableyangdiinginkan`
6. Ketik `.tables` untuk melihat list table.
7. Ketik `SELECT * FROM namatable` yang ada pada list table untuk melihat isi table.
6. Ketik `.quit` untuk keluar dari sqlite.

Selesai
