const GRAPHQL_URL = process.env.NEXT_PUBLIC_MAGENTO_GRAPHQL_URL!
const STORE_CODE = process.env.NEXT_PUBLIC_STORE_CODE || 'default'

export async function magentoFetch<T = unknown>(
  query: string,
  variables?: Record<string, unknown>,
  token?: string | null
): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Store: STORE_CODE,
  }
  if (token) headers['Authorization'] = `Bearer ${token}`

  const res = await fetch(GRAPHQL_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({ query, variables }),
  })

  const json = await res.json()
  if (json.errors?.length) throw new Error(json.errors[0].message)
  return json.data as T
}
