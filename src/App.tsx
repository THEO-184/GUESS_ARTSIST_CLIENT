import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./views/Home";
import Dashboard from "./views/Dashboard";
import Login from "./views/Auth/Login";
import SignUp from "./views/Auth/SignUp";
import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
	const [userScore, setUserScore] = useState(0);
	const [round, setRound] = useState(0);
	console.log("score app", userScore);
	return (
		<BrowserRouter>
			<Header userScore={userScore} round={round} />
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route path="/Signup" element={<SignUp />} />
				<Route element={<ProtectedRoute />}>
					<Route
						path="/"
						element={<Home setUserScore={setUserScore} setRound={setRound} />}
					/>
					<Route path="/dashboard" element={<Dashboard />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
