import localforage from 'localforage';
import { ACCESS_TOKEN_KEY, USER_INFO_KEY, USER_TYPE_CUSTOMER } from 'consts/AppConstant';
import { deleteRequest } from './HttpUtil';

export const isLoggedIn = () =>
	new Promise((resolve, reject) =>
		localforage.getItem(ACCESS_TOKEN_KEY)
			.then((value) => {
				if (value) {
					resolve();
				} else {
					reject();
				}
			})
    .catch(reject)
	);

export const getUserInfo = () =>
	new Promise((resolve, reject) => {
		isLoggedIn()
			.then(() =>
				localforage.getItem(USER_INFO_KEY)
			)
			.then((value) => {
				if (value) {
					resolve(value);
				} else {
					reject();
				}
			})
			.catch(reject);
	});

export const isCustomer = () =>
	new Promise((resolve, reject) => {
		getUserInfo()
			.then((user) => {
				if (user.type === USER_TYPE_CUSTOMER) {
					resolve(true);
				} else {
					reject();
				}
			})
			.catch(reject);
	});

export const logout = () => {
  return deleteRequest('/api/sessions')
    .then(() => localforage.setItem(ACCESS_TOKEN_KEY, null))
		.then(() => localforage.setItem(USER_INFO_KEY, null));
};
