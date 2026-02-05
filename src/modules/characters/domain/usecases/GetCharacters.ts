import type { Character } from '../entities/Character';
import type { CharacterRepository } from '../repositories/CharacterRepository';

export class GetCharacters {
  private repository: CharacterRepository;

  constructor(repository: CharacterRepository) {
    this.repository = repository;
  }

  async execute(page: number = 1): Promise<Character[]> {
    return this.repository.getCharacters(page);
  }
}
