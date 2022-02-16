import "./styles/styles.scss";

import router from './router';
import ui from './uiManager';
import experienceManager from "./experienceManager";

// Point d'entrée
router.init();
window.addEventListener("load", () => 
{
    ui.init();
    experienceManager.init();

    router.showScreen(0);
});

