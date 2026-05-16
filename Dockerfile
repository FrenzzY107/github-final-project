# Menggunakan base image Python resmi yang ringan
FROM python:3.9-slim

# Menetapkan folder kerja di dalam kontainer
WORKDIR /app

# Menyalin berkas requirements.txt terlebih dahulu untuk memanfaatkan cache layer Docker
COPY requirements.txt .

# Menginstal semua pustaka dependencies yang diperlukan
RUN pip install --no-cache-dir -r requirements.txt

# Menyalin seluruh kode sumber proyek ke dalam folder kerja kontainer
COPY . .

# Menentukan port yang akan digunakan oleh aplikasi di dalam kontainer
EXPOSE 5000

# Perintah utama untuk menjalankan aplikasi saat kontainer dinyalakan
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "service:app"]
