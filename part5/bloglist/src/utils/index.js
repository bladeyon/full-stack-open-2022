const getToken = () => JSON.parse(localStorage.getItem('user_info')).token;
export default getToken;
