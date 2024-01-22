import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
/* 
endpoints:
  ANY - https://16n5ht1dx0.execute-api.us-east-1.amazonaws.com/products
  POST - https://16n5ht1dx0.execute-api.us-east-1.amazonaws.com/product
  GET - https://16n5ht1dx0.execute-api.us-east-1.amazonaws.com/product/{id}
  DELETE - https://16n5ht1dx0.execute-api.us-east-1.amazonaws.com/product/{id}
  POST - https://16n5ht1dx0.execute-api.us-east-1.amazonaws.com/comment/{id}
  GET - https://16n5ht1dx0.execute-api.us-east-1.amazonaws.com/comment/{id}
  POST - https://16n5ht1dx0.execute-api.us-east-1.amazonaws.com/user
  GET - https://16n5ht1dx0.execute-api.us-east-1.amazonaws.com/user/{email}
  GET - https://16n5ht1dx0.execute-api.us-east-1.amazonaws.com/
*/
export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
  tagTypes: ['comments'],
  endpoints: () => ({}),
});
