import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import Layout from './Layout'
import { FilterProvider } from '../providers/FilterProvider'
import Headers from './Header'

interface PrivateRouteProps {
  children: React.ReactNode;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const location = useLocation()
  const securityKey = location.pathname.split('/')[1]

  // Check if the securityKey is valid
  const isValidKey = securityKey?.length === 64

  return isValidKey ? (
    <FilterProvider>
      <Headers />
      <Layout>
        {children}
      </Layout>
    </FilterProvider>
  ) : (
    <Navigate to="/404" />
  )
}
