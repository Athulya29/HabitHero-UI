import React, { useEffect } from 'react'

function SuccessPopup({ data, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 3000)

    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div className="modal fade show d-block" tabIndex="-1" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-0 shadow-lg">
          <div className="modal-body text-center p-5">
            <div className="text-success mb-3">
              <i className="bi bi-emoji-laughing display-1"></i>
            </div>
            <h4 className="text-success mb-3">Well Done! 🎉</h4>
            <p className="fs-5 mb-2">You completed <strong>{data.habitName}</strong></p>
            <p className="text-muted mb-3">
              Current streak: <strong className="text-success">{data.streak} days</strong>
            </p>
            <p className="fw-bold text-primary">Keep going! You're doing amazing! 💪</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SuccessPopup