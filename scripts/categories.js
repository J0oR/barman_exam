const app = Vue.createApp({
  /********************************* DATA *********************************/
  data() {
    return {
      techniques: ["build (summer)", "build", "muddler", "dryshake", "shake-strain", "stir-strain", "mocktails"],
      icons: ["build-summer.png", "build.png", "muddler.webp", "dryshake.webp", "shaker.png", "stir-strain.png", "mocktails.webp"]
    }
  },
  beforeMount() {
    for (let i = 0; i < this.icons.length; i++) {
      this.icons[i] = `./assets/icon/techniques/${this.icons[i]}`;
    }
  },

  /********************************* METHODS *********************************/
  methods: {
  },
  /******************************** COMPUTED PROPERTIES *****************************/
  computed: {
  },
  /********************************* WATCHERS  *********************************/
  watch: {
  }
});

const mountedApp = app.mount('#app');

