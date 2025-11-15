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
        <div className="card-body text-center py-3">
          <div className="spinner-border spinner-border-sm text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    )
  }

  if (!quote) return null

  return (
    <div className="card quote-card">
      <div className="card-body">
        <div className="row align-items-center">
          <div className="col-md-10">
            <blockquote className="mb-0">
              <p className="fst-italic mb-1">"{quote.quote}"</p>
              <footer className="blockquote-footer mt-1">
                {quote.author} • <cite title="Source Title">{quote.category}</cite>
              </footer>
            </blockquote>
          </div>
          <div className="col-md-2 text-end">
            <button 
              className="btn btn-sm btn-outline-primary"
              onClick={fetchQuote}
              disabled={loading}
            >
              <i className="bi bi-arrow-clockwise"></i> New Quote
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MotivationalQuote