<template>
  <v-card class="w-100 py-10 px-10 rounded-shaped fill-height d-flex flex-column">
    <div class="w-100 d-flex text-h4 text-teal-accent-4 justify-center">Welcome To Canary Type</div>

    <v-card-title>
      <div class="pt-10">
        {{ time }}
      </div>
    </v-card-title>

    <v-card-text class="d-flex flex-column">
      <div class="textToType text-h5">
        <div class="textToType1 text-disabled">
          {{ stringToType }}
        </div>

        <div class="resultDisplay"></div>

        <textarea
          style="font-family: myRobotoFont; resize: none"
          class="text-h5 text-transparent"
          name="typingArea"
          v-on:keydown="startTimer"
          spellcheck="false"
        ></textarea>
      </div>

      <div v-if="typingFinished">
        <v-divider class="mt-15 border-opacity-75" thickness="5" color="teal-darken-1"></v-divider>

        <div class="mt-15 text-h5 d-flex justify-center" style="font-family: myRobotoFont">
          Your typing speed is {{ typingSpeed }} WPM!
        </div>

        <div
          class="mt-5 text-h5 text-teal-darken-1 d-flex justify-center"
          style="font-family: myRobotoFont"
        >
          <v-btn color="teal-darken-1" variant="outlined" @click="saveResult">
            Save Your Result
          </v-btn>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const time = ref(2)

    return { time }
  }
}
</script>

<style>
@font-face {
  font-family: myRobotoFont;
  src: url('../assets/fonts/RobotoMono-Regular.ttf');
}

.textToType {
  display: grid;
  color: rgb(0, 92, 84);
}

.textToType1 {
  grid-column: 1;
  grid-row: 1;

  font-family: myRobotoFont;

  /* so that the user cannot select the text and copy paste :) */
  user-select: none;
}

textarea {
  grid-column: 1;
  grid-row: 1;

  caret-color: #00bfa5;

  font-family: 'Times New Roman', Times, serif;
  white-space: normal;
  text-align: left;

  z-index: 5;
}

textarea:focus-visible {
  outline: none;
}

.resultDisplay {
  grid-column: 1;
  grid-row: 1;

  user-select: none;
  font-family: myRobotoFont;
}
</style>
