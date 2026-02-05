import type { Character } from '../entities/Character';

export interface CharacterRepository {
  getCharacters(page?: number): Promise<Character[]>;
}
