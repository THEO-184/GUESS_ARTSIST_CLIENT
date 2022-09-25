import React from "react";
import { useNavigate } from "react-router-dom";
import { Auth0Provider, AppState } from "@auth0/auth0-react";

const Auth0ProviderWithHistory = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const domain = import.meta.env.VITE_AUTH0_DOMAIN!;
	const clientId = import.meta.env.VITE_AUTH0_CLIENTID!;

	const navigate = useNavigate();

	const onRedirectCallBack = (appState: AppState | undefined) => {
		navigate(appState?.returnTo || window.location.pathname);
	};
	return (
		<Auth0Provider
			domain={domain}
			clientId={clientId}
			redirectUri={window.location.origin}
			onRedirectCallback={onRedirectCallBack}
		>
			{children}
		</Auth0Provider>
	);
};

export default Auth0ProviderWithHistory;
