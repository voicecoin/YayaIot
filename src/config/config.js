import Env from './env';

let config = {
	env: Env,
	authURL: 'https://www.voicebot.pro',
	baseURL: (Env == 'development' ? `https://www.voicebot.pro` : `https://www.voicebot.pro`),
	testAccount: {username: `support@voicecoin.com`, password: (Env == 'development' ? `Voicecoin123` : ``)}
};
export default config;