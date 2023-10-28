import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { useEffect, useState } from "react";


export interface Plant {
  name: string;
  photo_url: string;
  location: string;
  common_name: string;
  scientific_name: string;
  purchase_date: string;
  sources: { name: string; url: string; id: string; }[];
  trefle_id: number;
  id: string;
}

export interface PlantList {
  count: number,
  results: [Plant]
}


axios.defaults.baseURL= 'http://10.168.1.173:8080'

const usePlantAPI = <T> (axiosParams: AxiosRequestConfig, deps?: any[]) => {
    
  const [response, setResponse] = useState<T>();
  const [error, setError] = useState<AxiosError>();
  const [loading, setLoading] = useState(axiosParams.method === "GET" || axiosParams.method === "get");

  const fetchData = async (params: AxiosRequestConfig) => {
    try {
      const result:AxiosResponse = await axios.request(params);
      setResponse(result.data);
      console.log(result.data)
    } catch( err: any ) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const sendData = () => {
    fetchData(axiosParams);
  }

  useEffect(() => {
    if(axiosParams.method === "GET" || axiosParams.method === "get"){
      fetchData(axiosParams);
    }
  },deps);

  return { response, error, loading, sendData };
};


export default usePlantAPI;