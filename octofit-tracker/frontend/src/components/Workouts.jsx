import { useState, useEffect } from 'react'
import { API_BASE_URL, toArray } from '../api'
export default function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/workouts`)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`)
        return r.json()
      })
      .then((data) => setWorkouts(toArray(data)))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])
  if (loading) return <p className="text-center mt-4">Loading workouts…</p>
  if (error)   return <p className="text-danger text-center mt-4">Error: {error}</p>
  return (
    <div className="container mt-4">
      <h2>💪 Workouts</h2>
      {workouts.length === 0 ? (
        <p className="text-muted">No workouts found.</p>
      ) : (
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Difficulty</th>
              <th>Duration (min)</th>
              <th>Est. Calories</th>
            </tr>
          </thead>
          <tbody>
            {workouts.map((w) => (
              <tr key={w._id ?? w.id}>
                <td>{w.name}</td>
                <td>{w.difficulty}</td>
                <td>{w.duration}</td>
                <td>{w.estimatedCalories}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
