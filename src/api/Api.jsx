const currentURL = window.location.hostname;

var isDebug = false;

//if domain is localhost then use local url

console.log(currentURL);
if (currentURL === 'localhost') {
    isDebug = true;
}

export const debugUrl = `https://localhost/social/`;
const Api = isDebug ? debugUrl : 'https://sbapi.quizhunt.online/';

export default Api;
