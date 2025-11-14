import React from 'react'

function Dashboard({ user }) {
  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="card border-0 shadow rounded-3">
            <div className="card-body p-4 p-md-5">
              <div className="text-center mb-5">
                <h1 className="display-5 fw-bold text-primary mb-3">
                  Welcome back, {user?.name}! 🎉
                </h1>
                <p className="lead text-muted">
                  Ready to continue your journey towards better habits?
                </p>
              </div>

              <div className="row g-4">
                <div className="col-md-6">
                  <div className="card border-0 bg-light h-100">
                    <div className="card-body text-center p-4">
                      <div className="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                           style={{width: '80px', height: '80px'}}>
                        <i className="bi bi-plus-circle text-white fs-2"></i>
                      </div>
                      <h5 className="fw-bold">Create Habits</h5>
                      <p className="text-muted">Start tracking new habits and build consistent routines</p>
                    </div>
                  </div>
                </div>
                
                <div className="col-md-6">
                  <div className="card border-0 bg-light h-100">
                    <div className="card-body text-center p-4">
                      <div className="bg-success rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                           style={{width: '80px', height: '80px'}}>
                        <i className="bi bi-bar-chart text-white fs-2"></i>
                      </div>
                      <h5 className="fw-bold">Track Progress</h5>
                      <p className="text-muted">Monitor your streaks and see your improvement over time</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-4 border-top">
                <h4 className="fw-bold mb-4">Your Profile</h4>
                <div className="row">
                  <div className="col-md-6">
                    <div className="d-flex align-items-center mb-3 p-3 bg-light rounded">
                      <i className="bi bi-person text-primary me-3 fs-5"></i>
                      <div>
                        <small className="text-muted">Name</small>
                        <div className="fw-semibold">{user?.name}</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="d-flex align-items-center mb-3 p-3 bg-light rounded">
                      <i className="bi bi-envelope text-primary me-3 fs-5"></i>
                      <div>
                        <small className="text-muted">Email</small>
                        <div className="fw-semibold">{user?.email}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 text-center">
                <p className="text-muted">
                  More features coming soon! Stay tuned for habit creation, tracking, and analytics.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard