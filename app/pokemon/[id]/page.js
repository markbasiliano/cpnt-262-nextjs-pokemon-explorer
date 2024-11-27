'use client';

import { useEffect, useState } from 'react';

export default function PokemonPage({ params }) {
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState(false);
  const { id } = params; // Destructure the id directly from params

  // Declare function to fetch Pokémon data
  async function fetchPokemon() {
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`); // Correct URL with dynamic id
      if (!res.ok) {
        throw new Error('Pokémon not found!');
      }
      const data = await res.json();
      setPokemon(data); // Set the fetched Pokémon data
    } catch (err) {
      setError(true); // Set error state if there's an issue
    }
  }

  useEffect(() => {
    if (id) {
      fetchPokemon(); // Fetch the Pokémon data when the id is available
    }
  }, [id]); // Re-run effect when id changes

  if (error) {
    return <p className="text-center text-lg text-red-500">Pokémon not found.</p>;
  }
  
  if (!pokemon) {
    return <p className="text-center text-lg text-yellow-500">Loading...</p>;
  }

  return (
    <div className="text-center">
      <h1 className="text-3xl text-yellow-500 font-bold mb-4">{pokemon.name}</h1>
      {/* Correct the image path to use sprites.front_default */}
      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        className="mx-auto rounded-full border-4 border-yellow-500 mb-4"
      />
      <p className="text-lg">Height: {pokemon.height}</p>
      <p className="text-lg">Weight: {pokemon.weight}</p>
    </div>
  );
}
