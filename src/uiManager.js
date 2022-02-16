import signal from "signal-js";
import router from "./router";

// case 0 : Loading screen
// case 1 : Main menu
// case 2 : Start screen
// case 3 : Informations
// case 4 : Popup acte 1
// case 5 : Popup acte 2
// case 6 : Popup acte 3
// case 7 : End screen

// DOM references
const loadingSection = document.querySelector("section#loading-section");
const landingSection = document.querySelector("section#landing-section");
const startingSection = document.querySelector("section#starting-section");
const infosSection = document.querySelector("section#infos-section");

const act1Section = document.querySelector("section#act1");
const act2Section = document.querySelector("section#act2");
const act3Section = document.querySelector("section#act3");
const actPopupCloseBtns = document.querySelectorAll("button.playSong");

const backgroundContainer = document.querySelector("div#background");

const subtitlesContainer = document.querySelector("div#subtitles-container");
const subtitlesButton = document.querySelector("button#subtitles-toggle");

const uiManager = {
    init() {
        // Events
        signal.on("changeScreen", this.onChangeScreen);
        loadingSection.addEventListener("click", this.onCloseInfos);

        document.querySelector("button#open-infos").addEventListener("click", this.onOpenInfos);
        document.querySelector("button#close-infos").addEventListener("click", this.onCloseInfos);
        document.querySelector("button#start-exp-btn").addEventListener("click", this.onStartExp);
    
        subtitlesButton.addEventListener("click", this.onToggleSubtitles);

        for(let i = 0; i < actPopupCloseBtns.length; i++){
            actPopupCloseBtns[i].addEventListener("click", this.onCloseActPopup());
        }
    },

    onChangeScreen(index){
        // Active / unactive DOM
        switch(index){
            case 0:
                loadingSection.classList.add("active");
                landingSection.classList.remove("active");
                startingSection.classList.remove("active");
                infosSection.classList.remove("active");
                act1Section.classList.remove("active");
                act2Section.classList.remove("active");
                act3Section.classList.remove("active");
                break;
            case 1:
                loadingSection.classList.remove("active");
                landingSection.classList.add("active");
                startingSection.classList.remove("active");
                infosSection.classList.remove("active");
                break;
            case 2:
                loadingSection.classList.remove("active");
                landingSection.classList.remove("active");
                startingSection.classList.add("active");
                infosSection.classList.remove("active");
                act1Section.classList.remove("active");
                act2Section.classList.remove("active");
                act3Section.classList.remove("active");
                break;
            case 3:
                loadingSection.classList.remove("active");
                landingSection.classList.remove("active");
                startingSection.classList.remove("active");
                infosSection.classList.add("active");
                act1Section.classList.remove("active");
                act2Section.classList.remove("active");
                act3Section.classList.remove("active");
                break;
            case 4:
                loadingSection.classList.remove("active");
                landingSection.classList.remove("active");
                startingSection.classList.remove("active");
                infosSection.classList.remove("active");
                act1Section.classList.remove("active");
                act2Section.classList.remove("active");
                act3Section.classList.remove("active");
                subtitlesButton.classList.add("active");
                break;
            case 5:
                loadingSection.classList.remove("active");
                landingSection.classList.remove("active");
                startingSection.classList.remove("active");
                infosSection.classList.remove("active");
                act1Section.classList.add("active");
                act2Section.classList.remove("active");
                act3Section.classList.remove("active");
                break;
            case 6:
                loadingSection.classList.remove("active");
                landingSection.classList.remove("active");
                startingSection.classList.remove("active");
                infosSection.classList.remove("active");
                act1Section.classList.remove("active");
                act2Section.classList.add("active");
                act3Section.classList.remove("active");
                break;
            case 7:
                loadingSection.classList.remove("active");
                landingSection.classList.remove("active");
                startingSection.classList.remove("active");
                infosSection.classList.remove("active");
                act1Section.classList.remove("active");
                act2Section.classList.remove("active");
                act3Section.classList.add("active");
                break;
        }

        // Update background positions
        backgroundContainer.className = "step-" + index;
    },

  onOpenInfos() {
    router.showScreen(3);
  },

  onCloseInfos() {
    router.showScreen(1);
  },

  onCloseActPopup() {
    act1Section.classList.remove("active");
    act2Section.classList.remove("active");
    act3Section.classList.remove("active");
  },

  onStartExp() {
    router.showScreen(2);
    setTimeout(() => {
      router.showScreen(4);
    }, 3000);
  },

  onToggleSubtitles() {
      subtitlesContainer.classList.toggle("active");
  },

  hideSubtitles() {
      subtitlesContainer.classList.remove("active");
  }
};

export default uiManager;
