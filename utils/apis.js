import axios from 'axios';
import { throttleAdapterEnhancer } from 'axios-extensions';
import { API_URL } from '../common/constant';
import { REPO } from '../common/constant';

const THRESHOLD_MS = 50 * 1000; // current sync interval is 60s

export const apiClientFactory = (defaultConfig) => {

  const client = axios.create({
    headers: {
      ...defaultConfig.headers,
    },
    adapter: throttleAdapterEnhancer(axios.defaults.adapter, { threshold: THRESHOLD_MS }),
    ...defaultConfig,
  });

  client.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      return Promise.reject(error);
    }
  );

  return client;
}

export const getAPIClient = (type, request_payload) => {
  let para = '';

  for (let key in request_payload) {
    para += `&${key}=${request_payload[key]}`;
  }
  const requestPath = `${API_URL}/${type}?${para}`;

  return apiClientFactory({ baseURL: requestPath });
}


export const getGithubRepo = (searchPattern) => {
  const getClient = getAPIClient(REPO, {
    q: searchPattern,
    sort: 'updated',
    per_page: 100,
    page: 1
  });
  return getClient.get();
}
