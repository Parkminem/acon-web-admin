import instance from '@/api/instance';

function getAuth(id, pw) {
  return instance.put(`/login?id=${id}&pw=${pw}`);
}

/**
 * 토큰 만료 인증
 */
function tokenAuth() {
  return instance.put(`check/token`);
}

const authApi = { getAuth, tokenAuth };

export default authApi;
