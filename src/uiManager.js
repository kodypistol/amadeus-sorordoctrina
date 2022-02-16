import signal from "signal-js";
import router from "./router";

// DOM references
const loadingSection = document.querySelector("#loading-section");
const landingSection = document.querySelector("#landing-section");
const uiManager = {
    init(){
        // Events
        signal.on('changeScreen', this.onChangeScreen);
        loadingSection.addEventListener("click", this.onLoadingQuit);
    },

    onChangeScreen(index){
        
        switch(index){
            case 0:
                loadingSection.classList.add("active");
                landingSection.classList.remove("active");
            case 1:
                loadingSection.classList.remove("active");
                landingSection.classList.add("active");

        }
    },

    onLoadingQuit(){
        router.showScreen(1);
    }
}

export default uiManager;