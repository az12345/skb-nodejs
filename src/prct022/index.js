/** ****************************************************
 * Урок 2: Hello JS World
 * Практическая задача 2: Самый “толстый” покемон
 ******************************************************/

import express from 'express';
import fetch from 'isomorphic-fetch';
import Promise from 'bluebird';
import _ from 'lodash';

const __DEV__ = true;
const baseUrl = 'https://pokeapi.co/api/v2';
const pokemonFields = ['id', 'name', 'base_experience', 'height', 'is_default', 'order', 'weight'];
const app = express();

/** ****************************************************
 * getPokemons(url, i)
 * @param url - Pokemons list url
 * @param i - page number
 ******************************************************/
async function getPokemons(url, i = 0) {
  // console.log('getPokemons ', url, i);

  const response = await fetch(url);
  const page = await response.json();
  const pokemons = page.results;

  if (__DEV__ && i > 1) {
    return pokemons;
  }

  if (page.next) {
    const pokemonsNextPage = await getPokemons(page.next, i + 1);
    return [
      ...pokemons,
      ...pokemonsNextPage,
    ];
  }

  return pokemons;
}

/** ****************************************************
 * getPokemon(url)
 * @param url - Pokemon's Profile url
 ******************************************************/
async function getPokemon(url) {
  console.log('getPokemon', url);

  const response = await fetch(url);
  const pokemon = await response.json();
  return pokemon;
}

/** ****************************************************
 * Route - /
 ******************************************************/
app.get('/prct022', async (req, res) => {
  try {
    const pokemonsUrl = `${baseUrl}/pokemon`;
    const pokemonsInfo = await getPokemons(pokemonsUrl);
    const pokemonsPromises = pokemonsInfo.map((info) => {
      return getPokemon(info.url);
    });

    // Разрешаем все промисы
    const pokemonsFull = await Promise.all(pokemonsPromises);
    const pokemons = pokemonsFull.map((pokemon) => {
      return _.pick(pokemon, pokemonFields);
    });

    // Сортируем покемонов по возрастанию веса
    const sortPokemons = _.sortBy(pokemons, pokemon => pokemon.weight);
    return res.json(sortPokemons);
  } catch (err) {
    console.log(err);
    return res.json({ err });
  }
});

/** ****************************************************
 * Express Listener
 ******************************************************/
app.listen(3000, () => {
  console.log('Pract-02-2 READY on 3000');
});
