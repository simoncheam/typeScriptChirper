import * as React from 'react';
//import { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route} from "react-router-dom";
import Home from './views/Home';
import Navbar from "./components/Navbar";
import NotFound from './views/NotFound';
//import Chirps from './views/Chirps';
//import { v4 as uuidv4} from "uuid";
import Create from './views/Create';
import SingleChirp from './views/SingleChirp';
import Edit from './views/Edit';


const App = () => {
	
	return (
		
		<BrowserRouter>
			<Navbar/>

				<div className="container">
					<Switch>

						<Route exact path = "/">
							<Home/>

						</Route>

						<Route exact path = "/create">
							<Create/>
						</Route>

						{/* <Route exact path = "/chirps">
							<Chirps/>

						</Route> */}

						<Route exact path = "/chirps/:id">
							<SingleChirp/>
							
							
							

						</Route>

						<Route exact path = "/chirps/:id/edit">
							<Edit/>
							

						</Route>

						<Route  path = "*">
							<NotFound/>
							

						</Route>


					</Switch>

				</div>

		</BrowserRouter>


	);
};




// interface IChirp {

//     user: string;
//     text: string;
// }

// interface IChirps {
//     [key: number]: IChirp;
//     nextid: string;
// }


export default App;
