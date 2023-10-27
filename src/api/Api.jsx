const currentURL = window.location.hostname;

var isDebug = false;

//if domain is localhost then use local url

if (currentURL === 'localhost') {
    isDebug = true;
}

export const debugUrl = `http://localhost/social/`;
export const ChatApi = isDebug ? `http://localhost:5000/api/` : 'https://chat-social-media-app-sandesh-subedis-projects.vercel.app/server/api/';
const Api = isDebug ? debugUrl : 'https://sbapi.quizhunt.online/';

export default Api;
