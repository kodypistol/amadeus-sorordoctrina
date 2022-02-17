import signal from "signal-js";
import router from "./router";

// DOM references
const playableSections = document.querySelectorAll("section.playable-section");
const backgroundContainer = document.querySelector("div#background");

const subtitlesContainer = document.querySelector("div#subtitles-container");
const subtitlesButton = document.querySelector("button#subtitles-toggle");
const subtitlesContent = document.querySelector("p#subtitles-content");

const subtitles = [
  "*Une voix mystérieuse prend la parole :* Maria Anna Mozart, bienvenue dans ton inter vitam. Il te reste une dernière étape avant le repos éternel. Aujourd’hui, il est temps de révéler le secret que tu as gardé au fond de toi toutes ces années.",
  "Tout commence dès ma naissance, en 1751. Père, lui-même musicien, me fait découvrir la musique très tôt. Rapidement, plus qu’un passe-temps, elle devient ma passion et mes parents sont fiers de moi. Interprétation au clavecin, composition d'œuvres.",
  "Mais, dès 1769, mes 18 ans atteints, le regard de père change. Selon lui, je deviens une femme et ma place n’est plus sur scène, je dois rejoindre le foyer et me marier. Je me retrouve donc déléguée au second plan, tandis que mon frère, lui, continue à briller au travers.",
  "Le temps passe, et on se retrouve en 1791. Wolfgang vit désormais à Vienne avec sa femme. De mon côté, mes pensées sombres se transforment en un véritable plan d’action. Alors je lève les voiles et je pars en direction de la capitale autrichienne. En suivant mon",
];

const uiManager = {
    init() {
        // Events
        signal.on("changeScreen", this.onChangeScreen);

        document.querySelector("button#open-infos").addEventListener("click", () => {router.showScreen(3)});
        document.querySelector("button#close-infos").addEventListener("click", () => {router.showScreen(1)});
        document.querySelector("button#start-exp-btn").addEventListener("click", () => {router.showScreen(2)});
        document.querySelector("button#back-menu-btn").addEventListener("click", () => {router.showScreen(1)});
        subtitlesButton.addEventListener("click", this.onToggleSubtitles);

        
        // Close act popup buttons
        document.querySelectorAll("button.playSong").forEach((btn) => {
          btn.addEventListener("click", () => {          
            document.querySelector("section#act1").classList.remove("active");
            document.querySelector("section#act2").classList.remove("active");
            document.querySelector("section#act3").classList.remove("active");
          });
        });
    },

    onChangeScreen(index){
      // Playables sections
      for(let i = 0; i < playableSections.length; i++){
        if(i == index)
          playableSections[i].classList.add("active");
        else
          playableSections[i].classList.remove("active");
      }

      // Subtitles
      if(index > 3 && index < 8) {
        if(index == 4) {
          subtitlesButton.classList.add("active"); // Show subtitles toggle
        }
        
        subtitlesContent.innerHTML = subtitles[index - 4]; // Update subtitles text
      }
      else // Don't show subtitle toggle if there is no subtitles
        subtitlesButton.classList.remove("active");
      
      // Background positions and colors
      backgroundContainer.className = "step-" + index;
    },

  onToggleSubtitles() {
      subtitlesContainer.classList.toggle("active");
  }
};

export default uiManager;