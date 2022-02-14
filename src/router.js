import signal from "signal-js";

const router = {
    init(){
        this.currentScreen = 0;
    },

    showScreen(index){
        this.currentScreen = index;
        console.log("Changing screen to " + index);
        signal.emit('changeScreen', index);
    }
}

export default router;