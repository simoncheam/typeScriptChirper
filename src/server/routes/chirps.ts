//boiler plate router--- Routing endpoint file whgere request comes to get response

// 9/22 actions: add put, delete request + logic for each route


import * as express from 'express';
import {v4 as uuidv4} from "uuid";
const moment = require('moment');
import ChirpStore from '../services/chirps-service';


const router = express.Router()

// -- GET ALL [ XXX ]

router.get('/', (req,res) => {

    try {
        const allChirps = ChirpStore.GetChirps();
        res.json(allChirps)
        
    } catch (error) {
        res.status(500).json({message: "An error ocurred reading the data.", error})
        
    }

    //res.json('test get all chirps')

});

// -- GET ONE CHIRP BY ID

router.get('/:id', (req,res) => {

    
    try {
        
        const id = Number(req.params.id);
        const singleChirp = ChirpStore.GetChirp(id);
        console.log('GET SINGLE CHIRP'); //this works
        console.log(`ID is: ${id}`);
        res.json(singleChirp)

        
    } catch (error) {
        res.status(500).json({message: "An error ocurred reading the data.", error})

    }

})


// -- POST

router.post('/', async(req,res) => {
    
    res.json('post works!')
    
    try {

        const {user, text} = req.body;
        if (!user || !text){
        return res.status(400).json({message: "Send all data!"})
        }

        const newChirp= req.body;
        //const id = uuidv4();

        const chirpTime = {
            ...newChirp,
            createdAt: moment(Date.now()).calendar()  // injected extra prop
            
        }

        await ChirpStore.CreateChirp(chirpTime)
        res.status(201).json({message: "Chirp created successfully" })   //Respond with ID?
        
    } catch (error) {
        res.status(500).json({message: "An error occurred creating the data.", error})
        
    }

});






// -- UPDATE [ X ]

router.put('/:id', async(req,res)=>{  

    //res.json('PUT route works in postman!')
    
    try {
        
        const {user, text} = req.body;
        
        //Input validation
        if (!user || !text){
            return res.status(400).json({message: "Send all data!"})
        }
        
        //const editedChip = req.body;
        const chirp = {            ///possible mistake here?
            user, 
            text
        }
        
        let id = Number(req.params.id);
        
        await ChirpStore.UpdateChirp(id, chirp ) 
        res.status(201).json({message: "chirp updated successfully", id })
        
    } catch (error) {
        res.status(500).json({message: "An error ocurred creating the data.", error})
        
    }

})

// -- DELETE

router.delete('/:id', async(req,res) => {

    //res.json('delete works!')

    try {
        const id = Number(req.params.id); 
        await ChirpStore.DeleteChirp(id)
        res.status(200).json({message: "Chirp deleted successfully" })
        
    } catch (error) {

        res.status(500).json({message: "An error ocurred reading the data.", error})

        
    }



});






//boiler plate router---

export default router;