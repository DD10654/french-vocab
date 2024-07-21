import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './home';
import Setup from './setup';
import Play from './play';
import Done from './done';

const App = () => {
    return (
    <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/setup" element={<Setup />} />
          <Route path="/play" element={<Play />} />
          <Route path="/done" element={<Done />} />
        </Routes>
    </BrowserRouter>
    )
}

export default App