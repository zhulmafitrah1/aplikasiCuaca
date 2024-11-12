const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=133d2d3c6e56ea090c3fb16bbc16ab3e&query=' +
        encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '&units=m';

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            console.log('Error koneksi:', error); // Log error koneksi
            callback('Tidak dapat terkoneksi ke layanan', undefined);
        } else if (response.body.error) {
            console.log('Error data cuaca:', response.body); // Log jika data cuaca tidak ditemukan
            callback('Tidak dapat menemukan lokasi', undefined);
        } else {
            console.log('Data cuaca yang diterima:', response.body.current); // Log data cuaca yang berhasil
            callback(undefined,
                'Info Cuaca: ' + response.body.current.weather_descriptions[0] + '. ' +
                'Suhu saat ini adalah ' + response.body.current.temperature + ' derajat. ' +
                'Index UV adalah ' + response.body.current.uv_index + ' nm. ' +
                'Visibilitas ' + response.body.current.visibility + ' kilometer'
            );
        }
    });
};

module.exports = forecast;
