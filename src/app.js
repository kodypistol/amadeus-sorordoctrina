import './styles/styles.scss';
import router from "./router";
import ui from "./uiManager";
import experience from "./archives/experienceManager";

// point d'entrée
router.init();
ui.init();
experience.init();

router.showScreen(0);
