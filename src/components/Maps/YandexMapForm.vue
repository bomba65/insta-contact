<template>
    <yandex-map
        :coords="[48, 68]"
        zoom="3"
        style="width: 100%; height: 400px;"
        :placemarks="data.markers"
        @map-was-initialized="initHandler"
        >
    </yandex-map>
</template>

<script>
import { yandexMap, ymapMarker } from 'vue-yandex-maps'

export default {
  data () {
    return {
    }
  },
  props: {
    data: Object
  },
  methods: {
    initHandler(obj){
        obj.events.add('click', (e) => {
            let marker = {
                coords: [e.get('coords')[0], e.get('coords')[1]],
                callbacks: { click: () => {this.data.markers.splice(this.data.markers.length-1, 1)} }
            }
            this.data.markers.push(marker)
        })
    }
  },
  components: { yandexMap, ymapMarker },
}
</script>