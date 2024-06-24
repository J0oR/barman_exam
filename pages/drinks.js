const app = Vue.createApp({
  /********************************* DATA *********************************/
  data() {
    return {
      techniqueId: null,
      techniques: { 0: "build-a.json", 1: "build-b.json", 2: "muddler.json", 3: "dryshake.json", 4: "shake-strain.json", 5: "stir-strain.json" },
      drinks: null,
      groupedDrinks: null,
      modalDrink: "",
      modalShow: false,
      method:"",
      showMethod: false
    }
  },
  beforeMount() {
    const urlParams = new URLSearchParams(window.location.search);
    this.techniqueId = urlParams.get('id');
    console.log(this.techniqueId);

    this.fetchMethod();
    // Fetch technique data based on techniqueId
    this.fetchTechniqueData();
  },

  /********************************* METHODS *********************************/
  methods: {
    async fetchMethod() {
      const filePath = '../assets/data/methods.json'; // Replace with your actual file path

      try {
        const response = await fetch(filePath);
        const data = await response.json();
          this.method = data[this.techniqueId];
          console.log(this.method);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    },
    async fetchTechniqueData() {
      if (!this.techniqueId || !(this.techniqueId in this.techniques)) {
        console.error(`Technique ID ${this.techniqueId} not found in techniques.`);
        return;
      }

      const filename = this.techniques[this.techniqueId];
      const filePath = `../assets/data/${filename}`;

      try {
        const response = await fetch(filePath);
        if (!response.ok) {
          throw new Error(`Failed to fetch ${filePath}: ${response.status} ${response.statusText}`);
        }
        this.drinks = await response.json();
        console.log("Technique Data:", this.drinks);

        // Assign unique family to drinks without a family
        this.drinks.forEach((drink, index) => {
          if (!drink.family) {
            drink.family = `No Family ${index + 1}`;
          }
        });

        // Group drinks by their 'family' field into a nested object
        const groupedDrinks = this.drinks.reduce((acc, drink) => {
          const family = drink.family;
          if (!acc[family]) {
            acc[family] = {
              family: family,
              drinks: {}
            };
          }
          acc[family].drinks[drink.name] = drink;
          return acc;
        }, {});

        console.log("Grouped Drinks by Family:", groupedDrinks);
        this.groupedDrinks = groupedDrinks; // Store the grouped drinks
      } catch (error) {
        console.error("Error fetching technique data:", error.message);
      }
    },
    openModal(drink) {
      this.modalDrink = drink;
      this.modalShow = !this.modalShow;
      console.log(this.modalDrink.name);
      this.$nextTick(() => {
        this.$refs.modal.scrollTop = 0;
      });
    },
    closeModal() {
      this.modalShow = false;
      this.modalDrink = null;
    }
  },

  /******************************** COMPUTED PROPERTIES *****************************/
  computed: {
  },
  /********************************* WATCHERS  *********************************/
  watch: {
  }
});

const mountedApp = app.mount('#app');

