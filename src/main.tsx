import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './App.css'
import 'react-toastify/dist/ReactToastify.css';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ToastContainer } from 'react-toastify'
import { FilterProvider } from './providers/FilterProvider.tsx';
import { ThemeProvider } from './providers/ThemeProvider.tsx';

const queryClient = new QueryClient();



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>

        <FilterProvider>

          <App />
          <ToastContainer
            stacked
            position="bottom-right"
            limit={3}
          />
        </FilterProvider>
      </ThemeProvider>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>,
)
