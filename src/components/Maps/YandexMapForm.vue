<template>
    <yandex-map
        :coords="[48, 68]"
        zoom="3"
        style="width: 100%; height: 100%;"
        :placemarks="markers"
        @map-was-initialized="initHandler"
        >
    </yandex-map>
</template>

<script>
import { yandexMap, ymapMarker } from 'vue-yandex-maps'

export default {
  data () {
    return {
        markers: []
    }
  },
  methods: {
    deleteMarker(index) {
      this.markers.splice(index, 1);
    },
    initHandler(obj){
        obj.events.add('click', (e) => {
            let marker = {
                coords: [e.get('coords')[0], e.get('coords')[1]],
                callbacks: { click: () => {this.markers.splice(this.markers.length-1, 1)} }
            }
            this.markers.push(marker)
        })
    }
  },
  components: { yandexMap, ymapMarker },
}
</script>