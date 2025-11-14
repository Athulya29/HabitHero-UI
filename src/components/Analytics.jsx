import React, { useState, useEffect } from 'react'

function Analytics() {
  const [analytics, setAnalytics] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAnalytics()
  }, [])

  const fetchAnalytics = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('http://localhost:5000/api/habits/analytics', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      const data = await response.json()

      if (data.success) {
        setAnalytics(data.analytics)
      }
    } catch (error) {
      console.error('Failed to fetch analytics')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="card">
        <div className="card-body text-center py-4">
          <div className="spinner-border spinner-border-sm text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    )
  }

  if (!analytics) {
    return (
      <div className="card">
        <div className="card-body">
          <h6 className="card-title">Progress Analytics</h6>
          <p className="text-muted small">No data available</p>
        </div>
      </div>
    )
  }

  return (
    <div className="card">
      <div className="card-body">
        <h6 className="card-title mb-3">Progress Analytics</h6>
        
        {/* Success Rate */}
        <div className="mb-4">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="text-muted small">Success Rate</span>
            <span className="fw-bold text-primary">{analytics.success_rate}%</span>
          </div>
          <div className="progress" style={{height: '8px'}}>
            <div 
              className="progress-bar bg-primary" 
              style={{width: `${analytics.success_rate}%`}}
            ></div>
          </div>
        </div>

        <div className="row text-center">
          <div className="col-6 mb-3">
            <div className="border rounded p-2">
              <div className="fw-bold text-success fs-5">{analytics.current_streak}</div>
              <small className="text-muted">Current Streak</small>
            </div>
          </div>
          <div className="col-6 mb-3">
            <div className="border rounded p-2">
              <div className="fw-bold text-info fs-5">{analytics.total_habits}</div>
              <small className="text-muted">Total Habits</small>
            </div>
          </div>
          <div className="col-12">
            <div className="border rounded p-2">
              <div className="fw-bold text-warning">{analytics.best_day}</div>
              <small className="text-muted">Best Day</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analytics