import router from "./router";
import ui from "./uiManager";
import experience from "./experienceManager";

// point d'entrée
router.init();
ui.init();
experience.init();

router.showScreen(0);