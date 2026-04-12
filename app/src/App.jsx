import { Routes, Route } from 'react-router-dom'
import { AppProvider } from './context/AppContext.jsx'
import Home from './pages/Home.jsx'
import TeamPage from './pages/TeamPage.jsx'
import GroupPage from './pages/GroupPage.jsx'

export default function App() {
  return (
    <AppProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/teams/:slug" element={<TeamPage />} />
        <Route path="/groups/:letter" element={<GroupPage />} />
      </Routes>
    </AppProvider>
  )
}
