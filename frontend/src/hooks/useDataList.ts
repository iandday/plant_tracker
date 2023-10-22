import { AxiosRequestConfig, CanceledError } from "axios";
import { useState, useEffect } from "react";
import apiClient from "../services/apiClient";



interface FetchResponse <T>{
    count: number;
    results: T[];
}


const useDataList = <T>(endpoint: string, requestConfig?: AxiosRequestConfig, deps?: any[]) => {
    
    const [data, setData] = useState<T[]>([]);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading]  = useState(false);  

    useEffect(() => {

      const controller = new AbortController()
      setIsLoading(true)
      apiClient
        .get<FetchResponse<T>>(endpoint, {signal: controller.signal, ...requestConfig})
        .then((res) => {
          setData(res.data.results);
          setIsLoading(false);
        })
        .catch((err) => {
            if (err instanceof CanceledError) return; 
            setError(err.message);
            setIsLoading(false)
        });
      return () => controller.abort();
    // cant spread an optional array if empty.  if empty, return empty array
    }, deps ? [...deps] : []);

    return {data, error, isLoading};
};

export default useDataList;