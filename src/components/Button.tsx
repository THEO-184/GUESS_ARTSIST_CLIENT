import React from "react";

export interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
	color?: string;
	text: string;
	onClick: (e: React.FormEvent<HTMLButtonElement>) => any;
}

const Button = (props: ButtonProps) => {
	const { color, text, onClick, ...rest } = props;
	return (
		<button
			{...rest}
			className={`w-2/5 p-2 rounded-md ${
				color ? color : "bg-red-400"
			} block text-white`}
			onClick={onClick}
		>
			{text}
		</button>
	);
};

export default Button;
