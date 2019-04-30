<template>
    <GmapMap style="width: 100%; height: 200px;" :zoom="1" :center="{lat: 0, lng: 0}"
        ref="map"
        >
      <GmapMarker
        v-for="(marker, index) in data.markers"
        :key="index"
        :position="marker.latLng"
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
}
</script>