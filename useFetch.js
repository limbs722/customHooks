import { useEffect, useState } from 'react';
import { HttpUtil, Util } from '../utils';

const getApi = (url, method, params, type) => {
  let body = {
    url: url,
    method: method,
  };
  let data = {};

  if (type === 'stringify') {
    body = {
      ...body,
      headers: {
        contentType: 'application/json; charset=utf-8',
      },
    };
    data = { data: JSON.stringify(params) };
  }
  if (type === 'normal') {
    data = { params: params };
  }

  return axios({ ...body, ...data })
    .then((res) => res)
    .catch((err) => err.response);
};

const useFetch = (params) => {
  const [requestParams, setRequestParams] = useState(params);
  const [response, setResponse] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const res = await getApi(requestParams);
      setIsFetching(false);
      setIsLoading(false);
      const { data } = res;

      if (!data) return;

      setResponse(data);
    };
    getData();
  }, [requestParams]);

  return { response };
};

export default useFetch;
