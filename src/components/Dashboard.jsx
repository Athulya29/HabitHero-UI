import React, { useState, useEffect } from 'react'
import CreateHabit from './CreateHabit'
import TodaysHabits from './TodaysHabits'
import Analytics from './Analytics'
import MotivationalQuote from './MotivationalQuote'
import SimpleCalendar from './SimpleCalendar'

function Dashboard({ user }) {
  const [showCreateHabit, setShowCreateHabit] = useState(false)
  const [refresh, setRefresh] = useState(0)

  const handleHabitCreated = () => {
    setRefresh(prev => prev + 1)
    setShowCreateHabit(false)
  }

  return (
    <div className="container-fluid py-4">
      <div className="row">
        {/* Left Sidebar */}
        <div className="col-lg-3 mb-4">
          <div className="sticky-top" style={{top: '20px'}}>
            <Analytics />
            <div className="mt-4">
              <SimpleCalendar />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="col-lg-6 mb-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2 className="mb-1">Today's Habits</h2>
              <p className="text-muted mb-0">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
            <button 
              className="btn btn-primary"
              onClick={() => setShowCreateHabit(true)}
            >
              <i className="bi bi-plus-circle me-2"></i>
              New Habit
            </button>
          </div>

          <TodaysHabits refresh={refresh} />
        </div>

        {/* Right Sidebar */}
        <div className="col-lg-3 mb-4">
          <div className="sticky-top" style={{top: '20px'}}>
            <MotivationalQuote />
          </div>
        </div>
      </div>

      {/* Create Habit Modal */}
      {showCreateHabit && (
        <CreateHabit 
          onHabitCreated={handleHabitCreated}
          onClose={() => setShowCreateHabit(false)}
        />
      )}
    </div>
  )
}

export default Dashboard