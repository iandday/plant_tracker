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







export interface IDList{id: string}

axios.defaults.baseURL= 'http://10.168.1.168:8080'

const usePlantAPI = <T> (axiosParams: AxiosRequestConfig, deps: any[]=[]) => {
    
  const [response, setResponse] = useState<T>();
  const [responseCode, setResponseCode] = useState<number>()
  const [error, setError] = useState<AxiosError>();
  const [loading, setLoading] = useState(axiosParams.method === "GET" || axiosParams.method === "get");

  const fetchData = async (params: AxiosRequestConfig) => {
    try {
      const result:AxiosResponse = await axios.request(params);
      setResponse(result.data);
      setResponseCode(result.status);
    } catch( err: any ) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const sendData = async () => {
    fetchData(axiosParams);
  }

  useEffect(() => {
    if(axiosParams.method === "GET" || axiosParams.method === "get"){
      fetchData(axiosParams);
    }
  },deps);

  return { response, responseCode, error, loading, sendData };
};


export default usePlantAPI;