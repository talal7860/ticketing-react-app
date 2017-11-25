import localforage from 'localforage';
import { ACCESS_TOKEN_KEY } from 'consts/AppConstant';

export const postRequest = (url, payload = {}) => {
	const options = {
		method: 'POST',
		body: JSON.stringify(payload)
	};
	return performRequest(url, options);
};

export const deleteRequest = (url) => {
	const options = {
		method: 'DELETE',
	};
	return performRequest(url, options);
};

export const getRequest = (url, payload = {}) => {
	const options = {
		method: 'GET'
	};
	if (payload['perPage']) {
		payload['per_page'] = payload['perPage'];
		delete payload.perPage;
	}
	const urlParamStr = convertJsonToUrlParams(payload);
	let urlStr = url;
	if (urlParamStr) {
		urlStr = `${url}?${urlParamStr}`;
	}
	return performRequest(urlStr, options);
};

const authenticateRequest = (headers) => {
	return new Promise((resolve, reject) => {
		return localforage.getItem(ACCESS_TOKEN_KEY)
			.then((value) => {
				if (value) {
					headers['Authorization'] = value;
				}
				resolve();
			})
			.catch(reject);
	});
};

const performRequest = (url, options) => {
	return new Promise((resolve, reject) => {
		let headers = {};
		options['mode'] = 'cors';
		options['cache'] = 'default';
		return authenticateRequest(headers)
			.then(() => {
				options['headers'] = getHeaders(headers);
				return fetch(url, options);
			})
			.then((res) => res.json())
      .then(response => {
        if (response.error) {
          reject(response.error);
        } else if (response.meta.code >= 400) {
          reject(response.meta.message);
        } else {
          resolve(response);
        }
      })
			.catch((res) => reject(res));
	});
};

const getHeaders = (headers = {}) => {
	const myHeader = new Headers();
	myHeader.append('Content-Type', 'application/json');
	myHeader.append('Accept', 'application/json, text/plain, */*');
	Object.keys(headers).forEach((key) => {
		myHeader.append(key, headers[key]);
	});
	return myHeader;
};

const convertJsonToUrlParams = (object) => {
	let urlParam = '';
	Object.keys(object).forEach((key) => {
		urlParam += `${key}=${object[key]}&`;
	});
	return urlParam.substr(0, urlParam.length -1);
};
