class Download {
    
    async downloadAll(openConnection, saveDownload, list, maxPool) {
        let control = [];
        let index = 0;
    
        while (true) {
            for (let i = 0; i < maxPool; i++) {
                if (control[i] !== undefined) {
                    if (control[i].hasOwnProperty('reserved') == false) {
                        control[i].reserved = true;
                        console.log(`abrindo conexão com ${control[i].url}`);
                        openConnection(control[i].url).then((content) => {
                            console.log('entrou aqui');
                            let user = control[i].url.split('/')[4];
                            let fileName = `user_${user}.json`;
                            let path = `./downloads/${fileName}`;
                            saveDownload(path, content).then(() => {
                                console.log(`Download finalizado ${control[i].url}`);
                                delete control[i];
                            });
                        });
                    } else {
                        console.log('pool ' + i + ' is in use. processing ' + control[i].url);
                    }
                } else {    
                    console.log('pool ' + i + ' is free.');    
                    control[i] = list[index];
                    index++;
    
                    let stop = true;
    
                    for (let j = 0; j < maxPool; j++) {
                        if (control[i] !== undefined) {
                            stop = false;
                        }
                    }
                    
                    if (stop) {
                        console.log('Closing because all pool are free!');
                        return;
                    }
                }
            }
            
            await new Promise(r => setTimeout(r, 500));
        }
    }
}

module.exports = { Download }