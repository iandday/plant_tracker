import { Button, Grid, Input, Typography } from '@mui/material';
import { useState } from 'react';
import { BulkApi, BulkPlantCreateResponse } from '../services';
import { Controller, useForm } from 'react-hook-form';
import { BASE_PATH } from '../services/base';
import axiosInstance from '../provider/CustomAxios';
//import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const NewPlantBulk = () => {
  //const navigate = useNavigate();

  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<BulkPlantCreateResponse>();
  const bulkAPI = new BulkApi(undefined, BASE_PATH, axiosInstance);

  interface BulkFormIn {
    file: File;
  }
  const {
    //register: newRegister,
    handleSubmit: newHandleSubmit,
    //reset: newReset,
    control: newControl,
    setValue: newSetValue
  } = useForm<BulkFormIn>();

  const newOnSubmit = async (data: BulkFormIn) => {
    try {
      const response = await bulkAPI.trackerApiViewBulkBulkCreatePlant(data.file);
      if (response.status === 200) {
        setResults(response.data);
        setShowResults(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Helmet>
        <title>{import.meta.env.VITE_APP_NAME + ' | New Plant'}</title>
      </Helmet>

      {!showResults ? (
        <>
          <Grid container justifyContent="space-between" style={{ marginBottom: 1 }}>
            <Grid item xs={12}>
              <Typography variant="h4" align="center">
                Bulk Plant Creation
              </Typography>
              <Typography>
                CSV input file must have the following columns: "name", "common_name", "scientific_name",
                "purchase_date", "area", and "notes". The date must be in YYYYMMDD format, 20240401 for April 1st, 2024.
              </Typography>
            </Grid>
          </Grid>

          <Grid item xs={12} alignItems="center">
            <form onSubmit={newHandleSubmit(newOnSubmit)}>
              <Grid container>
                <Grid item xs={12} justifyContent="flex-start">
                  <Controller
                    control={newControl}
                    name="file"
                    rules={{ required: false }}
                    render={({ field: { value, onChange, ...field } }) => {
                      return (
                        <Input
                          {...field}
                          onChange={(event) => {
                            let file = (event.target as HTMLInputElement)!.files![0];
                            onChange(file);
                            newSetValue('file', file);
                          }}
                          type="file"
                          id="file"
                        />
                      );
                    }}
                  />
                  <Button type="submit" variant="contained">
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </>
      ) : (
        <>
          <Typography>Results</Typography>
          <Typography>{JSON.stringify(results)}</Typography>
        </>
      )}
    </>
  );
};

export default NewPlantBulk;
