import React from "react";
import { Link } from "react-router-dom";
interface Props {
	username: string;
	password: string;
	loading: boolean;
	title: string;
	setName: React.Dispatch<React.SetStateAction<string>>;
	setPassword: React.Dispatch<React.SetStateAction<string>>;
	onSubmit: (e: React.FormEvent<HTMLButtonElement>) => Promise<void>;
}

const Form = (props: Props) => {
	const { username, password, setName, setPassword, onSubmit, loading, title } =
		props;

	return (
		<form className="w-1/2 h-96 bg-violet-600  text-white m-auto flex items-center justify-center flex-col text-left">
			<h3>{loading && "loading..."}</h3>
			<h3>{title}</h3>
			<label htmlFor="username" className="my-2">
				<span>User Name</span>
				<input
					type="text"
					placeholder="username"
					value={username}
					onChange={(e) => setName(e.target.value)}
					name="username"
					className="w-11/12 h-9 p-2 my-2 text-slate-700"
				/>
			</label>
			<label htmlFor="password" className="my-2">
				<span>Password</span>
				<input
					type="text"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder="password"
					name="password"
					className="w-11/12 h-9 p-2 my-2 text-slate-700"
				/>
			</label>
			<button onClick={onSubmit} className="text-white text-lg m-2">
				{window.location.pathname === "/login" ? "Login" : "sign up"}
			</button>

			<p>
				{window.location.pathname === "/login" ? (
					<span>
						Don't have an account?{" "}
						<Link to={"/signup"} className="text-gray-900 underline">
							Sign up
						</Link>{" "}
					</span>
				) : (
					<span>
						Already a user?{" "}
						<Link to={"/login"} className="text-gray-900 underline">
							Login
						</Link>{" "}
					</span>
				)}
			</p>
		</form>
	);
};

export default Form;
