import React from 'react';
import type { Character } from '../../domain/entities/Character';

interface Props {
  character: Character;
}

export const CharacterCard: React.FC<Props> = ({ character }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
      <img src={character.image} alt={character.name} className="w-full h-64 object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800 truncate">{character.name}</h2>
        <div className="flex justify-between items-center mt-2">
            <span className="text-gray-600 text-sm">{character.species}</span>
            <span className="text-gray-500 text-sm">{character.gender}</span>
        </div>
        <div className={`mt-3 inline-block px-3 py-1 text-xs font-semibold rounded-full ${
            character.status === 'Alive' ? 'bg-green-100 text-green-800' : 
            character.status === 'Dead' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
        }`}>
            {character.status}
        </div>
      </div>
    </div>
  );
};
