import { HeartIcon, PaperAirplaneIcon } from '@heroicons/react/24/solid';
import { HeartIcon as HeartOutline, ArrowLeftIcon } from '@heroicons/react/24/outline';
import type { Character } from '../../domain/entities/Character';

import { useNavigate } from 'react-router-dom';

import { useState } from 'react';
import type { Comment } from '../hooks/useCharacterLocalState';

interface Props {
  character: Character;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  comments: Comment[];
  onAddComment: (text: string) => void;
}

export const CharacterDetail: React.FC<Props> = ({
  character,
  isFavorite,
  onToggleFavorite,
  comments,
  onAddComment,
}) => {
  const navigate = useNavigate();
  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    if (newComment.trim()) {
      onAddComment(newComment);
      setNewComment('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddComment();
    }
  };



  return (
    <div className="bg-white w-full h-full flex flex-col overflow-hidden animate-in fade-in duration-300">
      <div className="md:hidden p-4 border-b border-gray-100 flex items-center">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-gray-600 hover:text-gray-900">
            <ArrowLeftIcon className="h-6 w-6" />
        </button>
        <span className="ml-2 font-bold text-gray-900">{character.name}</span>
      </div>

      <div className="flex-1 overflow-y-auto p-6 md:p-12 custom-scrollbar">
        <div className="w-full">
            <div className="flex flex-col items-start text-left w-full h-full"> 
                <div className="relative mb-6">
                    <img 
                        src={character.image} 
                        alt={character.name} 
                        className="w-[75px] h-[75px] rounded-full object-cover border-4 border-white shadow-lg"
                    />
                    <button 
                        onClick={onToggleFavorite}
                        className="absolute bottom-0 right-0 p-1 bg-white rounded-full shadow-md hover:scale-110 transition-transform"
                    >
                        {isFavorite ? (
                            <HeartIcon className="w-[18px] h-[18px] text-green-500" />
                        ) : (
                            <HeartOutline className="w-[18px] h-[18px] text-gray-400 hover:text-green-500" />
                        )}
                    </button>
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-8">{character.name}</h1>

                <div className="w-full space-y-6">
                    <div className="flex flex-col items-start w-full">
                        <span className="text-base font-semibold leading-6 text-gray-900 capitalize mb-1">Specie</span>
                        <span className="text-base font-medium leading-6 text-gray-500 capitalize">{character.species}</span>
                    </div>
                    
                    <div className="w-full h-px bg-gray-200"></div>

                    <div className="flex flex-col items-start w-full">
                         <span className="text-base font-semibold leading-6 text-gray-900 capitalize mb-1">Status</span>
                         <span className="text-base font-medium leading-6 text-gray-500 capitalize">{character.status}</span>
                    </div>

                    <div className="w-full h-px bg-gray-200"></div>

                    <div className="flex flex-col items-start w-full">
                         <span className="text-base font-semibold leading-6 text-gray-900 capitalize mb-1">Gender</span>
                         <span className="text-base font-medium leading-6 text-gray-500 capitalize">{character.gender}</span>
                    </div>
                </div>
            </div>
            <div className="mt-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Comments</h2>
                
                <div className="bg-gray-50 rounded-2xl p-6 mb-8">
                     <div className="relative">
                        <input
                            type="text"
                            placeholder="Add a comment..."
                            className="w-full pl-6 pr-14 py-4 bg-white rounded-xl border-none shadow-sm text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        <button 
                            onClick={handleAddComment}
                            disabled={!newComment.trim()}
                            className={`absolute right-2 top-2 bottom-2 aspect-square rounded-lg flex items-center justify-center transition-colors ${
                                newComment.trim() 
                                    ? 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer' 
                                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            }`}
                        >
                            <PaperAirplaneIcon className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div className="space-y-4">
                    {comments.length === 0 ? (
                        <p className="text-center text-gray-400 py-8 italic">No comments yet. Be the first to share your thoughts!</p>
                    ) : (
                        comments.map((comment) => (
                            <div key={comment.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                                <p className="text-gray-800 text-base mb-2">{comment.text}</p>
                                <p className="text-xs text-gray-400">
                                    {new Date(comment.createdAt).toLocaleString()}
                                </p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};
