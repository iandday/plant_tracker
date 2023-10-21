import {
  Avatar,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import ImageIcon from "@mui/icons-material/Image";

const MyPlants = () => {
  const test = [
    "Plant fghdghdhgdghdfghdfhfdghdfhdfghdfghfh",
    "plant 2",
    "Plant 3",
  ];

  return (
    <>
      <Grid container justifyContent="space-between" alignItems="stretch">
        <Grid item xs={12}>
          <Typography variant="h4" align="center">
            My Plants
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <List sx={{ width: "100%", bgcolor: "background.paper" }}>
            {test.map((plant) => (
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <ImageIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={plant} secondary="Jan 9, 2014" />
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </>
  );
};

export default MyPlants;
