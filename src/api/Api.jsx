const currentURL = window.location.hostname;

var isDebug = false;

//if domain is localhost then use local url

if (currentURL === 'localhost') {
    isDebug = true;
}

export const debugUrl = `http://localhost/social/`;
export const ChatApi = isDebug ? `http://localhost:5000/api/` : 'https://chat-social-media-app.vercel.app/api/';
export const SocketApi = isDebug ? `http://localhost:3000` : 'https://socket-chat-social-media-app-wve1.vercel.app/';
const Api = isDebug ? debugUrl : 'https://sbapi.quizhunt.online/';

export default Api;
