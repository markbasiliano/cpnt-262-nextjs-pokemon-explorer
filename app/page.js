'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPokemon() {
      try {
        const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10'); // Correct API URL
        if (!res.ok) {
          throw new Error('Failed to fetch Pokémon data');
        }
        const data = await res.json();
        setPokemonList(data.results);
      } catch (err) {
        setError(err.message); // Set error message on failure
      } finally {
        setLoading(false); // Ensure loading is false even if there's an error
      }
    }

    fetchPokemon();
  }, []); // Empty dependency array ensures the effect runs only once on mount

  if (loading) return <p className="text-center text-lg text-accent">Loading...</p>;

  if (error) {
    return <p className="text-center text-lg text-red-500">{`Error: ${error}`}</p>; // Show error if failed to fetch
  }

  return (
    <div>
      <h1 className="text-3xl text-accent font-bold text-center mb-4">Pokémon Explorer</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pokemonList.map((pokemon, index) => (
          <li key={index} className="bg-gray-900 p-4 rounded-lg shadow-lg text-center transform transition hover:scale-105 hover:shadow-accent">
            {/* Fixed route to go to a dynamic Pokémon page using the ID */}
            <Link href={`/pokemon/${index + 1}`} className="text-accent font-bold text-xl">{pokemon.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
