import type { Character } from '../../domain/entities/Character';

export class CharacterMapper {
  static toDomain(raw: any): Character {
    return {
      id: raw.id,
      name: raw.name,
      image: raw.image,
      species: raw.species,
      status: raw.status,
      gender: raw.gender,
    };
  }
}
