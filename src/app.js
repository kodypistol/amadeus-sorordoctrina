import './styles/styles.scss';
import router from "./router";
import ui from "./uiManager";
import experience from "./experienceManager";

// Point d'entrée
router.init();
window.addEventListener("load", () => 
{
    ui.init();
    //experience.init();

    router.showScreen(0);
});