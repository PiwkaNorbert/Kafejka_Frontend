import { IP_POWROZNICZA } from '../constants.ts'
import { lazy } from 'react'
import { Routes, Route } from 'react-router'

const Information = lazy(() => import('./Information.tsx'))
const ComputerPage = lazy(() => import('./ComputerPage.tsx'))
const LegimiCodes = lazy(() => import('./LegimiCodes.tsx'))
const TicketPage = lazy(() => import('./TicketPage.tsx'))
const WifiPerms = lazy(() => import('./WifiPerms.tsx'))

export default function LazyRoutes() {
  const url = `${IP_POWROZNICZA}:8005/`

  return (
    <Routes>
      <Route index element={<Information />} />
      <Route path="informacje" element={<Information />} />
      <Route path="kafejka" element={<ComputerPage showComps={true} url={url} />} />
      <Route path="ustawienia" element={<ComputerPage showComps={false} url={url}/>} />
      <Route path="ebooki" element={<LegimiCodes />} />
      <Route path="zgloszenia" element={<TicketPage />} />
      <Route path="wifi" element={<WifiPerms  />} />
    </Routes>
  )
}
