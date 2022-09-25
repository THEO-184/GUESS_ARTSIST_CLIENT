import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AxiosResponse } from "axios";

import api from "../../apis/ArtistApi";
import Form from "../../components/Form";
import { FormRequestBody, User } from "../../utils/Interfaces";

const SignUp = () => {
	const navigate = useNavigate();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
		e.preventDefault();
		setLoading(true);
		try {
			const res = await api.post<
				{ user: User; token: string },
				AxiosResponse<{ user: User; token: string }>,
				FormRequestBody
			>("/auth/register", { username, password });

			if (res.data) {
				setLoading(false);
				navigate("/login");
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="h-screen flex items-center justify-center flex-col">
			<Form
				title="Sign Up"
				username={username}
				password={password}
				loading={loading}
				setName={setUsername}
				setPassword={setPassword}
				onSubmit={handleSubmit}
			/>
		</div>
	);
};

export default SignUp;
