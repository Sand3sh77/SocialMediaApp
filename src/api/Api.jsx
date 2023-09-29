const currentURL = window.location.hostname;

var isDebug = false;

//if domain is localhost then use local url

if (currentURL === 'localhost') {
    isDebug = true;
}

export const debugUrl = `http://localhost/social/`;
const Api = isDebug ? debugUrl : 'https://sbapi.quizhunt.online/';

export default Api;
