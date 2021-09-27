import * as React from 'react';
import { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import {IChirpStore} from './Home'


const Chirps = ()=> {

    const [chirps, setChirps] = useState<IChirps[]>([]);

    useEffect(() => {

        fetch('/api/chirps') //this is a get request!
            .then(res => res.json())
            .then(data => setChirps(data))            
            .catch(error => {
                console.log(error);
                alert("API SHIT HAPPENED");
            });

        }, [])


    return <h1 className="display-1">Chirps</h1>




}


interface IChirp {

    user: string;
    text: string;
}

// Export interface IChirps!

export interface IChirps {
    [key: number]: IChirp;
    nextid: string;
}


//export default Chirps; 