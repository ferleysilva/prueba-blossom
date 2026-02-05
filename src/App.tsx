import { AppRouter } from './app/router/AppRouter';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
       <main className="h-screen overflow-hidden">
          <AppRouter />
       </main>
    </div>
  )
}

export default App;
