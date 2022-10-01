import React from "react";

interface Props {
	value: string;
	title: string;
	onChange(e: React.ChangeEvent<HTMLInputElement>): void;
}

const InputElement = ({ value, onChange, title }: Props) => {
	return (
		<label
			htmlFor="password"
			className="my-2 flex flex-col  justify-center sm:w-1/2"
		>
			<span>{title}</span>
			<input
				type="text"
				value={value}
				onChange={onChange}
				placeholder={value}
				name={value}
				className="w-[200px] sm:w-full h-9 p-2 my-2 text-slate-700"
			/>
		</label>
	);
};

export default InputElement;
