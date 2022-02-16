import signal from "signal-js";

const router = {
  init() {
    this.currentScreen = 0;
  },

  showScreen(index) {
    this.currentScreen = index;
    console.log("Changing screen to " + index);
    signal.emit("changeScreen", index);
  },

  getCurrentScene() {
    return this.currentScreen;
  },
};

export default router;
