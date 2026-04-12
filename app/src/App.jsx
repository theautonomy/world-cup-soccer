import { Routes, Route } from 'react-router-dom'
import { AppProvider } from './context/AppContext.jsx'
import Home from './pages/Home.jsx'
import TeamPage from './pages/TeamPage.jsx'

export default function App() {
  return (
    <AppProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/teams/:slug" element={<TeamPage />} />
      </Routes>
    </AppProvider>
  )
}
