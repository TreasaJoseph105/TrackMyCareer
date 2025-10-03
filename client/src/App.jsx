
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes.jsx';
import Sidebar from './components/Sidebar.jsx';

export default function App() {
    return (
        <Router>
            <div style={{ display: 'flex' }}>
                <Sidebar />
                <div style={{ flex: 1, padding: '20px' }}>
                    <AppRoutes />
                </div>
            </div>
        </Router>
    );
}

