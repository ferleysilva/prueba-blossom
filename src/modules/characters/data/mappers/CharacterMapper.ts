import type { Character } from '../../domain/entities/Character';

export class CharacterMapper {
  static toDomain(raw: any): Character {
    return {
      id: raw.id,
      name: raw.name,
      image: raw.image,
      species: raw.species,
      type: raw.type,
      status: raw.status,
      gender: raw.gender,
      origin: raw.origin ? { name: raw.origin.name } : undefined,
      location: raw.location ? { name: raw.location.name } : undefined,
      episodes: raw.episode ? (Array.isArray(raw.episode) ? raw.episode.map((ep: any) => ({ name: ep.name, episode: ep.episode })) : []) : undefined,    
    };
  }
}
