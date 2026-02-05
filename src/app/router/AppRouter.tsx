import { Routes, Route } from 'react-router-dom';
import { Home } from '../../modules/characters/presentation/pages/Home';

export const AppRouter = () => {
  return (
    <Routes>
       <Route path="/" element={<Home />} />
    </Routes>
  )
}
