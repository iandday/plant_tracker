import useDataList from "./useDataList";
import React from 'react'

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

const usePlants = () => 
  useDataList<Plant>(
    '/plant'
  )



export default usePlants;