import { lazy, useEffect } from 'react'
import { Navigate, Route, BrowserRouter as Router, Routes, useNavigate, useParams } from 'react-router'
import './App.css'
import Headers from './components/Header.tsx'
import Layout from './components/Layout.tsx'
import { navLinks } from './constants/navigation'

const Information = lazy(() => import('./pages/Information.tsx'))
const ComputerPage = lazy(() => import('./pages/ComputerPage.tsx'))
const LegimiCodes = lazy(() => import('./pages/LegimiCodes.tsx'))
const TicketPage = lazy(() => import('./pages/TicketPage.tsx'))
const WifiPerms = lazy(() => import('./pages/WifiPerms.tsx'))

// Wrapper component to handle filia persistence
const FiliaWrapper = () => {
  const { curFilia } = useParams()
  const navigate = useNavigate()
  
  useEffect(() => {
    if (!curFilia) return;

    const storedFilia = localStorage.getItem('curFilia')
    if (!storedFilia) {

      localStorage.setItem('curFilia', curFilia)
    } else if (storedFilia !== curFilia) {

      const isRestrictedAddress = window.location.hostname.includes('200.40')
      if (isRestrictedAddress) {
        navigate(`/${storedFilia}${window.location.pathname.substring(curFilia.length + 1)}`, { replace: true })
      } else {

        localStorage.setItem('curFilia', curFilia)
      }
    }
  }, [curFilia, navigate])

  return (
    <Routes>
      <Route path="informacje" element={<Information />} />
      <Route path="kafejka" element={<ComputerPage showComps={true} />} />
      <Route path="ustawienia" element={<ComputerPage showComps={false} />} />
      <Route path="ebooki" element={<LegimiCodes />} />
      <Route path="zgloszenia" element={<TicketPage />} />
      <Route path="wifi" element={<WifiPerms />} />
      <Route path="*" element={<Navigate to={`/${curFilia}/informacje`} replace />} />
    </Routes>
  )
}

function App() {
  return (
    <Router>
      <Headers />
      <Layout>
        <Routes>
          <Route index element={<Dashboard />} />
          <Route path=":curFilia/*" element={<FiliaWrapper />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App

const Dashboard = () => {
  const navigate = useNavigate()
  
  useEffect(() => {
    const storedNavTitle = localStorage.getItem('navTitle')
    const storedFilia = localStorage.getItem('curFilia')
    
    if (storedNavTitle && storedFilia) {
      const index = navLinks.findIndex((link) => link.label.toLowerCase() === storedNavTitle.toLowerCase())
      if (index !== -1) {
        navigate(`/${storedFilia}/${navLinks[index].to}`, { replace: true })
      }
    }
  }, [navigate])

  return (
    <div className="space-y-6 p-6">
      {/* <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Filie</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6</div>
            <p className="text-xs text-muted-foreground">
              Aktywne filie w systemie
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Użytkownicy</CardTitle>
            <Wifi className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">
              Zarejestrowani użytkownicy
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Komputery</CardTitle>
            <Power className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">128</div>
            <p className="text-xs text-muted-foreground">
              Wszystkie komputery w systemie
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Zgłoszenia</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              Aktywne zgłoszenia
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Aktywność systemu</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Wybierz filię aby zobaczyć szczegółowe statystyki i zarządzać komputerami.
            </p>
          </CardContent>
        </Card>
      </div> */}
    </div>
  )
}
