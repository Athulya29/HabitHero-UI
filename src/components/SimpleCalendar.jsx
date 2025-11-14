import React, { useState, useEffect } from 'react'

function SimpleCalendar() {
  const [calendarData, setCalendarData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCalendarData()
  }, [])

  const fetchCalendarData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/habits/calendar', {
        credentials: 'include'
      })

      const data = await response.json()

      if (data.success) {
        setCalendarData(data.calendar_data)
      }
    } catch (error) {
      console.error('Failed to fetch calendar data')
    } finally {
      setLoading(false)
    }
  }

  // Generate last 30 days
  const getLast30Days = () => {
    const days = []
    for (let i = 29; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      days.push(date.toISOString().split('T')[0])
    }
    return days
  }

  const last30Days = getLast30Days()

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

  return (
    <div className="card">
      <div className="card-body">
        <h6 className="card-title mb-3">Activity Calendar</h6>
        <div className="d-flex flex-wrap gap-1 justify-content-center">
          {last30Days.map(date => {
            const hasActivity = calendarData.some(item => item.date === date)
            return (
              <div
                key={date}
                className={`rounded border ${hasActivity ? 'bg-success' : 'bg-light'}`}
                style={{
                  width: '20px',
                  height: '20px',
                  fontSize: '10px'
                }}
                title={date}
              ></div>
            )
          })}
        </div>
        <div className="mt-3 text-center">
          <small className="text-muted">
            {calendarData.length} completed habits in the last 30 days
          </small>
        </div>
      </div>
    </div>
  )
}

export default SimpleCalendar