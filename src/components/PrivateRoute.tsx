import { Navigate, Outlet, useLocation } from 'react-router-dom'
import Layout from './Layout'
import { FilterProvider } from '../providers/FilterProvider'
import Headers from './Header'

export default function PrivateRoute() {
  const location = useLocation()
  const securityKey = location.pathname.split('/')[1]

  // Check if the securityKey is valid
  const isValidKey = securityKey?.length === 64

  return isValidKey ? (
    <>
        <FilterProvider>
          <Headers />
          <Layout>
            <Outlet />
          </Layout>
      </FilterProvider>

    </>
  ) : (
    <Navigate to="/404" />
  )
}
