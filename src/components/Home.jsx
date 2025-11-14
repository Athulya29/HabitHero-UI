import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="container-fluid vh-100 bg-primary">
      <div className="row h-100 align-items-center">
        <div className="col-lg-6 text-white p-5">
          <div className="ms-5">
            <h1 className="display-3 fw-bold mb-4">
              <i className="bi bi-star-fill me-3"></i>
              HabitHero
            </h1>
            <p className="lead mb-4 fs-4">
              Build better habits, track your progress, and transform your life one day at a time.
            </p>
            <p className="mb-5 fs-5">
              Join thousands of users who are achieving their goals with our simple and effective habit tracking system.
            </p>
            <div className="d-grid gap-3 d-md-flex justify-content-md-start">
              <Link to="/register" className="btn btn-light btn-lg px-4 me-md-2 fw-bold">
                Get Started Free
              </Link>
              <Link to="/login" className="btn btn-outline-light btn-lg px-4">
                Sign In
              </Link>
            </div>
          </div>
        </div>
        <div className="col-lg-6 d-none d-lg-block">
          <div className="p-5">
            <div className="row g-4">
              <div className="col-6">
                <div className="card border-0 shadow-lg h-100">
                  <div className="card-body text-center p-4">
                    <div className="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                         style={{width: '80px', height: '80px'}}>
                      <i className="bi bi-plus-circle text-white fs-2"></i>
                    </div>
                    <h5 className="fw-bold">Create Habits</h5>
                    <p className="text-muted">Define your goals and build consistent routines</p>
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="card border-0 shadow-lg h-100 mt-4">
                  <div className="card-body text-center p-4">
                    <div className="bg-success rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                         style={{width: '80px', height: '80px'}}>
                      <i className="bi bi-bar-chart text-white fs-2"></i>
                    </div>
                    <h5 className="fw-bold">Track Progress</h5>
                    <p className="text-muted">Monitor streaks and see your improvement</p>
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="card border-0 shadow-lg h-100">
                  <div className="card-body text-center p-4">
                    <div className="bg-warning rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                         style={{width: '80px', height: '80px'}}>
                      <i className="bi bi-trophy text-white fs-2"></i>
                    </div>
                    <h5 className="fw-bold">Achieve Goals</h5>
                    <p className="text-muted">Celebrate milestones and stay motivated</p>
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="card border-0 shadow-lg h-100 mt-4">
                  <div className="card-body text-center p-4">
                    <div className="bg-info rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                         style={{width: '80px', height: '80px'}}>
                      <i className="bi bi-graph-up text-white fs-2"></i>
                    </div>
                    <h5 className="fw-bold">View Analytics</h5>
                    <p className="text-muted">Get insights into your habit patterns</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home