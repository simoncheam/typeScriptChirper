//boiler plate router---

import * as express from 'express';

import chirpsRouter from './chirps'; //import from chirps.ts

const router = express.Router()

router.use('/chirps', chirpsRouter);

//boiler plate router---

export default router;