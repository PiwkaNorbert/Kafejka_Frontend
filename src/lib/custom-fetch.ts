import { BASE_IP, DEFAULT_PORT } from '../constants'

export async function customFetch<T>(
  url: string,
  errorMessage: string,
  signal?: AbortSignal
): Promise<T> {
  try {
    const response = await fetch(url, { signal: signal as AbortSignal | null })
    if (!response.ok) throw new Error(errorMessage)
    return await response.json()
  } catch (error) {
    console.error(error)
    throw new Error(errorMessage)
  }
}

export type Success<T> = {
  data: T
  error: null
}

export type Failure<E> = {
  data: null
  error: E
}

export type Result<T, E = Error> = Success<T> | Failure<E>

// Main wrapper function
export async function tryCatch<T, E = Error>(
  promise: Promise<T>
): Promise<Result<T, E>> {
  try {
    const data = await promise
    return { data, error: null }
  } catch (error) {
    return { data: null, error: error as E }
  }
}

export const apiLink = (port?: string) => {
  // Use the provided port, environment variable, or default port
  const selectedPort = port || process.env.API_PORT || DEFAULT_PORT

  // If API_LINK is provided in env, use it directly
  if (process.env.API_LINK) {
    return process.env.API_LINK
  }

  // Otherwise construct the URL with BASE_IP and port
  return `${BASE_IP}:${selectedPort}`
}

export async function fetchApi<T>(
  { path, port }: { path: string; port?: string },
  init?: RequestInit
): Promise<T> {
  const fetchResult = await tryCatch(
    fetch(`${apiLink(port)}${path}`, {
      ...init,
      headers: {
        'Content-Type': 'application/json',
        ...init?.headers,
      },
    })
  )

  if (fetchResult.error) {
    throw new Error('Failed to fetch')
  }

  if (!fetchResult.data.ok) {
    throw new Error(`Request failed with status ${fetchResult.data.status}`)
  }

  const dataResult = await tryCatch(fetchResult.data.json())
  if (dataResult.error) {
    throw new Error('Failed to parse response')
  }

  return dataResult.data as T
}
