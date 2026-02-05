import { useLocalStorage } from '../../../../shared/hooks/useLocalStorage';

export const useCharacterLocalState = () => {
  const [favorites, setFavorites] = useLocalStorage<string[]>('character_favorites', []);

  const toggleFavorite = (characterId: string) => {
    if (favorites.includes(characterId)) {
      setFavorites(favorites.filter(id => id !== characterId));
    } else {
      setFavorites([...favorites, characterId]);
    }
  };

  const isFavorite = (characterId: string) => {
    return favorites.includes(characterId);
  };

  return {
    favorites,
    isFavorite,
    toggleFavorite,
  };
};
