<template>
    <yandex-map
        :coords="[0, 0]"
        zoom="1"
        style="width: 100%; height: 100%;"
        @click="addMarker"
        :placemarks="placemarks"
        :cluster-callbacks="{ click: addMarker }"
        >
    </yandex-map>
</template>

<script>
import { yandexMap, ymapMarker } from 'vue-yandex-maps'

export default {
  data () {
    return {
        markers: [],
        placemarks: [
            {
                coords: [35.8, 39.8],
                properties: {}, // define properties here
                options: {}, // define options here
                clusterName: "1",
                balloonTemplate: '<div>"Your custom template"</div>',
                callbacks: { click: this.addMarker }
            }
        ]
    }
  },
  methods: {
    addMarker(e) {
        let marker = {
            latLng: e.latLng
        }
        console.log(2)
        this.markers.push(marker)
    },
    deleteMarker(index) {
      this.markers.splice(index, 1);
    }
  },
  components: { yandexMap, ymapMarker }
}
</script>