import { useState, useEffect, useCallback, useMemo } from 'react';
import type { Character } from '../../domain/entities/Character';

import { GetCharacters } from '../../domain/usecases/GetCharacters';
import { CharacterRepositoryImpl } from '../../data/repositories/CharacterRepositoryImpl';
import { client } from '../../../../app/providers/apollo';

export type SortOrder = 'asc' | 'desc' | null;

export const useCharacters = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [filter, setFilter] = useState<{ name?: string }>({});
  const [sortOrder, setSortOrder] = useState<SortOrder>(null);

  const fetchCharacters = useCallback(async (page: number = 1, currentFilter?: { name?: string }) => {
    try {
        setLoading(true);
        const repository = new CharacterRepositoryImpl(client);
        const getCharactersUseCase = new GetCharacters(repository);
        const result = await getCharactersUseCase.execute(page, currentFilter);
        setCharacters(result);
        setError(null);
    } catch (err: any) {
        setError(err.message || 'Unexpected error');
        setCharacters([]);
    } finally {
        setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
        fetchCharacters(1, filter);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [fetchCharacters, filter]);

  const sortedCharacters = useMemo(() => {
    if (!sortOrder) return characters;
    return [...characters].sort((a, b) => {
        if (sortOrder === 'asc') {
            return a.name.localeCompare(b.name);
        } else {
            return b.name.localeCompare(a.name);
        }
    });
  }, [characters, sortOrder]);

  return { 
      characters: sortedCharacters, 
      loading, 
      error, 
      refetch: () => fetchCharacters(1, filter),
      setFilter,
      filter,
      setSortOrder,
      sortOrder
  };
};
