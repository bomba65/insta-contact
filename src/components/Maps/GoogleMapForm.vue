<template>
    <GmapMap style="width: 100%; height: 400px;" :zoom="1" :center="{lat: 0, lng: 0}"
        ref="map"
        @click="addMarker"
        >
      <GmapMarker
        v-for="(marker, index) in data.markers"
        :key="index"
        :position="marker.latLng"
        @click="deleteMarker(index)"
        />
    </GmapMap>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  props: {
    data: Object
  },
  methods: {
    addMarker(e) {
      let marker = {
        latLng: e.latLng
      }

      this.data.markers.push(marker)
    },
    deleteMarker(index) {
      this.data.markers.splice(index, 1);
    }
  },
}
</script>