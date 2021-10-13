// Add console.log to check to see if our code is working.
console.log("working");

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Then we add our 'graymap' tile layer to the map.
// streets.addTo(map);

// Create a 'light' tile layer to be the background of our map 
let satellite = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        accessToken: API_KEY
    });

// Add layer to map
// satellite.addTo(map);


 // Accessing the Toronto airline routes GeoJSON URL.
let torontohoods = 'https://raw.githubusercontent.com/Francisco170594/Mapping_Earthquakes/Mapping_GeoJSON_Polygons/torontoNeighborhoods.json';

// Create a style for the lines.
let myStyle = {
    color: "blue",
    weight: 1,
    fillColor: 'yellow'

}

// Grabbing our GeoJSON data.
d3.json(torontohoods).then(function(data) {
    console.log(data);
  // Creating a GeoJSON layer with the retrieved data.
  L.geoJson(data, {
      style: myStyle,
      onEachFeature: function(feature,layer){
          console.log(layer)
          layer.bindPopup("<h2> Neighborhood: " + feature.properties.AREA_NAME + "</h2>");
      }}).addTo(map);
});

// Create a base layer that holds both maps.
let baseMaps = {
    Street : streets,
    "Satellite Streets": satellite
  };

// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
    center: [43.7, -79.3],
    zoom: 11,
    layers: [streets]
});

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);





   




