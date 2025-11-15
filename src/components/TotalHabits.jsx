import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function TotalHabits() {
  const [habits, setHabits] = useState([])
  const [filteredHabits, setFilteredHabits] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const categories = [
    'all', 'health', 'work', 'learning', 'Lifestyle', 
    'Fitness', 'Mental Wellness', 'Productivity'
  ]

  useEffect(() => {
    fetchAllHabits()
  }, [])

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredHabits(habits)
    } else {
      setFilteredHabits(habits.filter(habit => habit.category === selectedCategory))
    }
  }, [selectedCategory, habits])

  const fetchAllHabits = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/habits', {
        credentials: 'include'
      })
      const data = await response.json()
      if (data.success) {
        setHabits(data.habits)
      }
    } catch (error) {
      console.error('Failed to fetch habits')
    } finally {
      setLoading(false)
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
        fetchAllHabits()
      } else {
        alert(data.error)
      }
    } catch (error) {
      alert('Failed to delete habit')
    }
  }

  const getCategoryStats = () => {
    const stats = {}
    habits.forEach(habit => {
      if (!stats[habit.category]) {
        stats[habit.category] = 0
      }
      stats[habit.category]++
    })
    return stats
  }

  const categoryStats = getCategoryStats()

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center py-5">
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="text-muted">Loading your habits...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="total-habits-container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-1">All Habits</h2>
          <p className="text-muted mb-0">Manage and view all your habits</p>
        </div>
        <button 
          className="btn btn-primary"
          onClick={() => navigate('/add-habit')}
        >
          <i className="bi bi-plus-circle me-2"></i>
          Add New Habit
        </button>
      </div>

      {/* Category Filter */}
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title mb-3">Filter by Category</h5>
          <div className="d-flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                className={`btn ${selectedCategory === category ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category === 'all' ? 'All Habits' : category}
                {category !== 'all' && categoryStats[category] && (
                  <span className="badge bg-light text-dark ms-2">
                    {categoryStats[category]}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Habits List */}
      <div className="card">
        <div className="card-header">
          <h5 className="mb-0">
            {selectedCategory === 'all' ? 'All Habits' : selectedCategory} 
            <span className="badge bg-primary ms-2">{filteredHabits.length}</span>
          </h5>
        </div>
        <div className="card-body p-0">
          {filteredHabits.length === 0 ? (
            <div className="text-center text-muted py-5">
              <i className="bi bi-inbox display-4"></i>
              <p className="mt-3 mb-2">No habits found</p>
              <p className="text-muted">
                {selectedCategory === 'all' 
                  ? "You haven't created any habits yet." 
                  : `No habits found in ${selectedCategory} category.`
                }
              </p>
              <button 
                className="btn btn-primary mt-2"
                onClick={() => navigate('/add-habit')}
              >
                <i className="bi bi-plus-circle me-2"></i>
                Create Your First Habit
              </button>
            </div>
          ) : (
            <div className="list-group list-group-flush">
              {filteredHabits.map(habit => (
                <div key={habit.id} className="list-group-item">
                  <div className="d-flex justify-content-between align-items-start">
                    <div className="flex-grow-1">
                      <h6 className="mb-1">{habit.name}</h6>
                      <div className="d-flex flex-wrap gap-2 mb-2">
                        <span className="badge bg-primary">{habit.category}</span>
                        <span className="badge bg-secondary">{habit.frequency}</span>
                        <span className="badge bg-info">Target: {habit.target_duration} days</span>
                      </div>
                      {habit.note && (
                        <p className="text-muted small mb-2">{habit.note}</p>
                      )}
                      <small className="text-muted">
                        Started: {new Date(habit.start_date).toLocaleDateString()}
                      </small>
                    </div>
                    <div className="d-flex gap-2">
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
      </div>
    </div>
  )
}

export default TotalHabits