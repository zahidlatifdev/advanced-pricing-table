import React from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import PricingEditor from './components/PricingEditor'

function App() {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Pricing Editor</Link>
                        </li>
                    </ul>
                </nav>

                <Routes>
                    <Route path="/" element={<PricingEditor />} />
                </Routes>
            </div>
        </Router>
    )
}

export default App