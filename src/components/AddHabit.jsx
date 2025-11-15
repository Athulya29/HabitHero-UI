import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function AddHabit() {
  const [formData, setFormData] = useState({
    name: '',
    frequency: 'daily',
    category: 'health',
    start_date: new Date().toISOString().split('T')[0],
    target_duration: 30,
    note: ''
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  
  const navigate = useNavigate()

  const categories = [
    'health', 'work', 'learning', 'Lifestyle', 'Fitness', 
    'Mental Wellness', 'Productivity'
  ]

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    if (error) setError('')
    if (success) setSuccess('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    
    if (!formData.name.trim()) {
      setError('Habit name is required')
      return
    }

    if (formData.target_duration < 1) {
      setError('Target duration must be at least 1 day')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('http://localhost:5000/api/habits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (data.success) {
        setSuccess('Habit created successfully!')
        setFormData({
          name: '',
          frequency: 'daily',
          category: 'health',
          start_date: new Date().toISOString().split('T')[0],
          target_duration: 30,
          note: ''
        })
        setTimeout(() => {
          navigate('/dashboard')
        }, 1500)
      } else {
        setError(data.error)
      }
    } catch (error) {
      setError('Failed to create habit. Please try again.')
    }
    
    setLoading(false)
  }

  return (
    <div className="add-habit-container">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h4 className="mb-0">
                <i className="bi bi-plus-circle me-2"></i>
                Create New Habit
              </h4>
            </div>
            <div className="card-body p-4">
              {error && (
                <div className="alert alert-danger" role="alert">
                  <i className="bi bi-exclamation-triangle-fill me-2"></i>
                  {error}
                </div>
              )}

              {success && (
                <div className="alert alert-success" role="alert">
                  <i className="bi bi-check-circle-fill me-2"></i>
                  {success}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="form-label fw-semibold">Habit Name *</label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g., Morning Walk, Reading, Meditation"
                    required
                  />
                </div>

                <div className="row mb-4">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Frequency *</label>
                    <select 
                      className="form-select form-select-lg" 
                      name="frequency"
                      value={formData.frequency}
                      onChange={handleChange}
                      required
                    >
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                    </select>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Category *</label>
                    <select 
                      className="form-select form-select-lg" 
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      required
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="row mb-4">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Start Date *</label>
                    <input
                      type="date"
                      className="form-control form-control-lg"
                      name="start_date"
                      value={formData.start_date}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Target Duration (days) *</label>
                    <input
                      type="number"
                      className="form-control form-control-lg"
                      name="target_duration"
                      value={formData.target_duration}
                      onChange={handleChange}
                      min="1"
                      required
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold">Note (Optional)</label>
                  <textarea
                    className="form-control"
                    name="note"
                    value={formData.note}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Why is this habit important to you? What benefits do you expect?"
                  ></textarea>
                </div>

                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                  <button 
                    type="button" 
                    className="btn btn-outline-secondary btn-lg me-md-2"
                    onClick={() => navigate('/dashboard')}
                  >
                    <i className="bi bi-arrow-left me-2"></i>
                    Back to Dashboard
                  </button>
                  <button 
                    type="submit" 
                    className="btn btn-primary btn-lg"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                        Creating Habit...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-plus-circle me-2"></i>
                        Create Habit
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddHabit