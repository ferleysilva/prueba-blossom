import { gql } from '@apollo/client';

export const GET_CHARACTERS = gql`
  query GetCharacters($page: Int, $filter: FilterCharacter) {
    characters(page: $page, filter: $filter) {
      results {
        id
        name
        image
        species
        status
        gender
      }
    }
  }
`;

export const GET_CHARACTER_BY_ID = gql`
  query GetCharacter($id: ID!) {
    character(id: $id) {
      id
      name
      image
      species
      type
      status
      gender
      origin {
        name
      }
      location {
        name
      }
      episode {
        name
        episode
      }
    }
  }
`;
