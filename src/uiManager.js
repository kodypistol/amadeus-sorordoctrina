import signal from "signal-js";
import router from "./router";

// DOM references
const landingSection = document.querySelector("#landing-section");
const loadingSection = document.querySelector("#loading-section");

const uiManager = {
    init(){
        // Events
        signal.on('changeScreen', this.onChangeScreen);
        landingSection.addEventListener("click", this.onLoadingQuit);
    },

    onChangeScreen(index){
        switch(index){
            case 0:
                landingSection.classList.add("active");
                loadingSection.classList.remove("active");
            case 1:
                landingSection.classList.remove("active");
                loadingSection.classList.add("active");

        }
    },

    onLoadingQuit(){
        router.showScreen(1);
    }
}

export default uiManager;