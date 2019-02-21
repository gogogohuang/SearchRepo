import { API_URL } from '../common/constant';

export const createURL = (type, request_payload) => {
  let para = '';

  for (let key in request_payload) {
    para += `&${key}=${request_payload[key]}`;
  }
  
  const requestPath = `${API_URL}/${type}?${para}`;
  return requestPath;
}