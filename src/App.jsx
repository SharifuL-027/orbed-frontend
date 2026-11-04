import Navbar from './components/Navbar/Navbar'
import AppRoutes from './components/routes/AppRouter'

function App() {
  return (
    <main className="app-layout">
      {/* <Navbar /> will go here later */}
      <Navbar/>
      <AppRoutes />
      
      {/* <Footer /> will go here later */}
    </main>
  )
}

export default App