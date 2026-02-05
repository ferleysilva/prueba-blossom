import { ApolloClient, type NormalizedCacheObject } from '@apollo/client';
import type { CharacterRepository } from '../../domain/repositories/CharacterRepository';
import type { Character } from '../../domain/entities/Character';
import { GET_CHARACTERS, GET_CHARACTER_BY_ID } from '../graphql/queries';
import { CharacterMapper } from '../mappers/CharacterMapper';

export class CharacterRepositoryImpl implements CharacterRepository {
  private client: ApolloClient<NormalizedCacheObject>;

  constructor(client: ApolloClient<NormalizedCacheObject>) {
    this.client = client;
  }

  async getCharacters(page: number = 1, filter?: { name?: string; species?: string; status?: string; gender?: string }): Promise<Character[]> {
    const { data } = await this.client.query({
      query: GET_CHARACTERS,
      variables: { page, filter },
      fetchPolicy: 'network-only',
    });
    return data.characters.results.map(CharacterMapper.toDomain);
  }
  async getCharacter(id: string): Promise<Character> {
    const { data } = await this.client.query({
      query: GET_CHARACTER_BY_ID,
      variables: { id },
      fetchPolicy: 'network-only',
    });
    return CharacterMapper.toDomain(data.character);
  }
}
