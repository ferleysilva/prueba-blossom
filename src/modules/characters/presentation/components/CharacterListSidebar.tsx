import { MagnifyingGlassIcon, AdjustmentsVerticalIcon, ArrowsUpDownIcon } from '@heroicons/react/24/outline';
import { CharacterListItem } from '../components/CharacterListItem';
import type { Character } from '../../domain/entities/Character';



interface Props {
  characters: Character[];
  loading: boolean;
  error: string | null;
  filter: { name?: string };
  setFilter: (filter: { name?: string }) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
}

export const CharacterListSidebar: React.FC<Props> = ({
  characters,
  loading,
  error,
  filter,
  setFilter,
  favorites,
  onToggleFavorite,
}) => {
  const handleFilterChange = (key: 'name', value: string) => {
    setFilter({ ...filter, [key]: value || undefined });
  };

  const starredCharacters = characters.filter((c) => favorites.includes(c.id));
  const otherCharacters = characters.filter((c) => !favorites.includes(c.id));

  return (
    <aside className="w-full md:w-96 flex flex-col border-r border-gray-200 bg-white h-full">
        <div className="p-6 pb-2 shrink-0 z-10 bg-white">
            <h1 className="text-[24px] font-[700] text-gray-800 mb-6">Rick and Morty list</h1>
            
            <div className="relative mb-4">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                    type="text"
                    className="block w-full pl-10 pr-10 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all"
                    placeholder="Search or filter results"
                    value={filter.name || ''}
                    onChange={(e) => handleFilterChange('name', e.target.value)}
                />
                 <div className="absolute inset-y-0 right-0 pr-2 flex items-center gap-1">
                    <div className="p-1.5 text-gray-300">
                        <AdjustmentsVerticalIcon className="h-5 w-5" />
                    </div>
                    <div className="p-1.5 text-gray-300">
                        <ArrowsUpDownIcon className="h-5 w-5" />
                    </div>
                </div>
            </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 pb-6 custom-scrollbar">
            {loading ? (
                 <div className="flex justify-center items-center py-10">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                 </div>
            ) : error ? (
                <div className="text-center py-10 text-red-500 bg-red-50 rounded-lg p-4">
                    <p className="text-sm font-medium">Error loading characters</p>
                    <p className="text-xs mt-1 text-red-400">{error}</p>
                </div>
            ) : characters.length === 0 ? (
                 <div className="text-center py-10 text-gray-400">
                    <p>No characters found.</p>
                </div>
            ) : (
                <>
                    {starredCharacters.length > 0 && (
                        <div className="mb-6">
                            <h2 className="text-[12px] font-[600] text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                                STARRED CHARACTERS ({starredCharacters.length})
                            </h2>
                            {starredCharacters.map((character) => (
                                <CharacterListItem 
                                    key={`starred-${character.id}`} 
                                    character={character} 
                                    isFavorite={true}
                                    onToggleFavorite={() => onToggleFavorite(character.id)}
                                />
                            ))}
                        </div>
                    )}

                    <div>
                        <h2 className="text-[12px] font-[600] text-gray-500 uppercase tracking-wider mb-4">
                             CHARACTERS ({otherCharacters.length})
                        </h2>
                        {otherCharacters.map((character) => (
                            <CharacterListItem 
                                key={character.id} 
                                character={character} 
                                isFavorite={false}
                                onToggleFavorite={() => onToggleFavorite(character.id)}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    </aside>
  );
};
