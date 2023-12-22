var http = require('http');

var fs = require('fs');

const { Download } = require('./src/download');

const list = [
    {
        "url": "http://jsonplaceholder.typicode.com/users/1"
    },
    {
        "url": "http://jsonplaceholder.typicode.com/users/2"
    },
    {
        "url": "http://jsonplaceholder.typicode.com/users/3"
    },
    {
        "url": "http://jsonplaceholder.typicode.com/users/4"
    },
    {
        "url": "http://jsonplaceholder.typicode.com/users/5"
    },
    {
        "url": "http://jsonplaceholder.typicode.com/users/6"
    },
    {
        "url": "http://jsonplaceholder.typicode.com/users/7"
    },
    {
        "url": "http://jsonplaceholder.typicode.com/users/8"
    },
    {
        "url": "http://jsonplaceholder.typicode.com/users/9"
    },
    {
        "url": "http://jsonplaceholder.typicode.com/users/10"
    },
];


const maxPool = 4;


let openConnection = async function openConnection(url) {
    return new Promise((resolve, reject) => {
        http.get(url, res => {
            let data = [];
            res.on('data', chunk => {
                data.push(chunk);
            });
            res.on('end', () => {
                let content = Buffer.concat(data).toString();
                resolve(content);
            });
        }).on('error', err => {
            console.log('Error: ', err.message);
            reject(err);
        });
    });
}

let saveDownload = async function saveDownload(path, content) {

    //await new Promise(r => setTimeout(r, 10000 + (Math.random() * 10000)));

    return new Promise((resolve, reject) => {
        fs.writeFile(path, content, (err) => {
            if (err) {
                reject(err)
                console.error(err);
            } else {
                resolve()
                console.log('sucesso');
            }
        });
    });
}


let download = new Download();

download.downloadAll(openConnection, saveDownload, list, maxPool);