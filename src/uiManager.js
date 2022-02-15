import signal from "signal-js";
import router from "./router";

// DOM references
const loadingSection = document.querySelector("#loading-section");
const landingSection = document.querySelector("#landing-section");
// Tests pour audio
const s2 = document.querySelector("#s2");
const s3 = document.querySelector("#s3");
const s4 = document.querySelector("#s4");
const s5 = document.querySelector("#s5");
const s6 = document.querySelector("#s6");

const uiManager = {
  init() {
    // Events
    signal.on("changeScreen", this.onChangeScreen);
    loadingSection.addEventListener("click", this.onLoadingQuit);
  },

  onChangeScreen(index) {
    switch (index) {
      case 0:
        loadingSection.classList.add("active");
        landingSection.classList.remove("active");
        break;
      case 1:
        loadingSection.classList.remove("active");
        landingSection.classList.add("active");
        break;
      //test pour audio, faire une boucle
      case 2:
        s2.classList.add("active");
        landingSection.classList.remove("active");
        break;
      case 3:
        s2.classList.remove("active");
        s3.classList.add("active");
        break;
      case 4:
        s4.classList.add("active");
        s3.classList.remove("active");
        break;
      case 5:
        s4.classList.remove("active");
        s5.classList.add("active");
        break;
      case 6:
        s6.classList.add("active");
        s5.classList.remove("active");
        break;
    }
  },

  onLoadingQuit() {
    router.showScreen(1);
  },
};

export default uiManager;
