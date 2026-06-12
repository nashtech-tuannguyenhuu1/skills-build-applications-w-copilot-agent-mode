/**
 * Build the API base URL.
 * Uses VITE_CODESPACE_NAME when available (Codespaces environment),
 * otherwise falls back to localhost:8000.
 *
 * Set VITE_CODESPACE_NAME in .env.local when running in Codespaces.
 */
const codespaceName = import.meta.env.VITE_CODESPACE_NAME

export const API_BASE_URL =
  codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000'

/**
 * Normalise a backend response into a plain array.
 * Handles both raw arrays and paginated { results: [...] } shapes.
 */
export const toArray = (data) => {
  if (Array.isArray(data)) return data
  if (data && Array.isArray(data.results)) return data.results
  return []
}

