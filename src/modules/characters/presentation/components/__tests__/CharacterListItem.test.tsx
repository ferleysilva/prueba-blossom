import { render, screen, fireEvent } from '@testing-library/react';
import { CharacterListItem } from '../CharacterListItem';
import { MemoryRouter } from 'react-router-dom';
import type { Character } from '../../../domain/entities/Character';
import { vi, describe, it, expect } from 'vitest';

const mockCharacter: Character = {
  id: '1',
  name: 'Rick Sanchez',
  species: 'Human',
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  status: 'Alive',
  gender: 'Male',
  type: '',
  origin: { name: 'Earth' },
  location: { name: 'Earth' },
  episodes: []
};

describe('CharacterListItem', () => {
  it('renders character information correctly', () => {
    render(
      <MemoryRouter>
        <CharacterListItem character={mockCharacter} />
      </MemoryRouter>
    );

    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Human')).toBeInTheDocument();
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', mockCharacter.image);
    expect(img).toHaveAttribute('alt', mockCharacter.name);
  });

  it('calls onToggleFavorite when heart icon is clicked', () => {
    const onToggleFavorite = vi.fn();
    render(
      <MemoryRouter>
        <CharacterListItem
          character={mockCharacter}
          onToggleFavorite={onToggleFavorite}
          isFavorite={false}
        />
      </MemoryRouter>
    );

    const buttons = screen.getAllByRole('button');
    const favoriteButton = buttons[0]; 

    fireEvent.click(favoriteButton);
    expect(onToggleFavorite).toHaveBeenCalled();
  });

});
