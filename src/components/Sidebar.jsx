import React from 'react'
import { useNavigate } from 'react-router-dom'

function Sidebar({ currentPage, onPageChange }) {
  const navigate = useNavigate()

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'bi-speedometer2', path: '/dashboard' },
    { id: 'add-habit', label: 'Add Habit', icon: 'bi-plus-circle', path: '/add-habit' },
    { id: 'total-habits', label: 'Total Habits', icon: 'bi-list-check', path: '/total-habits' },
    { id: 'analytics', label: 'Analytics', icon: 'bi-graph-up', path: '/analytics' }
  ]

  const handleMenuClick = (item) => {
    onPageChange(item.id)
    navigate(item.path)
  }

  return (
    <div className="sidebar bg-white shadow-sm">
      <div className="sidebar-header p-3 border-bottom">
        <h5 className="mb-0 text-primary">
          <i className="bi bi-star-fill me-2"></i>
          HabitHero
        </h5>
      </div>
      <nav className="sidebar-nav p-3">
        <ul className="nav nav-pills flex-column">
          {menuItems.map(item => (
            <li key={item.id} className="nav-item mb-2">
              <button
                className={`nav-link w-100 text-start ${currentPage === item.id ? 'active' : ''}`}
                onClick={() => handleMenuClick(item)}
              >
                <i className={`${item.icon} me-2`}></i>
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

export default Sidebar