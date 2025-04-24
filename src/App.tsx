import { lazy } from 'react'
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router'
import './App.css'
import Headers from './components/Header.tsx'
import Layout from './components/Layout.tsx'

const Information = lazy(() => import('./pages/Information.tsx'))
const ComputerPage = lazy(() => import('./pages/ComputerPage.tsx'))
const LegimiCodes = lazy(() => import('./pages/LegimiCodes.tsx'))
const TicketPage = lazy(() => import('./pages/TicketPage.tsx'))
const WifiPerms = lazy(() => import('./pages/WifiPerms.tsx'))

function App() {
  return (
    <Router>
      <Headers />
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/informacje" />} />
          <Route path="informacje">
            <Route path=":curFilia" element={<Information />} />
          </Route>
          <Route path="kafejka">
            <Route path=":curFilia" element={<ComputerPage showComps={true} />} />
          </Route>
          <Route path="ustawienia">
            <Route path=":curFilia" element={<ComputerPage showComps={false} />} />
          </Route>
          <Route path="ebooki">
            <Route path=":curFilia" element={<LegimiCodes />} />
          </Route>
          <Route path="zgloszenia">
            <Route path=":curFilia" element={<TicketPage />} />
          </Route>
          <Route path="wifi">
            <Route path=":curFilia" element={<WifiPerms />} />
          </Route>
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
