import { AppRouter } from './app/router/AppRouter';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <header className="p-6 bg-white shadow-sm mb-4">
        <h1 className="text-3xl font-bold text-blue-600 container mx-auto">Prueba Blossom</h1>
      </header>
       <main className="container mx-auto">
          <AppRouter />
       </main>
    </div>
  )
}

export default App;
