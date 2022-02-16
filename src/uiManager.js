import signal from "signal-js";
import router from "./router";

// DOM references
const loadingSection = document.querySelector("section#loading-section");
const landingSection = document.querySelector("section#landing-section");
const startingSection = document.querySelector("section#starting-section");
const infosSection = document.querySelector("section#infos-section");

const backgroundContainer = document.querySelector("div#background");

const uiManager = {
    init(){
        // Events
        signal.on('changeScreen', this.onChangeScreen);
        loadingSection.addEventListener("click", this.onCloseInfos);

        document.querySelector("button#open-infos").addEventListener("click", this.onOpenInfos);
        document.querySelector("button#close-infos").addEventListener("click", this.onCloseInfos);
        document.querySelector("button#start-exp-btn").addEventListener("click", this.onStartExp);
    },

    onChangeScreen(index){
        // Active / unactive DOM
        switch(index){
            case 0:
                loadingSection.classList.add("active");
                landingSection.classList.remove("active");
                startingSection.classList.remove("active");
                infosSection.classList.remove("active");
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
                break;
            case 3:
                loadingSection.classList.remove("active");
                landingSection.classList.remove("active");
                startingSection.classList.remove("active");
                infosSection.classList.add("active");
                break;
        }

        // Update background positions
        backgroundContainer.className = "step-" + index;
    },

    onOpenInfos(){
        router.showScreen(3);
    },

    onCloseInfos(){
        router.showScreen(1);
    },

    onStartExp(){
        router.showScreen(2);
        setTimeout(() => {
            router.showScreen(3);
        }, 3000);
    }
};

export default uiManager;
