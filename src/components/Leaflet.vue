<template>
  <div class="container">
    <div id="map"></div>

    <div id="export">
      <div class="title-export">
        <h1>Get Points</h1>
        <p>(after created or edited)</p>
      </div>
      <textarea id="to-copy"></textarea>
      <button id="copy" type="button">Copy to clipboard</button>
    </div>
  </div>
</template>

<script>
import L from "leaflet";
import "leaflet-draw";
import { hexGrid } from "@turf/turf";
import { polygon } from "leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
//

export default {
  components: {},
  data() {
    return {
      hexa: false,
      layer: false,
      hexgrid: false,
      geosearchOptions: {
        provider: new OpenStreetMapProvider()
      }
    };
  },
  mounted() {
    //
    // Init map on mounted
    this.initialize();
    ////
  },
  methods: {
    //
    // Init map function
    initialize() {
      var map = new L.map("map").setView([48.5, -0.09], 11);

      // Add layer mapbox
      L.tileLayer(
        "https://api.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}{r}.png?access_token=pk.eyJ1IjoicGllcnJpY2twIiwiYSI6ImNqaHZyZnRtbjB6M2ozcW52anQyNHFka3UifQ.0XBtUMCMEvMaML6dDifhIw",
        {
          attribution: `&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors`,
          maxZoom: 19
        }
      ).addTo(map);

      //
      // Add one marker example
      L.marker([48.5, -0.09])
        .addTo(map)
        .bindPopup("Le texte du marker<br> On peut y mettre du code HTML");
      ////

      //
      // Init draw controle
      // Initialise the FeatureGroup to store editable layers
      var drawItems = new L.featureGroup().addTo(map);

      // Initialise the draw control and pass it the FeatureGroup of editable layers
      var drawControl = new L.Control.Draw({
        position: "topright",
        draw: {
          circle: false, // Turns off this drawing tool
          polyline: false,
          circlemarker: false,
          marker: false,
          polygon: {
            allowIntersection: false, // Restricts shapes
            drawError: {
              color: "#e1e100", // Color the shape will turn when intersects
              message: "<strong>Oh snap!<strong> you can't draw that!" // Message that will show when intersect
            },
            shapeOptions: {
              color: "#bada55"
            }
          },
          rectangle: {
            allowIntersection: false, // Restricts shapes
            drawError: {
              color: "#e1e100", // Color the shape will turn when intersects
              message: "<strong>Oh snap!<strong> you can't draw that!" // Message that will show when intersect
            },
            shapeOptions: {
              color: "#bada55",
              clickable: false
            }
          }
        },
        edit: {
          featureGroup: drawItems,
          remove: false
        }
      });
      // Add draw control on map
      map.addControl(drawControl);

      // Add search barre
      const provider = new OpenStreetMapProvider();

      const searchControl = new GeoSearchControl({
        provider: provider
      });
      map.addControl(searchControl);

      // Create Zone
      map.on("draw:created", function(e) {
        var type = e.layerType,
          layer = e.layer;

        function arrayOfCoordinates(array) {
          const layer = array;
          const newLayer = [];
          const nowLayer = [];
          layer.forEach(element => {
            const elmt = Object.values(element);
            const array = [];
            array.push(elmt[1]);
            array.push(elmt[0]);
            newLayer.push(array);
          });
          newLayer.push(newLayer[0]);
          nowLayer.push(newLayer);
          return nowLayer;
        }

        function hexGrid(array) {
          var bbox = turf.bbox(turf.polygon(array));
          var cellSide = 400;
          var options = { units: "meters", mask: turf.polygon(array) };
          var hexgrid = turf.hexGrid(bbox, cellSide, options);
          return hexgrid;
        }
        let arrayCreated = layer.getLatLngs();

        this.layer = arrayOfCoordinates(arrayCreated[0]);
        this.hexa = hexGrid(this.layer);
        // For the copy
        var toCopy = document.getElementById("to-copy"),
          btnCopy = document.getElementById("copy");
        btnCopy.addEventListener("click", function() {
          toCopy.select();
          document.execCommand("copy");
          return false;
        });
        // Inject getpoints into textarea
        toCopy.innerHTML = JSON.stringify(this.hexa);

        this.hexgrid = L.geoJSON(this.hexa).addTo(map);

        drawItems.addLayer(layer);

        // Updating poly/rectangle
        map.on("draw:editstop", function(e) {
          // Delete actual hexgrid
          map.removeLayer(this.hexgrid);

          // Update hexgrid
          let arrayEdited = layer.getLatLngs();
          this.layer = arrayOfCoordinates(arrayEdited[0]);
          this.hexa = hexGrid(this.layer);

          // For the copy
          var toCopy = document.getElementById("to-copy"),
            btnCopy = document.getElementById("copy");
          btnCopy.addEventListener("click", function() {
            toCopy.select();
            document.execCommand("copy");
            return false;
          });
          // Inject getpoints into textarea
          toCopy.innerHTML = JSON.stringify(this.hexa);
          // Update hexgrid
          this.hexgrid = L.geoJSON(this.hexa).addTo(map);
        });
      });
      map.on("draw:deletestop", function(e) {
        var layers = e.layers;
        map.removeLayer(this.hexgridEdit);
      });
    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
}
#map {
  width: 66vw;
  height: 100vh;
}

#export {
  width: 33vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

#to-copy {
  margin: 5%;
  width: 80%;
  height: 30%;
}
#copy {
  width: 20%;
}
</style>