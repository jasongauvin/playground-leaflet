<template>
  <div id="map">
    <!-- <div class="title">
      <h1>Simple map</h1>
      <p>First marker is placed at {{ withPopup.lat }}, {{ withPopup.lng }}</p>
      <p>Center is at {{ currentCenter }} and the zoom is: {{ currentZoom }}</p>
      <button @click="showLongText">Toggle long popup</button>
      <button @click="showMap = !showMap">Toggle map</button>
    </div>-->
    <div id="simpleMap">
      <l-map
        ref="map"
        v-if="showMap"
        :zoom="zoom"
        :center="center"
        :options="mapOptions"
        @update:center="centerUpdate"
        @update:zoom="zoomUpdate"
      >
        <l-tile-layer :url="url" :attribution="attribution" />
        <!-- <l-draw-toolbar position="topleft" /> -->
        <l-control class="example-custom-control">
          <p @click="showAlert">Click me</p>
        </l-control>
        <v-geosearch :options="geosearchOptions"></v-geosearch>

        <v-editable-polyline ref="poly" :latLng="test" :options="options">
          <!-- <v-polyline :lat-lngs="test"></v-polyline> -->
        </v-editable-polyline>
        <!-- <v-marker-cluster>
          <l-marker :lat-lng="withPopup">
            <l-popup>
              <div @click="innerClick">
                I am a popup
                <p v-show="showParagraph">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
                  sed pretium nisl, ut sagittis sapien. Sed vel sollicitudin nisi.
                  Donec finibus semper metus id malesuada.
                </p>
              </div>
            </l-popup>
          </l-marker>
          <l-marker :lat-lng="withTooltip">
            <l-tooltip :options="{ permanent: true, interactive: true }">
              <div @click="innerClick">
                I am a tooltip
                <p v-show="showParagraph">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
                  sed pretium nisl, ut sagittis sapien. Sed vel sollicitudin nisi.
                  Donec finibus semper metus id malesuada.
                </p>
              </div>
            </l-tooltip>
          </l-marker>
        </v-marker-cluster>-->
      </l-map>
      <div style="position:absolute;margin-top:35%;">
        <button @click="getPoints">Get points</button>
        <textarea cols="100" rows="10" v-model="points"></textarea>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import "~leaflet.markercluster/dist/MarkerCluster.css";
@import "~leaflet.markercluster/dist/MarkerCluster.Default.css";
html,
body,
#simpleMap {
  width: 66vw;
  height: 100vh;
}

.title {
  padding: 30px;
}

.example-custom-control {
  background: #fff;
  padding: 0 0.5em;
  border: 1px solid #aaa;
  border-radius: 0.1em;
}
.custom-control-watermark {
  font-size: 200%;
  font-weight: bolder;
  color: #aaa;
  text-shadow: #555;
}
</style>


<script>
import { latLng } from "leaflet";
import L from "leaflet";
// import "leaflet-draw";
import {
  LMap,
  LTileLayer,
  LControl,
  LMarker,
  LPopup,
  LTooltip,
  LPolyline,
  LPolygon
} from "vue2-leaflet";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import VGeosearch from "vue2-leaflet-geosearch";
import Vue2LeafletMarkerCluster from "vue2-leaflet-markercluster";
// import LDrawToolbar from "vue2-leaflet-draw-toolbar";
import Vue2LeafletEditablePolyline from "../../node_modules/vue2-leaflet-editable-polyline/src/pages/vue2editablepolyline/vue2editablepolyline.vue";

export default {
  name: "Example",
  components: {
    LMap,
    LTileLayer,
    LControl,
    VGeosearch,
    LMarker,
    LPopup,
    LTooltip,
    LPolygon,
    "v-polyline": LPolyline,
    "v-marker-cluster": Vue2LeafletMarkerCluster,
    "v-editable-polyline": Vue2LeafletEditablePolyline
    // LDrawToolbar
  },
  data() {
    let x = -35.15;
    let y = -58.2;
    let latlngs = [];
    for (let i = 0; i < 10; i++) {
      latlngs.push(L.latLng(x, y));
      x += Math.random();
      y += Math.random();
    }
    let options = {
      maxMarkers: 100,
      newPolylines: true,
      customPointListeners: {
        click: function(e) {
          //me.addMarker();
          var marker = e.target;
          marker.bindPopup("<button onclick='getPoint()'>Add</button>");
          marker.openPopup();
          //console.log(e.target.getContent());
        }
      }
    };
    return {
      test: [
        [
          [7.55859375, 50.84757295365389],
          [10.72265625, 47.517200697839414],
          [17.75390625, 43.45291889355465],
          [27.0703125, 46.437856895024204],
          [35.5078125, 51.944264879028765],
          [20.56640625, 53.9560855309879],
          [7.55859375, 50.84757295365389]
        ]
      ],
      options,
      latlngs,
      initialLocation: L.latLng(x - 0.3, y - 0.3),
      zoom: 4,
      points: "",
      content: "hi",
      center: latLng(47.41322, 4.219482),
      // center: latLng(45.27658939361572, 13.725794610298898),
      url:
        "https://api.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}{r}.png?access_token=pk.eyJ1IjoicGllcnJpY2twIiwiYSI6ImNqaHZyZnRtbjB6M2ozcW52anQyNHFka3UifQ.0XBtUMCMEvMaML6dDifhIw",
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      //for coordinates popup example
      withPopup: latLng(47.41322, 3.219482),
      withTooltip: latLng(47.41422, -1.250482),
      // end popup example
      currentZoom: 11.5,
      currentCenter: latLng(47.41322, -1.219482),
      showParagraph: false,
      mapOptions: {
        zoomSnap: 0.5
      },
      showMap: true,
      geosearchOptions: {
        // Important part Here
        provider: new OpenStreetMapProvider()
      }
    };
  },
  created: function() {
    window.getPoint = this.getPoints.bind(this);
  },
  methods: {
    getPoints: function() {
      var points = this.$refs.poly.mapObject.getPoints();
      //console.log(points);
      for (var i = 0; i < points.length; i++) {
        var point = points[i];
        if (point.context) {
          // The original position of this point (new point may be added or
          // removed before this one when editing):
          this.points +=
            "latLng=" +
            point.getLatLng() +
            "originalPointNo=" +
            point.context.originalPointNo +
            "originalPolylineNo=" +
            point.context.originalPolylineNo;
        }
      }
    },
    showAlert() {
      alert("Click!");
    },
    clickBtn() {
      this.rectangle.style.weight++;
      this.rectangle.style.color =
        this.rectangle.style.weight % 2 === 0 ? "blue" : "green";
    },
    zoomUpdate(zoom) {
      this.currentZoom = zoom;
    },
    centerUpdate(center) {
      this.currentCenter = center;
    },
    showLongText() {
      this.showParagraph = !this.showParagraph;
    },
    innerClick() {
      alert("Click!");
    }
  }
};
</script>