import useData from "./useData.ts";
import {Plant} from "./usePlants.ts"



const usePlantDetail = (id: string) => 
  useData<Plant>(
    `/plant/${id}`
  )



export default usePlantDetail;