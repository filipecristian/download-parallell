var http = require('http');
var fs = require('fs');

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
];


const maxPool = 4;


async function sleep(ms) {
    // add ms millisecond timeout before promise resolution
    return new Promise(resolve => setTimeout(resolve(ms), ms));
}


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

    await new Promise(r => setTimeout(r, 10000 + (Math.random() * 10000)));

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


async function downloadAll(openConnection, saveDownload, list, maxPool) {
    let control = [];
    let index = 0;

    while (true) {
        for (let i = 0; i < maxPool; i++) {
            if (control[i] !== undefined) {
                if (control[i].hasOwnProperty('reserved') == false) {
                    control[i].reserved = true;
                    //console.log(`abrindo conexão com ${control[i].url}`);
                    openConnection(control[i].url).then((content) => {
                        //console.log('entrou aqui');
                        let user = control[i].url.split('/')[4];
                        let fileName = `user_${user}.json`;
                        let path = `./downloads/${fileName}`;
                        saveDownload(path, content).then(() => {
                            //console.log(`Download finalizado ${control[i].url}`);
                            delete control[i];
                        });
                    });
                } else {
                    //console.log('pool ' + i + ' is in use. processing ' + control[i].url);
                }
            } else {    
                //console.log('pool ' + i + ' is free.');    
                control[i] = list[index];
                index++;

                let stop = true;

                for (j = 0; j < maxPool; j++) {
                    if (control[i] !== undefined) {
                        stop = false;
                    }
                }
                
                if (stop) {
                    //console.log('Closing because all pool are free!');
                    return;
                }
            }
        }
        
        await new Promise(r => setTimeout(r, 500));
    }
}    



//downloadAll(openConnection, saveDownload, list, maxPool);


module.exports = { sleep, list, downloadAll };