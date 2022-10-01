import React from "react";
import { Link } from "react-router-dom";
import InputElement from "./InputElement";
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

	const handleUserNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value);
		console.log("name", e.target.value);
	};
	const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	return (
		<form className="w-11/12 sm:w-1/2 h-96 bg-violet-600  text-white m-auto flex items-center justify-center flex-col text-left">
			<h3>{loading && "loading..."}</h3>
			<h3>{title}</h3>

			<InputElement
				onChange={handleUserNameInput}
				title={"User Name"}
				value={username}
			/>
			<InputElement
				onChange={handlePasswordInput}
				title={"Password"}
				value={password}
			/>

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
