import "./styles/styles.scss";

import router from './router';
import ui from './uiManager';
import audioManager from './audioManager';
import experienceManager from "./experienceManager";

// Point d'entrée
router.init();
window.addEventListener("load", () =>
{
    ui.init();
    experienceManager.init();
    audioManager.init();

    router.showScreen(0);
});