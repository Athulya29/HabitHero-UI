import React, { useState, useEffect } from 'react'

function TodaysHabits({ onMarkAsDone, refresh }) {
  const [habits, setHabits] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchTodaysHabits()
  }, [refresh])

  const fetchTodaysHabits = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/habits/today', {
        credentials: 'include'
      })
      const data = await response.json()
      if (data.success) {
        setHabits(data.habits)
      } else {
        setError(data.error)
      }
    } catch (error) {
      setError('Failed to fetch habits')
    } finally {
      setLoading(false)
    }
  }

  const markAsDone = async (habitId) => {
    try {
      const response = await fetch('http://localhost:5000/api/habits/mark-done', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ habit_id: habitId })
      })
      const data = await response.json()
      if (data.success) {
        // Find the habit to pass its data to the popup
        const habit = habits.find(h => h.id === habitId)
        if (habit) {
          onMarkAsDone(habit)
        }
        fetchTodaysHabits()
      } else {
        alert(data.error)
      }
    } catch (error) {
      alert('Failed to mark habit as done')
    }
  }

  const deleteHabit = async (habitId) => {
    if (!window.confirm('Are you sure you want to delete this habit?')) {
      return
    }
    try {
      const response = await fetch(`http://localhost:5000/api/habits?habit_id=${habitId}`, {
        method: 'DELETE',
        credentials: 'include'
      })
      const data = await response.json()
      if (data.success) {
        fetchTodaysHabits()
      } else {
        alert(data.error)
      }
    } catch (error) {
      alert('Failed to delete habit')
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

  if (error) {
    return (
      <div className="alert alert-danger m-3" role="alert">
        {error}
      </div>
    )
  }

  return (
    <div className="todays-habits">
      {habits.length === 0 ? (
        <div className="text-center text-muted py-4">
          <i className="bi bi-check-circle display-4 text-light"></i>
          <p className="mt-2 mb-0">No habits for today!</p>
          <p className="text-muted">Create your first habit to get started.</p>
        </div>
      ) : (
        <div className="list-group list-group-flush">
          {habits.map(habit => (
            <div key={habit.id} className="list-group-item">
              <div className="d-flex justify-content-between align-items-start">
                <div className="flex-grow-1">
                  <h6 className="mb-1">{habit.name}</h6>
                  <div className="d-flex flex-wrap gap-2 mb-2">
                    <span className="badge bg-primary">{habit.category}</span>
                    <span className="badge bg-success">Streak: {habit.current_streak} days</span>
                    <span className="badge bg-secondary">{habit.frequency}</span>
                  </div>
                  {habit.note && (
                    <p className="text-muted small mb-2">{habit.note}</p>
                  )}
                </div>
                <div className="d-flex gap-2">
                  {habit.checked_in_today === 'pending' && (
                    <button 
                      className="btn btn-success btn-sm"
                      onClick={() => markAsDone(habit.id)}
                    >
                      <i className="bi bi-check-lg me-1"></i>
                      Done
                    </button>
                  )}
                  {habit.checked_in_today === 'completed' && (
                    <span className="badge bg-success p-2">
                      <i className="bi bi-check-circle me-1"></i>
                      Completed
                    </span>
                  )}
                  <button 
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => deleteHabit(habit.id)}
                    title="Delete habit"
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default TodaysHabits