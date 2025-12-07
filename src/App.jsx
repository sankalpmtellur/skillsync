import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Explore from "./pages/Explore";

function App() {
    return (
        <Router
            future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
        >
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/explore" element={<Explore />} />
            </Routes>
        </Router>
    );
}

export default App;