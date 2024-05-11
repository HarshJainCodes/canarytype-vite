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
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { useLeaderboardStore } from '@/stores/leaderboard'

export default {
  setup() {
    const time = ref(2)
    const stringToType = ref('Loading........................Please wait')
    const typingStarted = ref(false)
    const typingFinished = ref(false)
    const typingSpeed = ref(0)

    const userStore = useUserStore()
    const ufetchLeaderboard = useLeaderboardStore()

    // methods
    const addSpanAroundText = () => {
      setTimeout(() => {
        const enteredText = document.querySelector('textarea').value

        const resultDisplayEle = document.querySelector('.resultDisplay')
        resultDisplayEle.innerHTML = ''

        for (let i = 0; i < enteredText.length; i++) {
          if (enteredText[i] === stringToType.value[i]) {
            resultDisplayEle.innerHTML += `<span style="color: #00BFA5;">${enteredText[i]}</span>`
          } else {
            resultDisplayEle.innerHTML += `<span style="color: #EF5350;">${stringToType.value[i]}</span>`
          }
        }
      }, 10)
    }

    const startTimer = () => {
      if (!typingStarted.value) {
        typingStarted.value = true

        const timer = setInterval(() => {
          if (time.value > 0) {
            time.value--
          } else {
            typingFinished.value = true
            calculateTypingSpeed()
            clearInterval(timer)
          }
        }, 1000)
      }
      addSpanAroundText()
    }

    const getStringToTypeFromBackend = async () => {
      const wordsToType = await fetch(
        'https://canarytype.azurewebsites.net/api/Canary/RandomWords',
        {
          method: 'GET'
        }
      )
      const w = await wordsToType.json()

      let str = ''

      for (let i = 0; i < w.length - 2; i++) {
        str += w[i] + ' '
      }
      str += w[w.length - 2]

      stringToType.value = str
    }

    const calculateTypingSpeed = () => {
      const wordsTyped = document.querySelector('textarea').value.split(' ')
      const availableWords = stringToType.value.split(' ')

      let charsInTotalCorrectWords = 0

      for (const word of wordsTyped) {
        for (const word2 of availableWords) {
          if (word === word2) {
            charsInTotalCorrectWords += word.length
            break
          }
        }
      }

      typingSpeed.value = Math.round((charsInTotalCorrectWords / 5) * 6)
      document.querySelector('textarea').blur()
    }

    const saveResult = async () => {
      if (localStorage.getItem('canaryLoginToken') === null) {
        // if token is not present, then we prompt the user to login
        userStore.requireLogin = true
      } else {
        console.log('token is present')
        // const res = await fetch(
        //   'https//canarytype.azurewebsites.net/api/Canary/UpdateLeaderboard',
        //   {
        //     method: 'POST',
        //     headers: {
        //       Authorization: 'Bearer ' + localStorage.getItem('canaryLoginToken'),
        //       'Content-type': 'application/json; charset=UTF-8'
        //     },
        //     body: JSON.stringify({
        //       userName: localStorage.getItem('canaryUserName'),
        //       bestTypingSpeed: typingSpeed.value
        //     })
        //   }
        // )

        const response = await fetch(
          'https://canarytype.azurewebsites.net/api/Canary/UpdateLeaderboard',
          {
            method: 'POST',
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('canaryLoginToken'),
              'Content-type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify({
              userName: localStorage.getItem('canaryUserName'),
              bestTypingSpeed: typingSpeed.value
            })
          }
        )

        if (response.status === 204) {
          console.log('updated leaderboard succesfully')
          ufetchLeaderboard.fetchleaderboard = true
        }
      }
    }

    const checkIfNeedToLogin = async () => {
      if (localStorage.getItem('canaryLoginToken') === null) {
        // no need to check if token is expired as its the first time they are logging in
        return
      }
      const initialLoginAttempt = await fetch(
        'https://canarytype.azurewebsites.net/api/Canary/Login',
        {
          method: 'GET',
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('canaryLoginToken')
          }
        }
      )

      if (initialLoginAttempt.status === 200) {
        userStore.isLoggedIn = true
        userStore.userName = localStorage.getItem('canaryUserName')
      } else if (initialLoginAttempt.status === 401) {
        console.log('token expired')
        localStorage.removeItem('canaryLoginToken')
        localStorage.removeItem('canaryUserName')
      }
    }

    onMounted(() => {
      getStringToTypeFromBackend()

      checkIfNeedToLogin()
    })

    return {
      stringToType,
      typingStarted,
      typingFinished,
      typingSpeed,
      time,
      startTimer,
      saveResult
    }
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
