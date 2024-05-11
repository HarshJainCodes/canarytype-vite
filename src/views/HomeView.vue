<template>
  <v-conatiner class="fill-height d-flex align-start">
    <v-row class="w-100 h-100">
      <v-col cols="12" md="2">
        <v-sheet min-height="268" rounded="lg"> </v-sheet>
      </v-col>

      <v-col cols="12" md="8" class="mt-5">
        <speed-test class="elevation-10" />
      </v-col>

      <v-col cols="12" md="2">
        <v-sheet min-height="268" rounded="lg">
          <!--  -->
        </v-sheet>
      </v-col>
    </v-row>
  </v-conatiner>
</template>

<script>
// import TheWelcome from '../components/TheWelcome.vue'
import SpeedTest from '../components/SpeedTest.vue'
export default {
  components: {
    SpeedTest
  },
  setup() {}
}
</script>
