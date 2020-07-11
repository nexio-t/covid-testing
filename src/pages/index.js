/* eslint-disable */
import React from "react";
import Helmet from "react-helmet";
// import L from 'leaflet';
import axios from "axios";
import _ from "lodash";

import moment from "moment";
import Layout from "components/Layout";
import Container from "components/Container";
import Map from "components/Map";
import { func } from "prop-types";
import { async } from "q";

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
  /**
   * mapEffect
   * @description Fires a callback once the page renders
   * @example Here this is and example of being used to zoom in and set a popup on load
   */
  let geoCodeResponse;
  let statesWithCoordinates = [];
  let addCoordinates;
  let randomObj = [];

  function fetchStateCoordinates() {
    let statesArr = [];

    let response = axios.get(
      "https://covidtracking.com/api/v1/states/current.json"
    );

    return (randomObj = statesArr);
    // return SOME_OBJ = NEW ARRAY

    // addCoordinates = new Promise((resolve, reject) => {

    //     // const addCoordinates;
    // _.map(states, (data) => {
    //   geoCodeResponse = axios.get(
    //     `https://maps.googleapis.com/maps/api/geocode/json?address=${data.state}&key=AIzaSyBGfdE4YINFg5Xg4SxRM1hgIptBzcVzZVI`
    //   )

    //   geoCodeResponse.then( res => {

    //     console.log("res23 is: ", res)

    //     console.log("first then activated");

    //     console.log("data78 is: ", data);

    //     data.coordinates = coordinates;

    //     console.log("data90 is: `", data);
    //     // const {data: { results: [{ geometry: { location: { location: {lat, lng} }} }] }} = res;

    //     // console.log("lat is: ", lat);
    //     // console.log("lng is: ", lng);

    //   } );

    //   // const {data: { results: [{ geometry: { location: { location: {lat, lng} }} }] }} = geoCodeResponse;

    //   // const coordinates = geoCodeResponse.data.results[0].geometry.location;
    //   // // console.log("coordinates is: ", coordinates);

    //   // data.coordinates = coordinates;

    //   // // console.log('STATE data is: ', data);
    //   // // // console.log("geoCodeResponse is: ", geoCodeResponse);
    //   // // console.log(statesWithCoordinates);
    //   // statesWithCoordinates.push(data);
    // });

    // console.log("data AT THE VERY END IS: ", states);

    // // console.log('statesWithCoordinates after is: ', statesWithCoordinates);

    //   console.log("TOMAS");
    //   resolve(states);

    // })

    // new Promise(resolve => { resolve(statesWithCoordinates)});
  }

  async function mapEffect({ leafletElement: map } = {}) {
    // if (!map) return;
    let response;

    // fetchStateCoordinates();

    response = await axios.get(
      "https://covidtracking.com/api/v1/states/current.json"
    );

    const { data } = response;

    console.log("data is: ", data);

    _.map(data, stateData => {
      _.map(fullStateNames, state => {
        if (stateData.state === state.name) {
          stateData.fullState = state.full;
        }
      });
    });

    console.log("data is: ")
    

    let statesWithCoord; 


        
    

    const addCoord = async () => {

      const featuresArr = []; 


      for (let i =0; i < data.length; i++) {

        console.log("data is: ", data[i]); 
  
        geoCodeResponse = await axios
        .get(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${data[i].fullState}&key=AIzaSyBGfdE4YINFg5Xg4SxRM1hgIptBzcVzZVI`
        )
        // .then(data => {
        //   const {
        //     data: { results }
        //   } = data;
        //   state.coordinates = results[0].geometry.location;
        //   return state;
        // });
  
        console.log("geoCode response is: ", geoCodeResponse);  
  
        const stateGeoCode = geoCodeResponse.data.results; 
  
        console.log("stateGeoCode is: ", stateGeoCode); 
  
        data[i].coordinates = stateGeoCode[0].geometry.location;
        console.log("before return state is: ", data[i]); 
        // return data[i];

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
        }

        featuresArr.push(featureItem)
  
      }

      return featuresArr; 

    }

    // const geoJson = {}; 

    addCoord().then(hello => { 

      console.log("hello is: ", hello); 

      // const featuresArr = []; 
      // hello.map( item => {

      //   console.log("ITEM is: ", item); 

      //   let featureItem = {
      //     type: "Feature",
      //     properties: {
      //       item
      //     },
      //     geometry: {
      //       type: "Point",
      //       coordinates: [item.coordinates.lng, item.coordinates.lat]
      //     }
      //   }

      //   featuresArr.push(featureItem)
        
      // })

      // console.log("featuresArr is: ", featuresArr); 

      // const geoJson2 = {
      //   type: "FeatureCollection",
      //   features: featuresArr
      // };

      const geoJsonLayers = new L.GeoJSON(hello, {
        pointToLayer: (feature = {}, latlng) => {

          console.log("feature99 is: ", feature); 
          // console.log("item99 is: ", item); 
          const { properties = {} } = feature;
          
          
          const {
            fullState,
            totalTestResults,
            positive,
            dataQualityGrade,
            dateChecked
          } = properties.item;

          console.log("properties is: ", properties); 
          console.log("fullstate is : ", fullState); 


          // console.log("featuresArr45 is: ", featuresArr); 
  
          let recentTime = moment(dateChecked).utc().format("LLLL");
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
  
          const myIcon = L.icon({
            iconUrl: "https://img.icons8.com/color/48/000000/unchecked-circle.png"
          });
  
          // <img src="https://img.icons8.com/color/48/000000/unchecked-circle.png"/>
  
          return L.marker(latlng, {
            icon: L.divIcon({
              className: "icon",
              html,
              iconSize: [30, 42]
            }),
            riseOnHover: true
          });
  
          // Alaska
          // Total Tests: 100
          // Total Positive Tests: 10
          // Postive Rate: 10%
  
          // Data Grade: A
          // Data Last updated:
        }
      });
  
      geoJsonLayers.addTo(map);

      // console.log("geoJSON 2 is: ", geoJson2); 

    }) 
    

    console.log("stateWithCoord is: ", statesWithCoord);

    console.log("geoCodeResponse is: ", geoCodeResponse); 



    // geoJson = {
    //   type: "FeatureCollection",
    //   features: await data.map(async state => {

    //     console.log("state2 is: ", state); 
        
    //     geoCodeResponse = await axios
    //       .get(
    //         `https://maps.googleapis.com/maps/api/geocode/json?address=${state.fullState}&key=AIzaSyBGfdE4YINFg5Xg4SxRM1hgIptBzcVzZVI`
    //       )
    //       .then(data => {
    //         console.log('then of data is: ', data); 
    //         const {
    //           data: { results }
    //         } = data;
    //         state.coordinates = results[0].geometry.location;
    //         return state;
    //       });

    //     return {
    //       type: "Feature",
    //       properties: {
    //         ...state
    //       },
    //       geometry: {
    //         type: "Point",
    //         coordinates: [state.coordinates.lng, state.coordinates.lat]
    //       }
    //     };
    //   })
    // };



    // let statesArr = [];

    // let i = 0;

    // console.log("geoJson is: ", geoJson); 


    // while (i < 56) {
    //   await geoJson.features[i].then(data => {

    //     console.log("data in while loop is: ", data); 
    //     statesArr.push(data);
    //   });

    //   i++;
    // }

    // console.log("statesArr is: ", statesArr); 

 
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
