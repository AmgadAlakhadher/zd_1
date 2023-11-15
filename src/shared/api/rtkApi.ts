import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';


const baseQuery = fetchBaseQuery({
  baseUrl:  'http:localhost:8080',
  credentials: 'include',
  prepareHeaders: headers => {
    headers.set('Content-Type', 'application/json');
    headers.set('Accept', 'application/json, text/plain, */*');
    return headers;
  },
});
const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
  if (result.error) {
    localStorage.clear();
  }

  return result;
};

export const rtkApi = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: builder => ({
    getPosts: builder.query({
      query: () => '/any',
      transformResponse: (response: any) => response.data,
    }),
  }),
  reducerPath: 'rtkApi',
});
