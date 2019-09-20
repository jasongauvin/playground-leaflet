<template>
  <div id="app" class="container">
    <div class="col1">
      <!-- The map goes here -->
      <div class="map">
        <!-- <Map /> -->
        <Leaflet />
        <!-- <EditorPoly /> -->
        <!-- <VectorGrid /> -->
      </div>
    </div>
    <div class="col2">
      <!-- The layer checkboxes go here -->
    </div>
  </div>
</template>

<script>
// import Map from "./components/Map.vue";
//import EditorPoly from "./components/EditorPoly";
//import VectorGrid from "./components/VectorGrid";
import Leaflet from "./components/Leaflet.vue";

export default {
  name: "app",
  components: {
    //EditorPoly,
    // Map
    //VectorGrid
    Leaflet
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  display: flex;
  width: 100vw;
}

.col1 {
  width: 100vw;
  height: 100vh;
  background-color: bleu;
}

/* .col2 {
  width: 34vw;
  height: 100vh;
  background-color: rgba(0, 225, 255, 0.404);
} */
</style>
