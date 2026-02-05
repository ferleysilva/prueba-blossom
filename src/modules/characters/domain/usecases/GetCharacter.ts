import type { Character } from '../entities/Character';
import type { CharacterRepository } from '../repositories/CharacterRepository';

export class GetCharacter {
  private repository: CharacterRepository;

  constructor(repository: CharacterRepository) {
    this.repository = repository;
  }

  async execute(id: string): Promise<Character> {
    return this.repository.getCharacter(id);
  }
}
