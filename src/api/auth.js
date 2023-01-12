import instance from './instance';

function getAuth(id, pw) {
  return instance.put(`/login?id=${id}&pw=${pw}`);
}

const authApi = { getAuth };

export default authApi;
