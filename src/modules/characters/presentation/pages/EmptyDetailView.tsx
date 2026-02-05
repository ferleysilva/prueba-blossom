import { UserGroupIcon } from '@heroicons/react/24/outline';

export const EmptyDetailView = () => {
    return (
        <div className="flex flex-col items-center justify-center w-full h-full text-gray-400 p-8 text-center animate-in fade-in duration-500">
             <div className="bg-gray-50 p-6 rounded-full mb-6">
                <UserGroupIcon className="w-16 h-16 text-gray-300" />
             </div>
             <h2 className="text-xl font-semibold text-gray-500 mb-2">Select a character</h2>
             <p className="max-w-xs text-sm">Choose a character from the list to view their details, favorites status, and comments.</p>
        </div>
    );
}
