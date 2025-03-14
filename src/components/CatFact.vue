<!-- src/components/CatFact.vue -->
<template>
  <div class="wrapper">
    <section class="container">
      <header>
        <h1>🐱 <strong>Random Cat Fact</strong></h1>
      </header>

      <article>
        <p class="fact-text">{{ translatedFact || catFact }}</p>
      </article>

      <!-- Language Selection Dropdown and Button -->
      <div class="language-container">
        <label for="language">Select Language: </label>
        <select id="language" v-model="selectedLanguage" @change="translateFact">
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="de">German</option>
          <option value="hi">Hindi</option>
        </select>

        <button @click="getNewFact">Get New Fact</button>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import axios from "axios";

export default {
  data() {
    return {
      selectedLanguage: "en",  // Default language is English
      translatedFact: ""       // Stores translated fact
    };
  },
  computed: {
    ...mapState(["catFact"]),
  },
  methods: {
    ...mapActions(["loadCatFact"]),
    getNewFact() {
      this.translatedFact = "";  // Reset translation
      this.selectedLanguage = "en"; // Reset dropdown to English
      this.loadCatFact();
    },
    async translateFact() {
      if (this.selectedLanguage === "en") {
        this.translatedFact = ""; // Reset to original if English
        return;
      }

      const API_URL = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(this.catFact)}&langpair=en|${this.selectedLanguage}`;

      try {
        const response = await axios.get(API_URL);
        this.translatedFact = response.data.responseData.translatedText;
      } catch (error) {
        console.error("Translation Error:", error);
      }
    },
  },
};
</script>

<style scoped>
/* Full viewport height and center alignment */
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(120deg, #FFDEE9, #B5FFFC);
  margin: 0;
}

/* Styled card */
.container {
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 500px;
  width: 80%;
}

/* Heading */
h1 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 15px;
}

/* Fact Text */
.fact-text {
  font-size: 18px;
  color: #333;
  margin-bottom: 20px;
}

/* Flex container for dropdown and button */
.language-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px; /* Adjusts spacing between elements */
  margin-top: 15px; /* Adds spacing above the dropdown and button section */
}

/* Dropdown */
select {
  padding: 8px;
  font-size: 16px;
  margin-bottom: 15px;
}

/* Button */
button {
  background: #FF6F61;
  color: white;
  border: none;
  padding: 12px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 8px;
  transition: 0.3s;
  margin-bottom: 15px;
}

button:hover {
  background: #D9534F;
}
</style>
