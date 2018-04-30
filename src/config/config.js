import Env from './env';

let config = {
	env: Env,
	authURL: 'http://localhost:8888',
	baseURL: (Env == 'development' ? `http://localhost:9000` : `http://voicecoin.com`),
	testAccount: {username: (Env == 'development' ? `support@voicecoin.com` : ``), password: (Env == 'development' ? `Voicebot123` : ``)}
};
export default config;