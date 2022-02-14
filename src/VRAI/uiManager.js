import signal from "signal-js";

const uiManager = {
    init(){
        signal.on('changeScreen', this.onChangeScreen);
    },

    onChangeScreen(index){
        console.log("UI : change screen to " + index);
    }
}

export default uiManager;