import { Routes, Route } from 'react-router-dom';

export const AppRouter = () => {
  return (
    <Routes>
       <Route path="/" element={<div className="text-center p-10 text-2xl font-bold text-gray-700">Welcome to Prueba Blossom</div>} />
    </Routes>
  )
}
