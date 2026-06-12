import { useState, useEffect } from 'react'
import { API_BASE_URL, toArray } from '../api'
export default function Teams() {
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/teams`)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`)
        return r.json()
      })
      .then((data) => setTeams(toArray(data)))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])
  if (loading) return <p className="text-center mt-4">Loading teams…</p>
  if (error)   return <p className="text-danger text-center mt-4">Error: {error}</p>
  return (
    <div className="container mt-4">
      <h2>🏆 Teams</h2>
      {teams.length === 0 ? (
        <p className="text-muted">No teams found.</p>
      ) : (
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>City</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((t) => (
              <tr key={t._id ?? t.id ?? t.name}>
                <td>{t.name}</td>
                <td>{t.city}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
