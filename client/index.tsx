import { Auth0Provider } from '@auth0/auth0-react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { routes } from './routes'

const queryClient = new QueryClient()
export const router = createBrowserRouter(routes)

document.addEventListener('DOMContentLoaded', () => {
  createRoot(document.getElementById('app') as HTMLElement).render(
    <Auth0Provider
      domain="https://whai-2023-jen.au.auth0.com/"
      clientId="q70YHkwASxKxqhSyjlma5ExiPKVARnxV"
      authorizationParams={{
        audience: 'https://pocket-doro/api',
        redirect_uri: window.location.origin,
      }}
    >
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </Auth0Provider>
  )
})
