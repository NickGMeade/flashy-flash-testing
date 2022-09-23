import express from 'express';
import cors from 'cors'; 
const router = express.Router();
import {
  getCard,
  setCard,
  getCards,
} from '../controllers/cardController.js';

// root level route, this one is optional
router.get('/', cors(), (req, res, next) => {
  res.json('Welcome to your local veterinarian 🐶');
});

/**
 * all cards routes
 */
router.options('/cards', (req, res, next) => {
  //set header before response
  res.header({
    allow: 'GET, POST, OPTIONS',
    'Content-type': 'application/json',
    Data: Date.now(),
    'Content-length': 0,
  });
  //response
  res.sendStatus(200);
});

// get a collection of all the cards and ou can use a query
router.get('/cards', cors(), getCards);

// get an individual appointment
router.get('/cards/:id', cors(), getCard);

// post a route using the middleware for reading the body
router.post('/cards', cors(), setCard);

// // delete an individual appointment
// // TODO: not implemented yet
// router.delete('/cards/:id', cors(), (req, res, next) => {
//   const card = req.params.card;
//   res.json({
//     title: 'deleted',
//     message: `oops ${card} was deleted accidentally 🥺`,
//   });
// });

export default router;
