import { useState, useEffect } from "react";
import axios from "axios";

export enum HTTPMethods {
  GET = "get",
  POST = "post",
  PUT = "put",
  DELETE = "delete",
}

interface ApiRequest {
  url: string;
  method: HTTPMethods;
  body?: any;
}

interface ApiResponse {
  data: any;
  error: any;
  loading: boolean;
}

const baseApiUrl = "https://dev.jacobianmatthews.com/api";

export function useApi(request: ApiRequest): ApiResponse {
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>();

  const { method, url, body } = request;

  useEffect(() => {
    setLoading(true);
    axios
      .request({ method, url, baseURL: baseApiUrl, data: body })
      .then((res) => {
        setData(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [method, url, body]);

  return { loading, data, error };
}
