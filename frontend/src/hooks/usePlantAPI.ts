
import axios from "axios";

export interface Location{
    name: string;
    id: string;
  }
export interface LocationList{
count: number;
results: [Location];
}

export interface NewLocation{
name: string;
}
const ApiClient = axios.create({
    baseURL: 'http://10.168.1.168:8080',

  });




export default ApiClient