const express = require('express');
const path = require('path');
const app = express();

const request = require('postman-request');

const getBerita = (callback) => {
    const apiKey = '10d3bc7ce20d27cd3d8af5c09b52c87b'; // Ganti dengan API key Anda
    const url = `http://api.mediastack.com/v1/news?access_key=${apiKey}&countries=id&limit=5`;

    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Tidak dapat menghubungi layanan berita!', undefined);
        } else if (body.error) {
            callback('Gagal mengambil berita. Silakan cek API Key atau endpoint.', undefined);
        } else {
            callback(undefined, body.data);
        }
    });
};

module.exports = getBerita;
