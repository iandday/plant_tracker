import { Button, Grid, Input, Typography } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useEffect, useState, useRef } from 'react';
import { AreaApi, AreaOut, BulkApi, BulkPlantCreateResponse } from '../services';
import { Controller, useForm } from 'react-hook-form';
import { BASE_PATH } from '../services/base';
import axiosInstance from '../provider/CustomAxios';
//import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import PlantListing from '../components/PlantListing';

const NewPlantBulk = () => {
  //const navigate = useNavigate();

  const [showBulkCreateResults, setShowBulkCreateResults] = useState(false);
  const [bulkCreateResults, setBulkCreateResults] = useState<BulkPlantCreateResponse>();
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
        setBulkCreateResults(response.data);
      }
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    const showResultsEffect = async () => {
      bulkCreateResults ? setShowBulkCreateResults(true) : null;
    };

    showResultsEffect();
  }, [bulkCreateResults]);

  // start show/hide functionaity
  const [showBulkCreate, setShowBulkCreate] = useState<boolean>(false);

  const handleBulkCreateClick = () => {
    setShowBulkCreate(!showBulkCreate);
  };

  return (
    <>
      <Helmet>
        <title>{import.meta.env.VITE_APP_NAME + ' | Import/Export'}</title>
      </Helmet>
      <button className="link" onClick={handleBulkCreateClick}>
        {' '}
        About Us{' '}
      </button>
      {showBulkCreate ? (
        <>
          {!showBulkCreateResults ? (
            <>
              <Grid container justifyContent="space-between" style={{ marginBottom: 1 }}>
                <Grid item xs={12}>
                  <Typography variant="h5" align="center">
                    Bulk Plant Creation
                  </Typography>
                  <Typography>
                    CSV input file must have the following columns: "name", "common_name", "scientific_name",
                    "purchase_date", "area", and "notes". The date must be in YYYYMMDD format, 20240401 for April 1st,
                    2024.
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
              {bulkCreateResults?.created && areaData ? (
                <>
                  <Typography variant="h5" align="center">
                    Created Plants
                  </Typography>
                  <PlantListing plants={bulkCreateResults.created!} areas={areaData!} />
                </>
              ) : null}
              {bulkCreateResults?.errors ? (
                <>
                  <Typography variant="h5" align="center">
                    Import Errors
                  </Typography>

                  <List>
                    {Object.entries(bulkCreateResults?.errors).map(([name, value], index) => (
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
      ) : null}
    </>
  );
};

export default NewPlantBulk;
