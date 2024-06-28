import React from 'react';
import {BrowserRouter as Router,Routes, Route} from 'react-router-dom';
import Main from './page/main/main';
import Sub from './page/sub/sub';
import Write from './page/write/write';

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
