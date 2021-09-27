import * as React from 'react';
import { useState} from 'react';
import {useParams, useHistory} from 'react-router-dom'; //this is the use history hook to push users
import {IChirpStore} from './Home'


const Create = () => {

    const [user, setUser] = useState<string>("");
    const [text, setText] = useState<string>("");

    const hist = useHistory();
    const id = useParams<{ id: string}>();  //this gets ID

    //Form user name set state function
    const handleNameUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {

        setUser(e.target.value)
    };

    //create handle submit fnc

    const handleSubmit = (newUser: React.MouseEvent<HTMLButtonElement>) => {
        newUser.preventDefault();

        if(!user || !text) return alert('fill out the god damn fields!');


        // fetch to POST content
        fetch('api/chirps',{
            method: "POST",
            headers: {
                "Content-Type": "application/json" // incoming JSON data
            },
            body: JSON.stringify({user, text})
           

        })
        .then(res => res.json())
        .then((data: IChirpStore)=>{
        hist.push(`/`)
        console.log('POST FIRED!');
        
    })
    .catch(these_hands => console.log(these_hands))


    };



    return(

        <div className="row justify-content-center mt-5">

            <form className="form-group">

                <label > Username: </label>
                    <input value= {user} onChange={handleNameUpdate} type="text" className="form-control" placeholder="Your Name"/>
                
                <label > Your Chirp: </label> 
                    <input value= {text} 
                    onChange={(chirpChange: React.ChangeEvent<HTMLInputElement>)=>{  // in line onchange event
                        setText(chirpChange.target.value)}} type="text" className="form-control" placeholder="What's on your mind?"/>

                    <div onClick={()=>hist.goBack()} className="btn btn-primary m-2">Go Back</div>
                    <button onClick={handleSubmit} className="btn btn-primary m-2 shadow ">Click to Chirp!</button>
            </form>


        </div>



        /// create form [ ]
    )



};

export default Create;