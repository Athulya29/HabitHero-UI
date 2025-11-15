import React, { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import CircularProgress from './CircularProgress'

function Analytics() {
  const [analytics, setAnalytics] = useState(null)
  const [dailyData, setDailyData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAnalytics()
    fetchDailyData()
  }, [])

  const fetchAnalytics = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/habits/analytics', {
        credentials: 'include'
      })
      const data = await response.json()
      if (data.success) {
        setAnalytics(data.analytics)
      }
    } catch (error) {
      console.error('Failed to fetch analytics')
    }
  }

  const fetchDailyData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/habits/daily-success', {
        credentials: 'include'
      })
      const data = await response.json()
      if (data.success) {
        setDailyData(data.data)
      }
    } catch (error) {
      console.error('Failed to fetch daily data')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center py-5">
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="text-muted">Loading analytics...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="analytics-container">
      <div className="mb-4">
        <h2 className="mb-1">Analytics</h2>
        <p className="text-muted">Track your habit performance and progress</p>
      </div>

      {/* Key Metrics */}
      <div className="row mb-4">
        <div className="col-md-3 mb-3">
          <div className="card analytics-card h-100">
            <div className="card-body text-center">
              <CircularProgress 
                percentage={analytics?.success_rate || 0} 
                size={80}
                strokeWidth={8}
              />
              <h6 className="mt-2 mb-1">Success Rate</h6>
              <p className="text-muted small mb-0">Overall completion rate</p>
            </div>
          </div>
        </div>
        
        <div className="col-md-3 mb-3">
          <div className="card analytics-card h-100">
            <div className="card-body text-center">
              <div className="display-4 text-success fw-bold">
                {analytics?.current_streak || 0}
              </div>
              <h6 className="mt-2 mb-1">Current Streak</h6>
              <p className="text-muted small mb-0">Consecutive days</p>
            </div>
          </div>
        </div>
        
        <div className="col-md-3 mb-3">
          <div className="card analytics-card h-100">
            <div className="card-body text-center">
              <div className="display-4 text-warning fw-bold">
                {analytics?.best_day || 'N/A'}
              </div>
              <h6 className="mt-2 mb-1">Best Day</h6>
              <p className="text-muted small mb-0">Most productive day</p>
            </div>
          </div>
        </div>
        
        <div className="col-md-3 mb-3">
          <div className="card analytics-card h-100">
            <div className="card-body text-center">
              <div className="display-4 text-info fw-bold">
                {analytics?.total_habits || 0}
              </div>
              <h6 className="mt-2 mb-1">Total Habits</h6>
              <p className="text-muted small mb-0">Active habits</p>
            </div>
          </div>
        </div>
      </div>

      {/* Daily Success Chart */}
      <div className="card mb-4">
        <div className="card-header">
          <h5 className="mb-0">Daily Success Rate (Last 7 Days)</h5>
        </div>
        <div className="card-body">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dailyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis label={{ value: 'Success Rate %', angle: -90, position: 'insideLeft' }} />
              <Tooltip 
                formatter={(value) => [`${value}%`, 'Success Rate']}
                labelFormatter={(label) => `Day: ${label}`}
              />
              <Bar dataKey="success_rate" fill="#667eea" name="Success Rate" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      
              </div>
            
    
  )
}

export default Analytics