import React, { useState } from 'react'

function CreateHabit({ onHabitCreated, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    frequency: 'daily',
    category: 'health',
    start_date: new Date().toISOString().split('T')[0],
    target_duration: 30,
    note: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

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
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    
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
      const token = localStorage.getItem('token')
      const response = await fetch('http://localhost:5000/api/habits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (data.success) {
        onHabitCreated(data.habit)
        onClose()
      } else {
        setError(data.error)
      }
    } catch (error) {
      setError('Failed to create habit. Please try again.')
    }
    
    setLoading(false)
  }

  return (
    <div className="modal fade show d-block" tabIndex="-1" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Create New Habit</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Habit Name *</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g., Morning Walk, Reading, Meditation"
                  required
                />
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Frequency *</label>
                  <select 
                    className="form-select" 
                    name="frequency"
                    value={formData.frequency}
                    onChange={handleChange}
                    required
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                  </select>
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Category *</label>
                  <select 
                    className="form-select" 
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

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Start Date *</label>
                  <input
                    type="date"
                    className="form-control"
                    name="start_date"
                    value={formData.start_date}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Target (days) *</label>
                  <input
                    type="number"
                    className="form-control"
                    name="target_duration"
                    value={formData.target_duration}
                    onChange={handleChange}
                    min="1"
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label">Note (Optional)</label>
                <textarea
                  className="form-control"
                  name="note"
                  value={formData.note}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Why is this habit important to you?"
                ></textarea>
              </div>

              <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <button 
                  type="button" 
                  className="btn btn-outline-secondary me-md-2"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                      Creating...
                    </>
                  ) : (
                    'Create Habit'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateHabit