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
    <div className="sidebar bg-white border-end">
      <nav className="sidebar-nav p-3">
        <ul className="nav nav-pills flex-column">
          {menuItems.map(item => (
            <li key={item.id} className="nav-item mb-2">
              <button
                className={`nav-link w-100 text-start d-flex align-items-center ${currentPage === item.id ? 'active' : ''}`}
                onClick={() => handleMenuClick(item)}
              >
                <i className={`${item.icon} me-3`}></i>
                <span className="fw-medium">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

export default Sidebar