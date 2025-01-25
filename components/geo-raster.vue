<template>
  <div id="map" style="height: 500px;" ref="map"></div>

</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import 'leaflet/dist/leaflet.css';
import { fromArrayBuffer } from "geotiff";
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import WKB from 'ol/format/WKB.js';
import { OSM, Vector as VectorSource, XYZ } from 'ol/source.js';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer.js';
import * as ol from 'ol';
import { Tile } from 'ol';

const mapRef = ref(null);
const raster = new TileLayer({
  source: new OSM(),
});

const wkb =
  '0103000000010000000500000054E3A59BC4602540643BDF4F8D1739C05C8FC2F5284C4140EC51B81E852B34C0D578E926316843406F1283C0CAD141C01B2FDD2406012B40A4703D0AD79343C054E3A59BC4602540643BDF4F8D1739C0';

const format = new WKB();

const feature = format.readFeature(wkb, {
  dataProjection: 'EPSG:4326',
  featureProjection: 'EPSG:3857',
});

const vector = new VectorLayer({
  source: new VectorSource({
    features: [feature],
  }),
});
onMounted(() => {
  // const map = new Map({
  //   layers: [raster, vector],
  //   target: 'map',
  //   view: new View({
  //     center: [2952104.0199, -3277504.823],
  //     zoom: 4,
  //   }),

  // });

  // 创建地图对象
  const map = new Map({
    target: 'map',  // 地图容器id
    layers: [
      // 高德地图
      new TileLayer({
        source: new XYZ({
          url: 'https://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}',
          maxZoom: 18,
        }),
      }),
      vector
    ],
    view: new View({
      center: [2952104.0199, -3277504.823],
      zoom: 4,
      projection: 'EPSG:3857',
    }),
  });
})

</script>

<style>
#map {
  height: 100%;
  width: 100%;
}

.ol-attribution {
  display: none;
}
</style>
