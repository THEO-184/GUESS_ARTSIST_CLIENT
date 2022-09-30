import { AlbumReturnType } from "../utils/Interfaces";
import axios from "axios";

//  https://guess-artist.onrender.com
const BASE_URL = "http://localhost:5000/api/v1";

const tokenString = localStorage.getItem("token")!;

const token = tokenString || null;

export const api = axios.create({
	baseURL: BASE_URL,
	withCredentials: true,
	headers: {
		authorization: `Bearer ${token}`,
	},
});

export const getArtistAlbums = async (
	artist: string,
	country = "US",
	media = "music",
	entity = "album",
	limit = 3
): Promise<AlbumReturnType | undefined> => {
	console.log("artist name", artist);
	try {
		const res = await fetch(
			`https://itunes.apple.com/search?term=${artist}&country=${country}&media=${media}&entity=${entity}&limit=${limit}`
		);
		const data = await res.json();
		return data;
	} catch (error) {
		console.log(error);
	}
};

export default api;
