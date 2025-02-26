const express = require("express");
const fetch = require("node-fetch");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// POST Request
app.use(express.json({ limit: "1mb" }));
app.post("/api/speed_post", (req, res) => {
  console.log("*POST RECEIVED*");
  console.log(req.body);
  const data = req.body;
  res.json({
    status: "success",
    iconType: data.iconType,
    latitude: data.latitude,
    longitude: data.longitude
  });
});

// GET Speed Cameras data
app.get("/api/speed", (req, res) => {
  const baseURL =
    "https://data.princegeorgescountymd.gov/resource/mnkf-cu5c.json";
  fetch(baseURL)
    .then(res => res.json())
    .then(data => {
      const speedCams = data.map(speedCam => ({
        street_address: speedCam.street_address,
        posted_speed: speedCam.posted_speed,
        enforcement: speedCam.enforcement,
        latitude: speedCam.location_1.latitude,
        longitude: speedCam.location_1.longitude
      }));
      console.log(speedCams);
      res.send(speedCams);
    })
    .catch(err => {
      console.log(err);
      res.redirect("/error");
    });
});

// GET Red Light Cameras data
app.get("/api/redlight", (req, res) => {
  const baseURL =
    "https://data.princegeorgescountymd.gov/resource/3a3p-zwvz.json";
  fetch(baseURL)
    .then(res => res.json())
    .then(data => {
      const redLightCams = data.map(redLightCam => ({
        street_address: redLightCam.description,
        latitude: redLightCam.location_1.latitude,
        longitude: redLightCam.location_1.longitude
      }));
      console.log(redLightCams);
      res.send(redLightCams);
    })
    .catch(err => {
      console.log(err);
      res.redirect("/error");
    });
});

// GET Police Stations
app.get("/api/police", (req, res) => {
  const baseURL =
    "https://data.princegeorgescountymd.gov/resource/qkn8-5mhu.json";
  fetch(baseURL)
    .then(res => res.json())
    .then(data => {
      const policeStations = data.map(station => ({
        name: station.station_name,
        telephone: station.telephone,
        street_address: station.station_address.human_address,
        latitude: station.station_address.latitude,
        longitude: station.station_address.longitude
      }));
      console.log(policeStations);
      res.send(policeStations);
    })
    .catch(err => {
      console.log(err);
      res.redirect("/error");
    });
});

// GET Fire Stations
app.get("/api/fire", (req, res) => {
  const baseURL =
    "https://data.princegeorgescountymd.gov/resource/bzf2-94qx.json";
  fetch(baseURL)
    .then(res => res.json())
    .then(data => {
      const fireStations = data.map(f_station => ({
        station_number: f_station.station_co_number,
        name: f_station.station_name,
        street_address: f_station.location_1.human_address,
        medical_unit_onsite: f_station.medical_unit_onsite,
        ambulance_onsite: f_station.ambulance_onsite,
        latitude: f_station.location_1.latitude,
        longitude: f_station.location_1.longitude
      }));
      console.log(fireStations);
      res.send(fireStations);
    })
    .catch(err => {
      console.log(err);
      res.redirect("/error");
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
