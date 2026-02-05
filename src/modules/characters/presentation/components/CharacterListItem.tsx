import type { Character } from '../../domain/entities/Character';

interface Props {
  character: Character;
  isFavorite?: boolean;
}

export const CharacterListItem: React.FC<Props> = ({ character, isFavorite = false }) => {
  return (
    <div className="flex items-center p-4 bg-white rounded-lg mb-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer border-t border-gray-100">
      <img 
        src={character.image} 
        alt={character.name} 
        className="w-12 h-12 rounded-full object-cover mr-4"
      />
      <div className="flex-1 min-w-0">
        <h3 className="text-base font-bold text-gray-900 truncate">{character.name}</h3>
        <p className="text-sm text-gray-500 truncate">{character.species}</p>
      </div>
      <div className="ml-2">
           <button className={`p-2 rounded-full ${isFavorite ? 'text-green-500 bg-green-50' : 'text-gray-300 hover:text-gray-400'}`}>
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                 <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
               </svg>
           </button>
      </div>
    </div>
  );
};
