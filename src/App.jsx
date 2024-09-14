import React from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import PricingEditor from './pages/PricingEditor'

function App() {
    return (
        <Router>
                <Routes>
                    <Route path="/" element={<PricingEditor />} />
                </Routes>
        </Router>
    )
}

export default App