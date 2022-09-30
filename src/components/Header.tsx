import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "./ProtectedRoute";

interface Props {
	userScore: number;
	round: number;
}

const Header = ({ userScore, round }: Props) => {
	const logout = () => {
		localStorage.clear();
		window.location.reload();
	};

	return (
		<div className="w-full h-16 p-4 bg-violet-600 text-white">
			<nav className=" w-3/4 m-auto flex items-center justify-between text-white  h-full">
				<Link to={"/"}>Home</Link>
				<Link to={"/login"}>Login</Link>
				<button onClick={logout}>Logout</button>
				<Link to={"/dashboard"}>Scoreboard</Link>
				{round > 5 && <span className="">SCORES: {userScore}</span>}
			</nav>
		</div>
	);
};

export default Header;
