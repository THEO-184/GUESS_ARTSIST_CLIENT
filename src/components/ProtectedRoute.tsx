import React, { useState, useEffect, useContext, createContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { User } from "../utils/Interfaces";

interface ContextValues {
	user: Omit<User, "updatedAt"> | null;
	setUser: React.Dispatch<React.SetStateAction<Omit<User, "updatedAt"> | null>>;
}
const authContext = createContext<ContextValues | null>(null);

const ProtectedRoute = () => {
	const userDetails = localStorage.getItem("userDetails");
	const [user, setUser] = useState(() =>
		userDetails ? (JSON.parse(userDetails) as Omit<User, "updatedAt">) : null
	);

	return (
		<authContext.Provider value={{ user, setUser }}>
			{user ? <Outlet /> : <Navigate to={"/login"} />}
		</authContext.Provider>
	);
};

export const useAuthContext = () => useContext(authContext);

export default ProtectedRoute;
