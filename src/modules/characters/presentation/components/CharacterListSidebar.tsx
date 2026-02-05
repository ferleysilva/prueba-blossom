import { useState, useEffect } from "react";
import {
  MagnifyingGlassIcon,
  AdjustmentsVerticalIcon,
  ArrowsUpDownIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import { CharacterListItem } from "../components/CharacterListItem";
import type { Character } from "../../domain/entities/Character";
import type { SortOrder } from "../hooks/useCharacters";

interface Props {
  characters: Character[];
  loading: boolean;
  error: string | null;
  filter: { name?: string; species?: string };
  setFilter: (filter: { name?: string; species?: string }) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  sortOrder: SortOrder;
  setSortOrder: (order: SortOrder) => void;
}

export const CharacterListSidebar: React.FC<Props> = ({
  characters,
  loading,
  error,
  filter,
  setFilter,
  favorites,
  onToggleFavorite,
  sortOrder,
  setSortOrder,
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeView, setActiveView] = useState<"All" | "Starred" | "Others">(
    "All",
  );

  const [localSpecies, setLocalSpecies] = useState<string | undefined>(
    filter.species,
  );
  const [localView, setLocalView] = useState<"All" | "Starred" | "Others">(
    "All",
  );

  useEffect(() => {
    if (isFilterOpen) {
      setLocalSpecies(filter.species);
      setLocalView(activeView);
    }
  }, [isFilterOpen, filter.species, activeView]);

  const handleFilterChange = (key: "name", value: string) => {
    setFilter({ ...filter, [key]: value || undefined });
  };

  const handleApplyFilter = () => {
    setFilter({ ...filter, species: localSpecies });
    setActiveView(localView);
    setIsFilterOpen(false);
  };

  const hasReviewableFilters =
    localView !== "All" || localSpecies !== undefined;
  const hasChanges =
    localView !== activeView || localSpecies !== filter.species;

  const displayedCharacters =
    activeView === "All"
      ? characters
      : activeView === "Starred"
        ? characters.filter((c) => favorites.includes(c.id))
        : characters.filter((c) => !favorites.includes(c.id));

  const displayedStarred = displayedCharacters.filter((c) =>
    favorites.includes(c.id),
  );
  const displayedOthers = displayedCharacters.filter(
    (c) => !favorites.includes(c.id),
  );

  return (
    <aside className="w-full md:w-96 flex flex-col border-r border-gray-200 bg-white h-full relative">
      <div className="p-6 pb-2 shrink-0 z-20 bg-white shadow-sm relative mb-4">
        <h1
          className={`text-[24px] font-[700] text-gray-800 mb-6 ${isFilterOpen ? "hidden md:block" : ""}`}
        >
          Rick and Morty list
        </h1>

        <div
          className={`relative mb-4 ${isFilterOpen ? "hidden md:block" : ""}`}
        >
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-10 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all"
            placeholder="Search or filter results"
            value={filter.name || ""}
            onChange={(e) => handleFilterChange("name", e.target.value)}
          />
          <div className="absolute inset-y-0 right-0 pr-2 flex items-center gap-1">
            <div className="p-1.5 text-gray-300">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className={`p-1 rounded-md transition-colors ${isFilterOpen || hasReviewableFilters ? "text-[#8054C7] bg-[#EEE3FF]" : "hover:bg-gray-100"}`}
              >
                <AdjustmentsVerticalIcon className="h-5 w-5" />
              </button>
            </div>
            <div className="p-1.5 text-gray-300">
              <button
                onClick={() => {
                  const nextSort =
                    sortOrder === null
                      ? "asc"
                      : sortOrder === "asc"
                        ? "desc"
                        : null;
                  setSortOrder(nextSort);
                }}
                className={`p-1 rounded-md transition-colors ${sortOrder ? "text-blue-600 bg-blue-50" : "hover:bg-gray-100"}`}
              >
                <ArrowsUpDownIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {isFilterOpen && (
          <div className="fixed inset-0 z-50 flex flex-col gap-6 bg-white p-5 w-full h-full overflow-y-auto md:absolute md:inset-auto md:top-full md:left-6 md:w-[calc(100%-3rem)] md:h-auto md:rounded-b-2xl md:border-t md:border-gray-100 md:shadow-xl">
            <div className="md:hidden flex items-center gap-4 mb-2">
              <button
                onClick={() => setIsFilterOpen(false)}
                className="p-2 -ml-2 text-gray-600"
              >
                <ArrowLeftIcon className="h-6 w-6" />
              </button>
              <span className="text-lg font-bold text-gray-900">Filters</span>
            </div>

            <div>
              <p className="uppercase text-gray-500 text-xs font-normal mb-3">
                Character
              </p>
              <div className="grid grid-cols-3 gap-3">
                {["All", "Starred", "Others"].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setLocalView(opt as any)}
                    className={`py-2 rounded-lg text-sm font-medium border transition-colors ${
                      localView === opt
                        ? "bg-[#EEE3FF] border-[#EEE3FF] text-[#8054C7]"
                        : "bg-white border-gray-200 text-gray-900 hover:bg-gray-50"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-gray-900 text-sm font-normal mb-3">Specie</p>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "All", value: undefined },
                  { label: "Human", value: "Human" },
                  { label: "Alien", value: "Alien" },
                ].map((opt) => (
                  <button
                    key={opt.label}
                    onClick={() => setLocalSpecies(opt.value)}
                    className={`py-2 rounded-lg text-sm font-medium border transition-colors ${
                      localSpecies === opt.value
                        ? "bg-[#EEE3FF] border-[#EEE3FF] text-[#8054C7]"
                        : "bg-white border-gray-200 text-gray-900 hover:bg-gray-50"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleApplyFilter}
              disabled={!hasReviewableFilters && !hasChanges}
              className={`w-full py-3 rounded-xl font-medium transition-colors ${
                hasReviewableFilters
                  ? "bg-[#8054C7] text-white shadow-md hover:bg-[#6c46a8]"
                  : hasChanges
                    ? "bg-[#8054C7] text-white opacity-80"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200"
              }`}
            >
              Filter
            </button>
          </div>
        )}
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
        ) : displayedCharacters.length === 0 ? (
          <div className="text-center py-10 text-gray-400">
            <p>No characters found.</p>
          </div>
        ) : activeView !== "All" || !!filter.species ? (
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-[#2563EB] font-[600] text-[16px]">
                {displayedCharacters.length} Results
              </span>
              <span className="bg-[#63D83833] text-[#3B8520] rounded-[12px] px-3 py-1 text-xs font-semibold">
                {(filter.species ? 1 : 0) + (activeView !== "All" ? 1 : 0)}{" "}
                filter
              </span>
            </div>

            {displayedStarred.map((character) => (
              <CharacterListItem
                key={`starred-result-${character.id}`}
                character={character}
                isFavorite={true}
                onToggleFavorite={() => onToggleFavorite(character.id)}
              />
            ))}

            {displayedOthers.length > 0 && (
              <div className="mt-2">
                <h2 className="text-[12px] font-[600] text-gray-500 uppercase tracking-wider mb-4 mt-6">
                  CHARACTERS ({displayedOthers.length})
                </h2>
                {displayedOthers.map((character) => (
                  <CharacterListItem
                    key={`result-${character.id}`}
                    character={character}
                    isFavorite={false}
                    onToggleFavorite={() => onToggleFavorite(character.id)}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <>
            {displayedStarred.length > 0 && (
              <div className="mb-6">
                <h2 className="text-[12px] font-[600] text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                  STARRED CHARACTERS ({displayedStarred.length})
                </h2>
                {displayedStarred.map((character) => (
                  <CharacterListItem
                    key={`starred-${character.id}`}
                    character={character}
                    isFavorite={true}
                    onToggleFavorite={() => onToggleFavorite(character.id)}
                  />
                ))}
              </div>
            )}

            {displayedOthers.length > 0 && (
              <div>
                <h2 className="text-[12px] font-[600] text-gray-500 uppercase tracking-wider mb-4">
                  CHARACTERS ({displayedOthers.length})
                </h2>
                {displayedOthers.map((character) => (
                  <CharacterListItem
                    key={character.id}
                    character={character}
                    isFavorite={false}
                    onToggleFavorite={() => onToggleFavorite(character.id)}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </aside>
  );
};
