import { useLocalStorage } from '../../../../shared/hooks/useLocalStorage';

export interface Comment {
  id: string;
  text: string;
  createdAt: string;
}

export const useCharacterLocalState = () => {
  const [favorites, setFavorites] = useLocalStorage<string[]>('character_favorites', []);
  const [comments, setComments] = useLocalStorage<Record<string, Comment[]>>('character_comments', {});
  const [deletedCharacters, setDeletedCharacters] = useLocalStorage<string[]>('character_deleted', []);

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

  const addComment = (characterId: string, text: string) => {
    const newComment: Comment = {
      id: crypto.randomUUID(),
      text,
      createdAt: new Date().toISOString(),
    };
    
    setComments({
      ...comments,
      [characterId]: [newComment, ...(comments[characterId] || [])]
    });
  };

  const getComments = (characterId: string) => {
    return comments[characterId] || [];
  };

  const deleteCharacter = (characterId: string) => {
    if (!deletedCharacters.includes(characterId)) {
      setDeletedCharacters([...deletedCharacters, characterId]);
    }
  };

  const isDeleted = (characterId: string) => {
    return deletedCharacters.includes(characterId);
  };

  return {
    favorites,
    isFavorite,
    toggleFavorite,
    comments,
    addComment,
    getComments,
    deletedCharacters,
    deleteCharacter,
    isDeleted
  };
};
