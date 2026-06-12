import { useState, useEffect } from 'react'
import { toArray } from '../api'

const USERS_API_URL = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users`
  : 'http://localhost:8000/api/users'

export default function Users() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(USERS_API_URL)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`)
        return r.json()
      })
      .then((data) => setUsers(toArray(data)))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p className="text-center mt-4">Loading users…</p>
  if (error)   return <p className="text-danger text-center mt-4">Error: {error}</p>

  return (
    <div className="container mt-4">
      <h2>👤 Users</h2>
      {users.length === 0 ? (
        <p className="text-muted">No users found.</p>
      ) : (
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Profile Name</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id ?? u.id ?? u.username}>
                <td>{u.username}</td>
                <td>{u.email}</td>
                <td>{u.profileName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

