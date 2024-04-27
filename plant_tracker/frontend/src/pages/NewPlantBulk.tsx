import { Button, Grid, Input, Typography } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useEffect, useState } from 'react';
import { AreaApi, AreaOut, BulkApi, BulkPlantCreateResponse } from '../services';
import { Controller, useForm } from 'react-hook-form';
import { BASE_PATH } from '../services/base';
import axiosInstance from '../provider/CustomAxios';
//import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import PlantListing from '../components/PlantListing';

const NewPlantBulk = () => {
  //const navigate = useNavigate();

  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<BulkPlantCreateResponse>();
  const bulkAPI = new BulkApi(undefined, BASE_PATH, axiosInstance);
  const areaApi = new AreaApi(undefined, BASE_PATH, axiosInstance);
  const [areaData, setAreaData] = useState<AreaOut[]>();

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
        const areaResponse = await areaApi.trackerApiViewAreaListAreas();
        if (areaResponse.status === 200) {
          setAreaData(areaResponse.data);
        }
        setResults(response.data);
      }
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    const showResultsEffect = async () => {
      results ? setShowResults(true) : null;
    };
    console.log(results?.errors);
    showResultsEffect();
  }, [results]);

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
          {results?.created && areaData ? (
            <>
              <Typography variant="h5" align="center">
                Created Plants
              </Typography>
              <PlantListing plants={results.created!} areas={areaData!} />
            </>
          ) : null}
          {results?.errors ? (
            <>
              <Typography variant="h5" align="center">
                Import Errors
              </Typography>

              <List>
                {Object.entries(results?.errors).map(([name, value], index) => (
                  <ListItem key={index}>
                    <ListItemText primary={`${name}:${value}`} />
                  </ListItem>
                ))}
              </List>
            </>
          ) : null}
        </>
      )}
    </>
  );
};

export default NewPlantBulk;
