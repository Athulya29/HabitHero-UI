import React, { useState, useEffect } from 'react'

function FailedHabits({ refresh }) {
  const [habits, setHabits] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchFailedHabits()
  }, [refresh])

  const fetchFailedHabits = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/habits/failed-today', {
        credentials: 'include'
      })
      const data = await response.json()
      if (data.success) {
        setHabits(data.habits)
      }
    } catch (error) {
      console.error('Failed to fetch failed habits')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="text-center py-4">
        <div className="spinner-border spinner-border-sm text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="failed-habits">
      {habits.length === 0 ? (
        <div className="text-center text-muted py-4">
          <i className="bi bi-emoji-smile display-4 text-light"></i>
          <p className="mt-2 mb-0">No missed habits today!</p>
        </div>
      ) : (
        <div className="list-group list-group-flush">
          {habits.map(habit => (
            <div key={habit.id} className="list-group-item">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="mb-1">{habit.name}</h6>
                  <small className="text-muted">
                    Streak: {habit.current_streak} days • {habit.category}
                  </small>
                </div>
                <span className="badge bg-danger">
                  <i className="bi bi-x-lg"></i>
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default FailedHabits