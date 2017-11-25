import { template } from 'lodash/fp';

export const ACCESS_TOKEN_KEY = 'access_token';
export const USER_INFO_KEY = 'user_info';
export const PER_PAGE = 5;
export const USER_TYPE_CUSTOMER = 'Customer';
export const USER_TYPE_ADMIN = 'Admin';
export const USER_TYPE_SUPPORT_REPRESENTATIVE = 'SupportRepresentative';
export const ticketApi = template('/api/tickets/<%= url %>');
