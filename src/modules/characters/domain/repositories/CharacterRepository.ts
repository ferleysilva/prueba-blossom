import type { Character } from '../entities/Character';
export interface CharacterRepository {
  getCharacters(page?: number, filter?: { name?: string; species?: string }): Promise<Character[]>;
  getCharacter(id: string): Promise<Character>;
}
