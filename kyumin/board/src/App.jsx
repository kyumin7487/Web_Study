import React from 'react';
import {BrowserRouter as Router,Routes, Route} from 'react-router-dom';
import Main from './pages/main/main';
import Sub from './pages/sub/sub';
import Write from './pages/write/write'

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/sub/:idx" element={<Sub />} />
                <Route path="/write" element={<Write />} />
            </Routes>
        </Router>
    );
};

export default App;
