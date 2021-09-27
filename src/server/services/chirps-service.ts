//this is data layer, does not have to do with the routes

//convert from require to import * as
import * as fs from 'fs';


//interface is the TS representation of an object

export interface IChirp {

    user: string;
    text: string;
}

interface IChirps {
    [key: number]: IChirp;
    nextid: number;
}

//const fs = require('fs');
let chirps: IChirps = { nextid: 0 };

if(fs.existsSync('chirps.json')) {
    
    //convert buffer to string (Luke's recc)
    chirps = JSON.parse(fs.readFileSync('chirps.json').toString());
   

}

let getChirps = () => {
    return Object.assign({}, chirps); //create a copy and return it
}

let getChirp = (id: number) => {
    return Object.assign({}, chirps[id]); //create a copy and return it
}


///expectation
/*
{user: 'Simon', text: 'lol'}
*/



let createChirp = (chirp: IChirp) => {
    chirps[chirps.nextid++] = chirp;
    writeChirps();
};

let updateChirp = (id: number, chirp: IChirp) => {
    chirps[id] = chirp;
    writeChirps();
}

let deleteChirp = (id: number) => {
    delete chirps[id];
    writeChirps();
}

let writeChirps = () => {
    fs.writeFileSync('chirps.json', JSON.stringify(chirps));
};


export default  {
    CreateChirp: createChirp,
    DeleteChirp: deleteChirp,
    GetChirps: getChirps,
    GetChirp: getChirp,
    UpdateChirp: updateChirp
}

