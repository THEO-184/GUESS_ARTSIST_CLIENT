import React, { useEffect, useState } from "react";
import api from "../apis/ArtistApi";
import { UsersScores } from "../utils/Interfaces";

const Dashboard = () => {
	const [count, setCount] = useState(0);
	const [users, setUsers] = useState<UsersScores["scores"]>([]);

	const getUsersScores = async () => {
		const res = await api.get<UsersScores>("/game/users/scores");
		if (res.data) {
			console.log("scores", res.data);
			setUsers(res.data.scores);
			setCount(res.data.count);
		}
	};

	useEffect(() => {
		getUsersScores();
	}, []);

	return (
		<table className="w-1/2  bg-slate-200  text-slate-800 m-auto  mx-auto">
			<thead className="w-full h-full bg-white mb-24 ">
				<tr>
					<th>Name</th>
					<th>Scores</th>
					<th>Date Completed</th>
				</tr>
			</thead>
			<tbody>
				{users.map((user) => {
					const date = new Date(user.updatedAt).toLocaleDateString();
					return (
						<tr className="w-full h-full bg-white border-b-2 border-slate-50 p-2 my-4">
							<td>{user.username}</td>
							<td>{user.scores}</td>
							<td>{date}</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
};

export default Dashboard;
