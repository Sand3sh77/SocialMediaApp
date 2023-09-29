
// let Api = "http://localhost/social/";

// export default Api;

const currentURL = window.location.hostname;

var isDebug = false;

// export const baseUrl = `http://quizhunt.ap-south-1.elasticbeanstalk.com/`;
//if domain is localhost then use local url

console.log(currentURL);
if (currentURL === 'localhost') {
    isDebug = true;
}

export const debugUrl = `http://localhost/social/`;
const Api = isDebug ? debugUrl : 'https://sbapi.quizhunt.online/';

export default Api;

// export const imgUrl = ``;