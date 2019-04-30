<template>
    <yandex-map
        :coords="[48, 68]"
        zoom="3"
        style="width: 100%; height: 200px;"
        :placemarks="data.markers"
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
  components: { yandexMap, ymapMarker },
}
</script>