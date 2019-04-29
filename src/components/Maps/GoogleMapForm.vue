<template>
    <GmapMap style="width: 100%; height: 100%;" :zoom="1" :center="{lat: 0, lng: 0}"
        ref="map"
        @click="addMarker"
        >
      <GmapMarker
        v-for="(marker, index) in markers"
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
      markers: [],
    }
  },
  methods: {
    addMarker(e) {
      let marker = {
        latLng: e.latLng
      }

      this.markers.push(marker)
    },
    deleteMarker(index) {
      this.markers.splice(index, 1);
    }
  },
}
</script>