import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './App.css'
import 'react-toastify/dist/ReactToastify.css'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { matchQuery, MutationCache, QueryCache, QueryClient, QueryClientProvider, type QueryKey } from '@tanstack/react-query'

import { toast, ToastContainer } from 'react-toastify'
import { FilterProvider } from './providers/FilterProvider.tsx'
import { ThemeProvider } from './providers/ThemeProvider.tsx'

const onErrorHandler = (error: Error) => {
  console.error('API Error:', error);
  
  // Handle network errors with user-friendly messages
  if (error.name === 'NetworkError' || error.name === 'RequestError' || error.name === 'TimeoutError') {
    toast.error(error.message, {
      toastId: 'network-error',
    });
  } else if (error.message) {
    // Handle other errors
    toast.error(error.message, {
      toastId: 'other-error',
    });
  } else {
    // Fallback for unknown errors
    toast.error('Wystąpił nieoczekiwany błąd. Spróbuj ponownie później.', {
      toastId: 'unknown-error',
    });
  }
  
  throw error;
};

const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    onError: onErrorHandler,
    onSuccess(_data, _variables, _context, mutation) {
      queryClient.invalidateQueries({
        predicate: (query) =>
          mutation.meta?.invalidates?.some((queryKey: QueryKey) =>
            matchQuery({ queryKey }, query)
          ) ?? false,
      });

    },
  }),
  queryCache: new QueryCache({
    onError: onErrorHandler,
  }),
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <FilterProvider>
          <App />

          <ToastContainer stacked position="bottom-right" limit={3} />
        </FilterProvider>
      </ThemeProvider>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
)
