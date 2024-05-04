# Plant Tracker

A system designed to track your house plant inventory, maintenance activities, and plant health. Plants can be moved to the graveyard for historical tracking once the time is appropriate.

## Application Data

The application is comprised of the following data types

- Plant: The base data type, represents a plant that is either alive or dead
  - Name
  - Common Name
  - Scientific Name
  - Area
  - Purchase Date
  - Main Photo
- Activity Entry: An entry is generated anytime a maintenance activity is performed on the plant
  - Timestamp
  - Activities Performed
  - Plant Health Rating
  - Notes
  - Image at time of activity
- Location: The larger geographic container, each location contains many areas, ie: House or Greenhouse
- Area: A smaller subset of a location, ie: Living room or Shelf A
- Activity: Maintenance activities available to include in activity entries.

## Application Archictecture and Customization

The backend is built with Django, Django-Ninja, and Django-Extra modules providing operations via API and the Django Admin Inteface. The frontend is built with React TypeScript. The proxy container must be customized for your domain by altering the variables on lines 86 and 87 of `.github/workflows/docker-publish.yml` and the committing the change to trigger a build. Update the github account name in lines 5 and 15 of `docker-compose.prd.yml` to run the application.
