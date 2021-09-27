//this page displays single chirp by ID
import * as React from "react";
import { useState, useEffect } from "react";
import {useParams, useHistory, Link } from "react-router-dom";
import {IChirp} from './Home';
import {IChirpStore} from './Home'



const SingleChirp = () => {


    const chirpID = useParams<{ id: string}>();
    console.log(`id from params is: ${chirpID.id}`);
    let ID = chirpID.id; //define ID var

    const hist = useHistory();
    const [chirp, setChirp] = useState<IChirp>();

    useEffect(()=>{  

        fetch(`/api/chirps/${ID}`)  // Better naming convention for params sub-property?
        .then(res => res.json())
        .then((data: IChirp)=> {  

                // set vars
                let id = Number(ID)
                let user = data.user;
                let text = data.text;
                
                // define temp IChirp object
                const tempIChirp = {
                    id,
                    user,
                    text
                };

                console.log('tempIChirp: ');
                console.log(tempIChirp);
            
                setChirp(tempIChirp); // set state chirp
                // console.log('After setChirp...chirp:');
                // console.log(chirp);
               
           
                
            })
            .catch(e => console.log(e));
            //alert("WTF API SHIT HAPPENED - SINGLE CHIRP");
            
        },[])
        
        // Notes from TF: React does stable batch updating
        
        if(!chirp){  //this needs to be outside useeffect
            return(

                <h1>Loading chirp...</h1>
                )
        }
        
    return ( // Need to update this section - Single Chirp Display works
        <div>

            <div className="container">
                <div className="row justify-content-md-center">

            
                    <div className="card col-12 col-md-6 m-3 shadow-lg">
                        <div className="card-header mt-2">
                            @{chirp.user}
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">"{chirp.text}"</h5>
                            
                            {/* go home btn */}
                            <Link to={`/`} key={chirp.id} 
                            className="btn btn-primary m-2 shadow "> Return to Chirps                
                            </Link>


                            {/* admin btn */}
                            <Link to={`/chirps/${chirp.id}/edit`} key={chirp.id} 
                            className="btn btn-primary m-2 shadow "> Admin Options                
                            </Link>

                
                        </div>
                
                    </div>
                </div>
                    
            </div>

        </div>

    );

};



export default SingleChirp;