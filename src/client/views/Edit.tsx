import * as React from 'react';
import {IChirpStore} from './Home'
import {IChirp} from './Home';
import { useState, useEffect} from 'react';
import {useParams, useHistory} from 'react-router-dom';


const Edit = () => {

    const [user, setUser] = useState<string>("Loading...");
    const [text, setText] = useState<string>("Loading...");

    const hist = useHistory();
    
    const {id} = useParams<{ id: string}>();  //this gets ID

     //Form user name set state function
     const handleNameUpdate = (eUpdate: React.ChangeEvent<HTMLInputElement>) => {

        setUser(eUpdate.target.value)
    };

    //button function 
    const handleUpdate = (newUser: React.MouseEvent<HTMLButtonElement>) => {
        newUser.preventDefault();

        if(!user || !text) return alert('fill out the god damn fields!');

        console.log('handle update function!');
        /// fetch to PUT content
        fetch(`/api/chirps/${id}`,{
            method: "PUT",
            headers: {
                "Content-Type": "application/json" // incoming JSON data
            },
            body: JSON.stringify({user, text}) // possible error here? this worked in pokemon example
            
           

        })
        .then(res => res.json())
        .then(data=>{ // try? (data: IChirpStore); original = just data
        hist.push(`/chirps/${id}`)
        console.log(data);
        //console.log(data.id);
        
    })
    .catch(e=>console.log(e))

    };

    const handleDelete = (eDel: React.MouseEvent<HTMLButtonElement>)=> {
        eDel.preventDefault();

        if(confirm('Are you sure you want to delete?')){

            alert('you clicked delete!')
        }

        fetch(`/api/chirps/${id}`, {
            method: "DELETE",
        })
        .then(res => res.json())
        .then(res => hist.push(`/`))
        .catch(e=>console.log(e))

    }

    useEffect(()=>{
        fetch(`/api/chirps/${id}`)
            .then(res =>res.json()) //response is parsed to JSON
            .then(data =>{
                setUser(data.user)
                setText(data.text)
                console.log(user);
                console.log(text);
            })
            .catch(e=>console.log(e))
    },[])

    return(

        <div className="row justify-content-center mt-5">
            <form className="form-group">

                <label > Username </label>
                <input value = {user} onChange={handleNameUpdate} type="text" className="form-control"/>

                <label > Chirp: </label>
                <input value ={text} onChange={(eUpdate: React.ChangeEvent<HTMLInputElement>)=>{setText(eUpdate.target.value)}} type="text" className="form-control"/>

            <div onClick={()=>hist.goBack()} className="btn btn-primary m-2">Go Back</div>
            <button onClick={handleUpdate} className="btn btn-warning m-2">Save Edit!
            </button>

            <button onClick={handleDelete} className="btn btn-danger m-2">Delete!
            </button>

            </form>
        </div>




    )

};

export default Edit; 