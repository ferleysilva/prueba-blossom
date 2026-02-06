import { render, screen, fireEvent } from '@testing-library/react';
import { CharacterListSidebar } from '../CharacterListSidebar';
import { MemoryRouter } from 'react-router-dom';
import type { Character } from '../../../domain/entities/Character';
import { vi, describe, it, expect } from 'vitest';

const mockCharacters: Character[] = [
  {
    id: '1',
    name: 'Rick Sanchez',
    species: 'Human',
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    status: 'Alive',
    gender: 'Male',
  },
  {
    id: '2',
    name: 'Morty Smith',
    species: 'Human',
    image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
    status: 'Alive',
    gender: 'Male',
  }
];

const defaultProps = {
  characters: mockCharacters,
  loading: false,
  error: null,
  filter: {},
  setFilter: vi.fn(),
  favorites: [],
  onToggleFavorite: vi.fn(),
  onDelete: vi.fn(),
  sortOrder: null as any,
  setSortOrder: vi.fn(),
};

describe('CharacterListSidebar', () => {
  it('renders list of characters', () => {
    render(
      <MemoryRouter>
        <CharacterListSidebar {...defaultProps} />
      </MemoryRouter>
    );

    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Morty Smith')).toBeInTheDocument();
  });

  it('displays error message', () => {
    render(
      <MemoryRouter>
        <CharacterListSidebar {...defaultProps} error="Something went wrong" characters={[]} />
      </MemoryRouter>
    );
    expect(screen.getByText('Error loading characters')).toBeInTheDocument();
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('updates filter on input change', () => {
    render(
      <MemoryRouter>
        <CharacterListSidebar {...defaultProps} />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText('Search or filter results');
    fireEvent.change(input, { target: { value: 'Rick' } });

    expect(defaultProps.setFilter).toHaveBeenCalled();
  });
});
