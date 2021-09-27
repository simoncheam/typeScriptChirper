// Chirper app should show a list of all chirps on the home screen

import * as React from 'react';
import { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import { v4 as uuidv4} from "uuid";

const Home = ()=>{

//create/set state
const [chirps, setChirps] = useState<IChirp[]>([]);

    useEffect(() => {
        fetch('/api/chirps') //this is a get request!
            .then(res => res.json())
            .then((data: IChirpStore)=> {

               // const {user, text} = data; //destructuring? 
                

                const temp_array: IChirp[] = [];
                //const tempKeysObject = Object.keys(data);
                //console.log(`keys:  ${tempKeysObject}`);
                
                // console.log(temp_array);
                
                //// ---------------- !!!!!!!!
                // Do data processing with your for-in loop to push entries to that temporary array WITH their IDs included
                
                
                
                for (const id in data){
                    
                    let ID = Number(id);
                    let user = data[id].user;
                    let text = data[id].text;
                    
                    const tempIChirp = {
                        id: ID,   //should we use uuid?
                        user: user,
                        text: text
                    };
                    

                    if (id === 'nextid') {
                       // console.log('end of loop..here is temp array:');
                        console.log(temp_array);
                        setChirps(temp_array);

                        return;
                    }
                  
                    
                 //need to push objects into temp array with ID  
                 temp_array.push(tempIChirp) 
                };
                

                if(!chirps.length){
                    <h1>Loading chirpzzz</h1>
                }
            })            
            .catch(error => {
                console.log(error);
                alert("API SHIT HAPPENED");
            });


    }, []);
               



    
            return ( 

                
                <div className="row justify-content-center">

                <h1 className="display-3 m-3">👋 Welcome to TypeScript Chirper!🐦 </h1>

                    {chirps.map(chirp => (

                        <div key={chirp.id} className="container">
                            <div className="row justify-content-md-center">

                        
                                <div className="card col-12 col-md-6 m-3 shadow-lg">
                                    <div className="card-header mt-2">
                                        @{chirp.user}
                                    </div>
                                    <div className="card-body">
                                        <h5 className="card-title">"{chirp.text}"</h5>
                                        {/* <p className="card-text" >id:{chirp.id}</p> */}

                                        <Link to={`/chirps/${chirp.id}/edit`}  
                                        className="btn btn-primary m-2 shadow "> Admin Options                
                                        </Link>
                            
                                    </div>
                            
                                </div>
                            </div>
                    
                        </div>
                    ))}
                </div>
            );
}

export interface IChirp {
    id: number;
    user: string;
    text: string;
}

export interface IChirpStore {
    [key: number]: {
        user: string;
        text: string;
    };
    nextid: number;
}


// interface IChirpStore {
//     [key: number]: IChirp;
//     nextid: number;
// }





export default Home;