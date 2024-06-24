const app = Vue.createApp({
  /********************************* DATA *********************************/
  data() {
    return {
      drink: '',
      show_drink: false,
      show_recipe: false
    }
  },
  mounted() {
    // Add a visibility change event listener
    document.addEventListener("visibilitychange", this.handleVisibilityChange);
  },

  /********************************* METHODS *********************************/
  methods: {
    async selectDrink(){
        const files = [
          './assets/data/build-a.json',
          './assets/data/build-b.json',
          './assets/data/dryshake.json',
          './assets/data/muddler.json',
          './assets/data/stir-strain.json',
          './assets/data/shake-strain.json'
        ];
    
        try {
          // Fetch all files and combine their contents into a single array
          const allElements = [];
          for (const file of files) {
            const response = await fetch(file);
            const elements = await response.json();
            allElements.push(...elements);
          }
    
          // Select a random element from the combined array
          const randomIndex = Math.floor(Math.random() * allElements.length);
          this.drink = allElements[randomIndex];
          this.show_drink = true;
          this.show_recipe = false;
        } catch (error) {
          console.error('Error fetching elements:', error);
        }
      },
      alternate_cards(){
        this.show_drink = !this.show_drink;
        this.show_recipe = !this.show_drink;
      }
    },
  /******************************** COMPUTED PROPERTIES *****************************/
  computed: {
    timerDisplay() {
      const minutes = this.minutes < 10 ? '0' + this.minutes : this.minutes;
      const seconds = this.seconds < 10 ? '0' + this.seconds : this.seconds;
      return minutes + ':' + seconds;
    }
  },
  /********************************* WATCHERS  *********************************/
  watch: {
    /* handles break/session ending */
    seconds(currentValue) {
      // timer hass reached 0
      if (currentValue === -1 && this.minutes === 0) {
        this.playSound();
        // switch between session and rest modes when timer reaches zero
        this.timerType = (this.timerType === 'session') ? 'rest' : 'session';
        this.timerType === 'rest' ? this.startRest() : this.startCountdown(mode = 'onGoing');
      }
    }
  }
});

const mountedApp = app.mount('#app');
