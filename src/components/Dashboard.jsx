import React, { useState, useEffect } from 'react'
import MotivationalQuote from './MotivationalQuote'
import CircularProgress from './CircularProgress'
import TodaysHabits from './TodaysHabits'
import CompletedHabits from './CompletedHabits'
import FailedHabits from './FailedHabits'
import SuccessPopup from './SuccessPopup'

function Dashboard() {
  const [analytics, setAnalytics] = useState(null)
  const [bestDayData, setBestDayData] = useState(null)
  const [showSuccessPopup, setShowSuccessPopup] = useState(false)
  const [popupData, setPopupData] = useState({})
  const [refresh, setRefresh] = useState(0)

  useEffect(() => {
    fetchAnalytics()
    fetchBestDayData()
  }, [refresh])

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

  const fetchBestDayData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/habits/daily-success', {
        credentials: 'include'
      })
      const data = await response.json()
      if (data.success) {
        const bestDay = data.data.reduce((best, current) => 
          current.completed > best.completed ? current : best
        )
        setBestDayData(bestDay)
      }
    } catch (error) {
      console.error('Failed to fetch best day data')
    }
  }

  const handleMarkAsDone = (habitData) => {
    setPopupData({
      streak: habitData.current_streak,
      habitName: habitData.name
    })
    setShowSuccessPopup(true)
    setRefresh(prev => prev + 1)
  }

  return (
    <div className="dashboard-container">
      {/* Motivational Quote */}
      <div className="mb-4">
        <MotivationalQuote />
      </div>

      {/* Analytics Cards */}
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
                {bestDayData?.day || 'N/A'}
              </div>
              <h6 className="mt-2 mb-1">Best Day</h6>
              <p className="text-muted small mb-0">
                {bestDayData?.completed || 0} habits completed
              </p>
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

      {/* Today's Sections */}
      <div className="row">
        <div className="col-lg-4 mb-4">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h6 className="mb-0">
                <i className="bi bi-list-check me-2"></i>
                Today's Habits
              </h6>
            </div>
            <div className="card-body p-0">
              <TodaysHabits onMarkAsDone={handleMarkAsDone} refresh={refresh} />
            </div>
          </div>
        </div>

        <div className="col-lg-4 mb-4">
          <div className="card">
            <div className="card-header bg-success text-white">
              <h6 className="mb-0">
                <i className="bi bi-check-circle me-2"></i>
                Completed Today
              </h6>
            </div>
            <div className="card-body p-0">
              <CompletedHabits refresh={refresh} />
            </div>
          </div>
        </div>

        <div className="col-lg-4 mb-4">
          <div className="card">
            <div className="card-header bg-danger text-white">
              <h6 className="mb-0">
                <i className="bi bi-x-circle me-2"></i>
                Missed Today
              </h6>
            </div>
            <div className="card-body p-0">
              <FailedHabits refresh={refresh} />
            </div>
          </div>
        </div>
      </div>

      {/* Success Popup */}
      {showSuccessPopup && (
        <SuccessPopup 
          data={popupData}
          onClose={() => setShowSuccessPopup(false)}
        />
      )}
    </div>
  )
}

export default Dashboard