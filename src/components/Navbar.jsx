import React from 'react'
import { useNavigate } from 'react-router-dom'

function Navbar({ user, onLogout }) {
  const navigate = useNavigate()

  const handleLogout = () => {
    onLogout()
    navigate('/')
  }

  return (
    <nav className="navbar bg-white border-bottom shadow-sm">
      <div className="container-fluid d-flex justify-content-between align-items-center">

        {/* LEFT SECTION: Logo + Subtitle + Greeting */}
        <div className="d-flex align-items-center">

          {/* Logo */}
          <div
            className="bg-primary rounded-circle d-flex align-items-center justify-content-center me-3"
            style={{ width: "40px", height: "40px" }}
          >
            <i className="bi bi-check2-circle text-white"></i>
          </div>

          {/* HabitHero + Build Habits */}
          <div className="d-flex flex-column">
            <h4 className="mb-0 text-dark fw-bold">HabitHero</h4>
            <p className="mb-0 text-muted small">Build habits daily</p>
          </div>

          {/* Greeting */}
          <div className="ms-4 d-flex flex-column">
            <h6 className="mb-0 text-dark fw-bold">Hi, {user?.name}</h6>
            <small className="text-muted">Let's track your habits daily</small>
          </div>
        </div>

        {/* RIGHT SECTION: Profile */}
        <div className="navbar-nav">
          <div className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle d-flex align-items-center"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
            >
              <span className="me-2 text-dark fw-medium">Profile</span>
              <div
                className="bg-primary rounded-circle d-flex align-items-center justify-content-center"
                style={{ width: "36px", height: "36px" }}
              >
                <i className="bi bi-person-fill text-white"></i>
              </div>
            </a>

            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <button className="dropdown-item" onClick={handleLogout}>
                  <i className="bi bi-box-arrow-right me-2"></i>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </nav>
  )
}

export default Navbar
