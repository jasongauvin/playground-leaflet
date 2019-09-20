<template>
  <div>
    <div id="welcome-container">
      welcome to vue leaflet map...
      <l-map ref="map" :padding="[200, 200]" :zoom="zoom" :center="initialLocation">
        <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
        <l-layer-group>
          <v-editable-polyline ref="poly" :latLng="coordinates" :options="options">
            <l-popup>
              <strong>Location Name:</strong>
              {{latlngs}}
              <br />
              <strong>Date:</strong>
              <br />
              <button class="btn btn-warning btn-sm" style="color: white;margin:5% 0% 0% 35%;">Add</button>
            </l-popup>
          </v-editable-polyline>
        </l-layer-group>
      </l-map>
      <!-- <v-map
        :zoom="zoom"
        :center="initialLocation"
        style="position:absolute;width: 700px; height: 500px;"
      >
        <v-tilelayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></v-tilelayer>
        <v-editable-polyline ref="poly" :latLng="latlngs" :options="options">
          <v-popup></v-popup>
        </v-editable-polyline>
      </v-map>-->
    </div>
    <br />
    <div style="position:absolute;margin-top:35%;">
      <button @click="getPoints">Get points</button>
      <textarea cols="100" rows="10" v-model="points"></textarea>
    </div>
  </div>
</template>

<style scoped >
#welcome-container {
  width: 66vw;
  height: 100vh;
  background-color: blue;
}
</style>

<script >
import L from "leaflet";
import {
  LMap,
  LTileLayer,
  LMarker,
  LPolyline,
  LLayerGroup,
  LTooltip,
  LPopup,
  LControlZoom,
  LControlAttribution,
  LControlScale,
  LControlLayers
} from "vue2-leaflet";
import Vue2LeafletEditablePolyline from "../../node_modules/vue2-leaflet-editable-polyline/src/pages/vue2editablepolyline/vue2editablepolyline";

function getPoint() {
  alert("clicked");
}
export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPolyline,
    LLayerGroup,
    LTooltip,
    LPopup,
    LControlZoom,
    LControlAttribution,
    LControlScale,
    LControlLayers,
    "v-editable-polyline": Vue2LeafletEditablePolyline
  },
  data: function() {
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
      newPolylines: false,
      customPointListeners: {
        click: function(e) {
          // me.addMarker()
          var marker = e.target;
          marker.bindPopup("<button onclick='getPoint()'>Add</button>");
          marker.openPopup();
          // console.log(e.target.getContent());
        }
      }
    };
    return {
      options,
      latlngs,
      initialLocation: L.latLng(x - 0.3, y - 0.3),
      zoom: 10,
      points: "",
      content: "hi",
      url:
        "https://api.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}{r}.png?access_token=pk.eyJ1IjoicGllcnJpY2twIiwiYSI6ImNqaHZyZnRtbjB6M2ozcW52anQyNHFka3UifQ.0XBtUMCMEvMaML6dDifhIw",
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      coordinates: [
        [45.2750072361, 13.7187695503],
        [45.2757622049, 13.7198746204],
        [45.2763963762, 13.7197780609],
        [45.2787216541, 13.7263333797],
        [45.2787216812, 13.72808218],
        [45.2776703394, 13.7291487239],
        [45.2746230524, 13.7283730778],
        [45.2739752209, 13.727448813],
        [45.2735003071, 13.7272656303],
        [45.2732175518, 13.7276246501],
        [45.2721955264, 13.7278538799],
        [45.2714755129, 13.7272248028],
        [45.2717871648, 13.7257949873],
        [45.2728658637, 13.7252000246],
        [45.2737827215, 13.7252887813],
        [45.2744277756, 13.7251200459],
        [45.2747125506, 13.7229381908],
        [45.2746349263, 13.7213142352],
        [45.2749326769, 13.7207699906],
        [45.2756791761, 13.7202823162]
      ]
    };
  },
  created: function() {
    window.getPoint = this.getPoints.bind(this);
  },
  methods: {
    getPoints: function() {
      var points = this.$refs.poly.mapObject.getPoints();
      console.log(points);
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
    }
  }
};
</script>