const app = Vue.createApp({
  /********************************* DATA *********************************/
  data() {
    return {
      drinkData: [], // Variable to store all drink data
      drink: '',
      filterText: '',
      filteredItems: [],
      mode: 'name',
      showRecipe: [] // Array to track the visibility of recipes
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
    toggleRecipe(index) {
      this.showRecipe = [...this.showRecipe.slice(0, index), !this.showRecipe[index], ...this.showRecipe.slice(index + 1)];
    },
    resetBar(){
      if (this.mode === 'name') {
        this.filteredItems = this.drinkData.filter(item =>
          item["name"].toLowerCase().includes(this.filterText.toLowerCase())
        );
      } else if (this.mode === 'ingredient') {
        this.filteredItems = this.drinkData.filter(item => {
          const hasRecipe = Array.isArray(item.recipe) && item.recipe.some(ingredient =>
            typeof ingredient["ing"] === 'string' && ingredient["ing"].toLowerCase().includes(this.filterText.toLowerCase())
          );
          const hasGarnish = Array.isArray(item.garnish) && item.garnish.some(garnish =>
            typeof garnish["ing"] === 'string' && garnish["ing"].toLowerCase().includes(this.filterText.toLowerCase())
          );
          return hasRecipe || hasGarnish;
        });
      }
      // Initialize showRecipe array based on the filtered items
      this.showRecipe = this.filteredItems.map(() => false);
    }
  },
  /******************************** COMPUTED PROPERTIES *****************************/
  computed: {
   /*  adjustedImagePath() {
      if (this.drink && this.drink.img && this.drink.img.startsWith('../')) {
        return this.drink.img.substring(1);  // Remove the first dot (.)
      } else {
        return this.drink.img;  // Return the image path as is
      }
    }, */
    searchMode(){
      return "Search by " + this.mode;
    }
  },
  watch: {
    filterText(newVal) {
      if (this.mode === 'name') {
        this.filteredItems = this.drinkData.filter(item =>
          item["name"].toLowerCase().includes(newVal.toLowerCase())
        );
      } else if (this.mode === 'ingredient') {
        this.filteredItems = this.drinkData.filter(item => {
          const hasRecipe = Array.isArray(item.recipe) && item.recipe.some(ingredient =>
            typeof ingredient["ing"] === 'string' && ingredient["ing"].toLowerCase().includes(newVal.toLowerCase())
          );
          const hasGarnish = Array.isArray(item.garnish) && item.garnish.some(garnish =>
            typeof garnish["ing"] === 'string' && garnish["ing"].toLowerCase().includes(newVal.toLowerCase())
          );
          return hasRecipe || hasGarnish;
        });
      }
      // Initialize showRecipe array based on the filtered items
      this.showRecipe = this.filteredItems.map(() => false);
    }
  },  
  /********************************* LIFECYCLE HOOKS *****************************/
  created() {
    // Fetch drink data before mounting
    this.fetchDrinkData();
  }
});

const mountedApp = app.mount('#app');
