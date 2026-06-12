import { useState, useEffect } from 'react'
import { API_BASE_URL, toArray } from '../api'
export default function Activities() {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/activities`)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`)
        return r.json()
      })
      .then((data) => setActivities(toArray(data)))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])
  if (loading) return <p className="text-center mt-4">Loading activities…</p>
  if (error)   return <p className="text-danger text-center mt-4">Error: {error}</p>
  return (
    <div className="container mt-4">
      <h2>🏃 Activities</h2>
      {activities.length === 0 ? (
        <p className="text-muted">No activities found.</p>
      ) : (
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>Type</th>
              <th>Duration (min)</th>
              <th>Calories</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((a) => (
              <tr key={a._id ?? a.id}>
                <td>{a.activityType}</td>
                <td>{a.durationMinutes}</td>
                <td>{a.caloriesBurned}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
