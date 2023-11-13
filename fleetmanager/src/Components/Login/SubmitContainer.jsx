import React from 'react'

const SubmitContainer = () => {
  return (
    <div>
        <div className="submit-container">
            <button className="submit" onClick={handleLogin} >
              {action}
            </button>
        </div>
    </div>
  )
}

export default SubmitContainer
