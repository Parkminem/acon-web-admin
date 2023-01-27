import instance from '@/api/instance';

function fetchContentsList(page, count) {
  return instance.get(`/contents/list?nowpage=${page}&listpage=${count}`);
}

const contentsApi = { fetchContentsList };

export default contentsApi;
