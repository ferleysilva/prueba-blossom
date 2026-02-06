import { render, screen } from '@testing-library/react';
import { CharacterDetailView } from '../CharacterDetailView';
import { MemoryRouter } from 'react-router-dom';
import { vi, type Mock, describe, it, expect } from 'vitest';
import { useCharacter } from '../../hooks/useCharacter';
import { useCharacterLocalState } from '../../hooks/useCharacterLocalState';

vi.mock('../../hooks/useCharacter');
vi.mock('../../hooks/useCharacterLocalState');

describe('CharacterDetailView', () => {
  it('renders error state', () => {
    (useCharacter as Mock).mockReturnValue({
      character: null,
      loading: false,
      error: 'Failed to fetch',
    });
    (useCharacterLocalState as Mock).mockReturnValue({
      isFavorite: vi.fn(),
      toggleFavorite: vi.fn(),
      getComments: vi.fn(),
      addComment: vi.fn(),
      isDeleted: vi.fn().mockReturnValue(false),
    });

    render(
      <MemoryRouter>
        <CharacterDetailView />
      </MemoryRouter>
    );

    expect(screen.getByText('Character not found')).toBeInTheDocument();
    expect(screen.getByText('Failed to fetch')).toBeInTheDocument();
  });

  it('renders character details', () => {
    (useCharacter as Mock).mockReturnValue({
      character: {
        id: '1',
        name: 'Summer Smith',
        species: 'Human',
        image: 'http://example.com/summer.jpg',
        status: 'Alive',
        gender: 'Female',
        origin: { name: 'Earth' },
        location: { name: 'Earth' },
        episodes: []
      },
      loading: false,
      error: null,
    });
    (useCharacterLocalState as Mock).mockReturnValue({
      isFavorite: vi.fn().mockReturnValue(false),
      toggleFavorite: vi.fn(),
      getComments: vi.fn().mockReturnValue([]),
      addComment: vi.fn(),
      isDeleted: vi.fn().mockReturnValue(false),
    });

    render(
      <MemoryRouter>
        <CharacterDetailView />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: 'Summer Smith' })).toBeInTheDocument();
  });
});
