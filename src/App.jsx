import React from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import PricingEditor from './components/PricingEditor'
import ImprovedCustomEditor from './components/Edit'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PricingEditor />} />
        <Route path="/edit" element={<ImprovedCustomEditor />} />
      </Routes>
    </Router>
  )
}

export default App