/* eslint-disable */
import React from "react";
import Helmet from "react-helmet";
import axios from "axios";
import _ from "lodash";
import moment from "moment";
import Layout from "components/Layout";
import Map from "components/Map";

const LOCATION = {
  lat: 40.4825192,
  lng: -94.9070949
};

const fullStateNames = [
  { name: "AK", full: "Alaska" },
  { name: "AL", full: "Alabama" },
  { name: "AR", full: "Arkansas" },
  { name: "AZ", full: "Arizona" },
  { name: "CA", full: "California" },
  { name: "CO", full: "Colorado" },
  { name: "CT", full: "Connecticut" },
  { name: "DC", full: "Washington D.C." },
  { name: "DE", full: "Delaware" },
  { name: "FL", full: "Florida" },
  { name: "GA", full: "Georgia" },
  { name: "HI", full: "Hawaii" },
  { name: "IA", full: "Iowa" },
  { name: "ID", full: "Idaho" },
  { name: "IL", full: "Illinois" },
  { name: "IN", full: "Indiana" },
  { name: "KS", full: "Kansas" },
  { name: "KY", full: "Kentucky" },
  { name: "LA", full: "Louisiana" },
  { name: "MA", full: "Massachusetts" },
  { name: "MD", full: "Maryland" },
  { name: "ME", full: "Maine" },
  { name: "MI", full: "Michigan" },
  { name: "MN", full: "Minnesota" },
  { name: "MO", full: "Missouri" },
  { name: "MS", full: "Mississippi" },
  { name: "MT", full: "Montana" },
  { name: "NC", full: "North Carolina" },
  { name: "ND", full: "North Dakota" },
  { name: "NE", full: "Nebraska" },
  { name: "NH", full: "New Hampshire" },
  { name: "NJ", full: "New Jersey" },
  { name: "NM", full: "New Mexico" },
  { name: "NV", full: "Nevada" },
  { name: "NY", full: "New York" },
  { name: "OH", full: "Ohio" },
  { name: "OK", full: "Oklahoma" },
  { name: "OR", full: "Oregon" },
  { name: "PA", full: "Pennsylvania" },
  { name: "RI", full: "Rhode Island" },
  { name: "SC", full: "South Carolina" },
  { name: "SD", full: "South Dakota" },
  { name: "TN", full: "Tennessee" },
  { name: "TX", full: "Texas" },
  { name: "UT", full: "Utah" },
  { name: "VA", full: "Virginia" },
  { name: "VT", full: "Vermont" },
  { name: "WA", full: "Washington" },
  { name: "WI", full: "Wisconsin" },
  { name: "WV", full: "West Virginia" },
  { name: "WY", full: "Wyoming" },
  { name: "PR", full: "Puerto Rico" },
  { name: "AS", full: "American Samoa" },
  { name: "GU", full: "Guam" },
  { name: "MP", full: "Northern Mariana Islands" },
  { name: "VI", full: "U.S. Virgin Islands" }
];

const CENTER = [LOCATION.lat, LOCATION.lng];
const DEFAULT_ZOOM = 5;

const IndexPage = () => {

  async function mapEffect({ leafletElement: map } = {}) {

    // Covid Tracking Project API
    const response = await axios.get(
      "https://covidtracking.com/api/v1/states/current.json"
    );

    const { data } = response;

    // Add full state name property to pass through to Google Maps API
    _.map(data, stateData => {
      _.map(fullStateNames, state => {
        if (stateData.state === state.name) {
          stateData.fullState = state.full;
        }
      });
    });

    // Add coordinates to states and territories
    const addCoord = async () => {

      const featuresArr = [];

      for (let i = 0; i < data.length; i++) {

        const geoCodeResponse = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${data[i].fullState}&key=AIzaSyBGfdE4YINFg5Xg4SxRM1hgIptBzcVzZVI`
        );

        const stateGeoCode = geoCodeResponse.data.results;

        data[i].coordinates = stateGeoCode[0].geometry.location;

        let item = data[i];

        let featureItem = {
          type: "Feature",
          properties: {
            item
          },
          geometry: {
            type: "Point",
            coordinates: [item.coordinates.lng, item.coordinates.lat]
          }
        };

        featuresArr.push(featureItem);

      }

      return featuresArr;

    };

    // Create GeoJSON Layer with Markers 
    addCoord().then(statesWithCoordinates => {

      const geoJsonLayers = new L.GeoJSON(statesWithCoordinates, {

        pointToLayer: (feature = {}, latlng) => {

          const { properties = {} } = feature;

          const {
            fullState,
            totalTestResults,
            positive,
            dateChecked
          } = properties.item;

          const recentTime = moment(dateChecked).utc().format("LLLL");
          const totalTestFormatted = totalTestResults.toLocaleString("en");
          const positiveFormatted = positive.toLocaleString("en");
          const percentPositive = ((positive / totalTestResults) * 100).toFixed(
            1
          );

          let testSummary;

          if (totalTestResults > 1000 && totalTestResults < 1000000) {
            testSummary = `${(totalTestResults / 1000).toFixed(1)}K+`;
          } else if (totalTestResults < 1000) {
            testSummary = totalTestResults;
          } else if (totalTestResults > 1000000) {
            testSummary = `${(totalTestResults / 1000000).toFixed(2)}M+`;
          }

          const html = `
            <span class="icon-marker">
              <span class="icon-marker-tooltip">
                <h2>${fullState}</h2>
                <p class="last-updated"><strong>Last Updated:</strong> ${recentTime}</p>
                <ul>
                  <li>Total Tests: ${totalTestFormatted}</li>
                  <li>Positive Tests: ${positiveFormatted}</li>
                  <hr>
                  <li class="positive">Positive (%): ${percentPositive}</li>
                </ul>
              </span>
              ${testSummary}
            </span>
          `;

          return L.marker(latlng, {
            icon: L.divIcon({
              className: "icon",
              html,
              iconSize: [30, 42]
            }),
            riseOnHover: true
          });
        }
      });
      geoJsonLayers.addTo(map);
    });
  }

  const mapSettings = {
    center: CENTER,
    defaultBaseMap: "Mapbox",
    zoom: DEFAULT_ZOOM,
    mapEffect
  };

  return (
    <Layout pageName="home">
      <Helmet>
        <title>Home Page</title>
      </Helmet>

      <Map {...mapSettings} />
    </Layout>
  );
};

export default IndexPage;
