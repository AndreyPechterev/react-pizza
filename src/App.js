import { Route, Routes } from "react-router-dom";
import { Header } from "./components";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import React from "react";

function App() {
    return (
        <div className="App">
            <div className="wrapper">
                <Header />
                <Routes>
                    <Route path="/react-pizza" element={<Home />} />
                    <Route path="/cart" element={<Cart />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
