import { Outlet, useLocation } from 'react-router-dom';
import { useCharacters } from '../hooks/useCharacters';
import { useCharacterLocalState } from '../hooks/useCharacterLocalState';
import { CharacterListSidebar } from '../components/CharacterListSidebar';

export const CharactersPage = () => {
  const { 
    characters, 
    loading, 
    error, 
    filter, 
    setFilter,
    sortOrder,
    setSortOrder 
  } = useCharacters();

  const {
      favorites,
      toggleFavorite,
  } = useCharacterLocalState();

  const location = useLocation();
  const isDetailPage = location.pathname.startsWith('/character/');

  
  return (
    <div className="flex h-screen bg-white overflow-hidden">
      <div className={`
          w-full md:w-96 flex-col border-r border-gray-200 bg-white h-full
          ${isDetailPage ? 'hidden md:flex' : 'flex'}
      `}>
          <CharacterListSidebar 
            characters={characters}
            loading={loading}
            error={error}
            filter={filter}
            setFilter={setFilter}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
          />
      </div>

      <main className={`
          flex-1 bg-white h-full overflow-hidden
          ${!isDetailPage ? 'hidden md:flex' : 'flex'}
      `}>
          <Outlet />
      </main>
    </div>
  );
};
