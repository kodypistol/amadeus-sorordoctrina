import signal from "signal-js";

const uiManager = {
    init(){
        signal.on('changeScreen', this.onChangeScreen);
    },

    onChangeScreen(index){
    }
}

export default uiManager;