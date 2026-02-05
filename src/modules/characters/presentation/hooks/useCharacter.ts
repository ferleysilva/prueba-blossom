import { useState, useEffect, useCallback } from 'react';
import type { Character } from '../../domain/entities/Character';
import { GetCharacter } from '../../domain/usecases/GetCharacter';
import { CharacterRepositoryImpl } from '../../data/repositories/CharacterRepositoryImpl';
import { client } from '../../../../app/providers/apollo';

export const useCharacter = (id?: string) => {
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCharacter = useCallback(async (characterId: string) => {
    try {
        setLoading(true);
        const repository = new CharacterRepositoryImpl(client);
        const getCharacterUseCase = new GetCharacter(repository);
        const result = await getCharacterUseCase.execute(characterId);
        setCharacter(result);
        setError(null);
    } catch (err: any) {
        setError(err.message || 'Unexpected error');
    } finally {
        setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (id) {
        fetchCharacter(id);
    }
  }, [id, fetchCharacter]);

  return { character, loading, error, refetch: () => id && fetchCharacter(id) };
};
