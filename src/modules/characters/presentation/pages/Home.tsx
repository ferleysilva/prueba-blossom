import { MagnifyingGlassIcon, AdjustmentsVerticalIcon } from '@heroicons/react/24/outline';
import { useCharacters } from '../hooks/useCharacters';
import { CharacterListItem } from '../components/CharacterListItem';

export const Home = () => {
  const { characters, loading, error } = useCharacters();

  // Mocked starred characters for now
  const starredCharacters = characters.slice(0, 2);
  const otherCharacters = characters.slice(2);

  return (
    <div className="flex h-full bg-gray-50">
      {/* Sidebar List - Full width on mobile, fixed width on desktop */}
      <aside className="w-full md:w-96 flex flex-col border-r border-gray-200 bg-gray-50 h-full">
        <div className="p-6 pb-2">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Rick and Morty list</h1>
            
            <div className="relative mb-6">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                    type="text"
                    className="block w-full pl-10 pr-10 py-3 bg-gray-200 border-none rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Search or filter results"
                />
                 <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer">
                    <button className="p-1 rounded-md bg-transparent shadow-sm hover:bg-transparent">
                        <AdjustmentsVerticalIcon className="h-5 w-5 text-blue-600" aria-hidden="true" />
                    </button>
                </div>
            </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 custom-scrollbar">
            {loading ? (
                 <div className="flex justify-center items-center py-10">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                 </div>
            ) : error ? (
                <div className="text-center py-10 text-red-500">
                    <p>Error: {error}</p>
                </div>
            ) : (
                <>
                    <div className="mb-6">
                        <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">STARRED CHARACTERS ({starredCharacters.length})</h2>
                        {starredCharacters.map((character) => (
                            <CharacterListItem key={`starred-${character.id}`} character={character} isFavorite={true} />
                        ))}
                    </div>

                    <div>
                        <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">CHARACTERS ({otherCharacters.length})</h2>
                        {otherCharacters.map((character) => (
                            <CharacterListItem key={character.id} character={character} />
                        ))}
                    </div>
                </>
            )}
        </div>
      </aside>

      {/* Detail Area - Hidden on mobile, visible on desktop */}
      <main className="hidden md:flex flex-1 bg-white h-full items-center justify-center text-gray-400">
            <p>Select a character to view details</p>
      </main>
    </div>
  );
};
