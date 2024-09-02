import React from 'react'

function toggle({ isDarkMode, toggleMode }) {
  return (
    <div>
       <label className="switch">
      <input type="checkbox" checked={isDarkMode} onChange={toggleMode} />
      <span className="slider round"></span>
    </label>
    </div>
  )
}

export default toggle
