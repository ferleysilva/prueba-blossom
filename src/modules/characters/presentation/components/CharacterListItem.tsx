import { useNavigate } from 'react-router-dom';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { HeartIcon as HeartIconOutline } from '@heroicons/react/24/outline';
import type { Character } from '../../domain/entities/Character';

interface Props {
  character: Character;
  isFavorite?: boolean;
  onToggleFavorite?: (e: React.MouseEvent) => void;
  isSelected?: boolean;
}

export const CharacterListItem: React.FC<Props> = ({ character, isFavorite = false, onToggleFavorite, isSelected = false }) => {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate(`/character/${character.id}`)}
      className={`flex items-center p-4 rounded-lg mb-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer border-t border-gray-100 ${isSelected ? 'bg-[#EEE3FF]' : 'bg-white'}`}
    >
      <img 
        src={character.image} 
        alt={character.name} 
        className="w-[32px] h-[32px] rounded-full object-cover mr-4"
      />
      <div className="flex-1 min-w-0">
        <h3 className="text-[16px] font-[600] text-gray-900 truncate">{character.name}</h3>
        <p className="text-[16px] font-[400] text-gray-500 truncate">{character.species}</p>
      </div>
      <div className="ml-2">
           <button 
             className="p-2 rounded-full hover:bg-gray-100 transition-colors"
             onClick={(e) => {
               e.stopPropagation();
               onToggleFavorite && onToggleFavorite(e);
             }}
           >
               {isFavorite ? (
                   <HeartIconSolid className="w-[18px] h-[18px] text-green-500" />
               ) : (
                   <HeartIconOutline className="w-[18px] h-[18px] text-gray-400 hover:text-green-500" />
               )}
           </button>
      </div>
    </div>
  );
};
