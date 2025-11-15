import React, { useState, useEffect } from 'react'

function CompletedHabits({ refresh }) {
  const [habits, setHabits] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCompletedHabits()
  }, [refresh])

  const fetchCompletedHabits = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/habits/completed-today', {
        credentials: 'include'
      })
      const data = await response.json()
      if (data.success) {
        setHabits(data.habits)
      }
    } catch (error) {
      console.error('Failed to fetch completed habits')
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
    <div className="completed-habits">
      {habits.length === 0 ? (
        <div className="text-center text-muted py-4">
          <i className="bi bi-check-circle display-4 text-light"></i>
          <p className="mt-2 mb-0">No habits completed today</p>
        </div>
      ) : (
        <div className="list-group list-group-flush">
          {habits.map(habit => (
            <div key={habit.id} className="list-group-item">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="mb-1">{habit.name}</h6>
                  <small className="text-muted">{habit.category}</small>
                </div>
                <span className="badge bg-success">
                  <i className="bi bi-check-lg"></i>
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default CompletedHabits