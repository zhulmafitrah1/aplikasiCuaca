const path = require('path');
const express = require('express');
const hbs = require('hbs');
const app = express();
const port = process.env.PORT || 5000;
const geocode = require('./utils/geocode');
const forecast = require('./utils/prediksiCuaca');
const getBerita = require('./utils/berita'); // Import fungsi getBerita

// Tentukan direktori untuk file statis dan views
const direktoriPublic = path.join(__dirname, '../public');
const direktoriViews = path.join(__dirname, '../templates/views');
app.set('views', direktoriViews);
const direktoriPartials = path.join(__dirname, '../templates/partials');

// Setup handlebars (hbs) dan lokasi folder views
app.set('view engine', 'hbs');
hbs.registerPartials(direktoriPartials);

// Middleware untuk melayani file statis
app.use(express.static(direktoriPublic));

// Halaman utama dengan template hbs
app.get('/', (req, res) => { 
    res.render('index', { 
        judul: 'Aplikasi Cek Cuaca', 
        nama: 'Zhulma Fitrah' 
    });
});

// Rute untuk info cuaca
app.get('/infoCuaca', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Kamu harus memasukan lokasi yang ingin dicari'
        });
    }

    console.log('Alamat yang dimasukkan:', req.query.address); // Log alamat yang dicari

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            console.log('Error geocode:', error); // Log error geocode
            return res.send({ error });
        }

        console.log('Koordinat lokasi:', { latitude, longitude }); // Log koordinat lokasi

        forecast(latitude, longitude, (error, dataPrediksi) => {
            if (error) {
                console.log('Error forecast:', error); // Log error forecast
                return res.send({ error });
            }

            console.log('Data cuaca untuk lokasi:', location, dataPrediksi); // Log data cuaca
            res.send({
                prediksiCuaca: dataPrediksi,
                lokasi: location,
                address: req.query.address
            });
        });
    });
});

// Halaman 404 untuk rute bantuan yang tidak ditemukan
app.get('/bantuan/', (req, res) => {
    res.render('bantuan', {
        judul: 'Bantuan',
        nama: 'Zhulma Fitrah',
        teksBantuan: 'Ini adalah teks bantuan.'
    });
});

// Halaman 404 untuk semua rute lainnya
app.get('/tentang/', (req, res) => {
    res.render('tentang', {
        judul: 'Tentang Saya',
        nama: 'Zhulma Fitrah'
    });
});

// Rute untuk halaman berita
app.get('/berita', (req, res) => {
    getBerita((error, dataBerita) => {
        if (error) {
            return res.render('berita', {
                judul: 'News Today',
                error: 'Gagal mengambil berita. Silakan coba lagi nanti.'
            });
        }

        res.render('berita', {
            judul: 'Berita Terbaru',
            berita: dataBerita
        });
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        judul: '404',
        nama: 'Zhulma Fitrah',
        pesanKesalahan: 'Artikel yang dicari tidak ditemukan.'
    });
});
// Jalankan server di port 5000
app.listen(port, () => { 
    console.log('Server berjalan pada port ' + port);
});
