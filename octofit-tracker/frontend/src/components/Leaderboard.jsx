import { useState, useEffect } from 'react'
import { API_BASE_URL, toArray } from '../api'
export default function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/leaderboard`)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`)
        return r.json()
      })
      .then((data) => setEntries(toArray(data)))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])
  if (loading) return <p className="text-center mt-4">Loading leaderboard…</p>
  if (error)   return <p className="text-danger text-center mt-4">Error: {error}</p>
  return (
    <div className="container mt-4">
      <h2>🥇 Leaderboard</h2>
      {entries.length === 0 ? (
        <p className="text-muted">Leaderboard is empty.</p>
      ) : (
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>Rank</th>
              <th>Total Calories</th>
              <th>Total Minutes</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((e) => (
              <tr key={e._id ?? e.id}>
                <td>{e.rank}</td>
                <td>{e.totalCalories}</td>
                <td>{e.totalMinutes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
