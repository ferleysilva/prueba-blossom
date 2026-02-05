import { useParams } from 'react-router-dom';
import { useCharacter } from '../hooks/useCharacter';
import { useCharacterLocalState } from '../hooks/useCharacterLocalState';
import { CharacterDetail } from '../components/CharacterDetail';

export const CharacterDetailView = () => {
  const { id } = useParams<{ id: string }>();
  const { character, loading, error } = useCharacter(id);
  const { isFavorite, toggleFavorite } = useCharacterLocalState();

  if (loading) {
    return (
        <div className="flex justify-center items-center w-full h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
    );
  }

  if (error || !character) {
    return (
        <div className="flex flex-col justify-center items-center w-full h-full text-center p-8">
            <p className="text-xl text-gray-500 mb-2">Character not found</p>
             <p className="text-sm text-gray-400">{error || "Select a character from the list"}</p>
        </div>
    );
  }

  return (
    <CharacterDetail 
        character={character}
        isFavorite={isFavorite(character.id)}
        onToggleFavorite={() => toggleFavorite(character.id)}
    />
  );
};
