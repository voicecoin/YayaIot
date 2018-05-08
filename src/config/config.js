import Env from './env';

let config = {
	env: Env,
	authURL: 'http://ef443711.ngrok.io',
	baseURL: (Env == 'development' ? `http://localhost:9000` : `http://ef443711.ngrok.io`),
	testAccount: {username: `support@voicecoin.com`, password: (Env == 'development' ? `Voicecoin123` : ``)}
};
export default config;