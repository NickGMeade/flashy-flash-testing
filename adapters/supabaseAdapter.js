import * as dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
dotenv.config({ path: 'variables.env' });

//TODO: to improve this code, you might consider working with models as well. A model is then a representation of a resource.
//TODO: write some generic select, update, delete code to improve the code. However, do not write your own framework ☺️

console.log('url', process.env.SUPABASE_URL);

// my supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

/**
 * Function to get the data for one card
 * 
 * @param {*} id the card id
 * @returns card data
 */
export async function getCardData(id) {
  console.log('👀 for id:', id);
  const { data, error } = await supabase.from('cards').select('*').eq('id', id);
  if (error) console.log('query error', error);
  else return data;
}

/**
 * function to read all the appointments
 * @returns an array of appointments
 */
export async function getCardsData() {
  const { data, error } = await supabase.from('cards').select('*');
  if (error) console.log('query error', error);
  else return data;
}

/**
 * Function to write a specific card
 * @param {*} card 
 * @returns 
 */
export async function setCardData(card) {
  // find the id
  const { data, error } = await supabase.from('cards').insert([
    {
      word: card.word,
      translation: card.translation,
    },
  ]);
  if (error) console.log('Error', error);
  else return data;
}

