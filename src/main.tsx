import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './App.css'
import 'react-toastify/dist/ReactToastify.css';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ToastContainer } from 'react-toastify'
import { FilterProvider } from './providers/FilterProvider.tsx';

const queryClient = new QueryClient();



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <FilterProvider>
        <App />
        <ToastContainer
            stacked 
            position="bottom-right"
            limit={3}
          />
      </FilterProvider>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>,
)
