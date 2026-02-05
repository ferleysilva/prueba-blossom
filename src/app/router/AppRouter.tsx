import { Routes, Route } from 'react-router-dom';
import { CharactersPage } from '../../modules/characters/presentation/pages/CharactersPage';
import { EmptyDetailView } from '../../modules/characters/presentation/pages/EmptyDetailView';
import { CharacterDetailView } from '../../modules/characters/presentation/pages/CharacterDetailView';

export const AppRouter = () => {
  return (
    <Routes>
       <Route path="/" element={<CharactersPage />}>
          <Route index element={<EmptyDetailView />} />
          <Route path="character/:id" element={<CharacterDetailView />} />
       </Route>
    </Routes>
  )
}
