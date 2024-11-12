const request = require('postman-request');

const geocode = (address, callback) => {
    const url = 'http://api.positionstack.com/v1/forward?access_key=ae8484a29384710f229dc126cfded301&query=' + 
        encodeURIComponent(address);
        
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            console.log('Error koneksi:', error); // Log error koneksi
            callback('Tidak dapat terkoneksi ke layanan', undefined);
        } else if (!response.body.data || response.body.data.length === 0) {
            console.log('Data lokasi tidak ditemukan:', response.body); // Log jika data tidak ada
            callback('Tidak dapat menemukan lokasi. Lakukan pencarian lokasi yang lain', undefined);
        } else {
            console.log('Data lokasi yang diterima:', response.body.data[0]); // Log data lokasi yang berhasil
            callback(undefined, {
                latitude: response.body.data[0].latitude,
                longitude: response.body.data[0].longitude,
                location: response.body.data[0].label
            });
        }
    });
};

module.exports = geocode;
