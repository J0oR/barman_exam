const app = Vue.createApp({
  /********************************* DATA *********************************/
  data() {
    return {
      drinkData: [], // Variable to store all drink data
      drink: '',
      filterText: '',
      filteredItems: [],
    }
  },
  /********************************* METHODS *********************************/
  methods: {
    async fetchDrinkData() {
      const files = [
        '../assets/data/build-a.json',
        '../assets/data/build-b.json',
        '../assets/data/dryshake.json',
        '../assets/data/muddler.json',
        '../assets/data/stir-strain.json',
        '../assets/data/shake-strain.json',
        '../assets/data/mocktails.json'
      ];

      try {
        // Fetch all files and combine their contents into a single array
        const allElements = [];
        for (const file of files) {
          const response = await fetch(file);
          const elements = await response.json();
          allElements.push(...elements);
        }

        // Store all drink data in drinkData
        this.drinkData = allElements;
      } catch (error) {
        console.error('Error fetching elements:', error);
      }
    },
  },
  /******************************** COMPUTED PROPERTIES *****************************/
  computed: {
    adjustedImagePath() {
      if (this.drink && this.drink.img && this.drink.img.startsWith('../')) {
        return this.drink.img.substring(1);  // Remove the first dot (.)
      } else {
        return this.drink.img;  // Return the image path as is
      }
    }
  },
  watch: {
    filterText(newVal) {
      console.log(newVal);
      this.filteredItems = this.drinkData.filter(item =>
        item["name"].toLowerCase().startsWith(newVal.toLowerCase())
      );
    }
  },
  /********************************* LIFECYCLE HOOKS *****************************/
  created() {
    // Fetch drink data before mounting
    this.fetchDrinkData();
  }
});

const mountedApp = app.mount('#app');
