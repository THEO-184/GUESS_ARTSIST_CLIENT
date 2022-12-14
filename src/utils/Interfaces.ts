export type AddToState = (data: GameResponse) => void;

export interface AlbumReturnType {
	resultCount: Number;
	results: {
		collectionName: string;
		artworkUrl60: string;
		artworkUrl100: string;
		artistName: string;
	}[];
}

export interface User {
	_id: string;
	username: string;
	scores: number;
	updatedAt: string;
	random_number: number;
	round: number;
}

export interface Album {
	artistName: string;
	collectionName: string;
	artworkUrl60: string;
	artworkUrl100: string;
	_id: string;
}

export interface GameResponse {
	user: Omit<User, "random_number" | "updatedAt">;
	attemptNumber: number;
	albums: Album;
	msg: string;
}

export interface RequestBody {
	attemptNumber: number;
	scores: number;
	round?: number;
}

export interface UsersScores {
	count: number;
	scores: User[];
}
export interface FormRequestBody {
	username: string;
	password: string;
}
