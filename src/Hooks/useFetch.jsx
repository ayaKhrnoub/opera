import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import baseURL from "../Constant/URL";
import { useAuthContext } from "../Context/AuthContext";

const useFetch = (url) => {
  const { token } = useAuthContext();
  const [fetchedData, setFetchedData] = useState({
    data: [],
    isLoading: true,
    error: false,
    errorMessage: "",
  });
  const cancelTokenSource = axios.CancelToken.source();
  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(`${baseURL}${url}`, {
        cancelToken: cancelTokenSource.token,
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.data;
      if (data) {
        setFetchedData({
          data: data.results ? data.results : data,
          isLoading: false,
          error: false,
          errorMessage: "",
        });
      }
    } catch (e) {
      setFetchedData({
        data: [],
        isLoading: false,
        error: true,
        errorMessage: e,
      });
    }
  }, [url]);

  useEffect(() => {
    setFetchedData({
      data: [],
      isLoading: true,
      error: false,
      errorMessage: "",
    });
    fetchData();
    return () => cancelTokenSource.cancel();
  }, [url]);
  const { data, isLoading, error, errorMessage } = fetchedData;
  return { data, isLoading, error, errorMessage };
};

export default useFetch;
