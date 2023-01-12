import instance from './instance';

<<<<<<< HEAD
function getAuth(id, pw) {
  return instance.put(`/login?id=${id}&pw=${pw}`);
}

const authApi = { getAuth };
=======
const authApi = {};
>>>>>>> history

export default authApi;
