import React, { useState, useEffect } from 'react'

function MotivationalQuote() {
  const [quote, setQuote] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchQuote()
  }, [])

  const fetchQuote = async () => {
    setLoading(true)
    try {
      const response = await fetch('http://localhost:5000/api/habits/motivational-quote', {
        credentials: 'include'
      })

      const data = await response.json()

      if (data.success) {
        setQuote(data)
      }
    } catch (error) {
      console.error('Failed to fetch quote')
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

  if (!quote) {
    return null
  }

  return (
    <div className="card bg-light border-0">
      <div className="card-body">
        <h6 className="card-title mb-3">
          <i className="bi bi-stars text-warning me-2"></i>
          Daily Motivation
        </h6>
        <blockquote className="mb-3">
          <p className="fst-italic">"{quote.quote}"</p>
        </blockquote>
        <div className="d-flex justify-content-between align-items-center">
          <small className="text-muted">— {quote.author}</small>
          <button 
            className="btn btn-sm btn-outline-primary"
            onClick={fetchQuote}
            disabled={loading}
          >
            <i className="bi bi-arrow-clockwise"></i>
          </button>
        </div>
        <div className="mt-2">
          <small className="badge bg-secondary">{quote.category}</small>
        </div>
      </div>
    </div>
  )
}

export default MotivationalQuote