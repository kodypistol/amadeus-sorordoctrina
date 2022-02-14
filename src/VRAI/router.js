import signal from "signal-js";

const router = {
    init(){
        this.currentScreen = 0;
    },

    showScreen(index){
        this.currentScreen = index;
        signal.emit('changeScreen', index);
    }
}

export default router;