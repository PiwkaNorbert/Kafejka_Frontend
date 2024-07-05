
export async function customFetch<T>(url: string, errorMessage: string, signal?: AbortSignal): Promise<T> {
  try {
    const response = await fetch(url, { signal });
    if (!response.ok) throw new Error(errorMessage);
    return await response.json();
  } catch (error) {
    console.error(error);
    throw new Error(errorMessage);
  }
}

