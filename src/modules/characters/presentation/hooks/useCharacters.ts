import { useState, useEffect, useCallback } from 'react';
import type { Character } from '../../domain/entities/Character';
import { GetCharacters } from '../../domain/usecases/GetCharacters';
import { CharacterRepositoryImpl } from '../../data/repositories/CharacterRepositoryImpl';
import { client } from '../../../../app/providers/apollo';

export const useCharacters = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCharacters = useCallback(async (page: number = 1) => {
    try {
        setLoading(true);
        const repository = new CharacterRepositoryImpl(client);
        const getCharactersUseCase = new GetCharacters(repository);
        const result = await getCharactersUseCase.execute(page);
        setCharacters(result);
        setError(null);
    } catch (err: any) {
        setError(err.message || 'Unexpected error');
    } finally {
        setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCharacters(1);
  }, [fetchCharacters]);

  return { characters, loading, error, refetch: fetchCharacters };
};
