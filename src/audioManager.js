import { Howl } from "howler";
import router from "./router";

const goToActButtons = document.getElementsByClassName("goToActButton");
// const btn3 = document.querySelector("#btn-3");
// const btn5 = document.querySelector("#btn-5");
// const btn7 = document.querySelector("#btn-7");

console.log("11111111111111111111");
var maVal = 0;
const audioManager = {
  init() {
    Array.from(goToActButtons).forEach((button) => {
      // for (var i = 0; i < goToActButtons.length; i++) {
      //   var button = goToActButtons[i];
      console.log(button);
      button.addEventListener("click", (event) => {
        console.log("event", event.target.attributes.value.value);
        router.showScreen(Number(event.target.attributes.value.value));
        console.log("ICI router.getCurrentScene()=", router.getCurrentScene());

        this.chooseSong();
      });
      // }
    });

    // btn3.addEventListener("click", () => {
    //   router.showScreen(4);
    //   this.chooseSong();
    // });
    // btn5.addEventListener("click", () => {
    //   router.showScreen(6);
    //   this.chooseSong();
    // });
    // btn7.addEventListener("click", () => {
    //   router.showScreen(8);
    //   this.chooseSong();
    // });
  },
  playVoice(actNumber, nextScene) {
    console.log("voice playing " + actNumber);
    const sound = new Howl({
      src: [`./audio/act-${actNumber}.mp3`],
      onplay: function () {
        console.log("voice beginning");
      },
      onend: function () {
        console.log("voice finished");
        router.showScreen(nextScene);
      },
    });
    sound.play();
  },

  chooseSong() {
    // this.playVoice(router.getCurrentScene()/2-1, router.getCurrentScene()+1);
    console.log("router.getCurrentScene()=", router.getCurrentScene());
    switch (router.getCurrentScene()) {
      case 4:
        this.playVoice(1, 5);
        break;
      case 6:
        this.playVoice(2, 7);
        break;
      case 8:
        this.playVoice(3, 9);
        break;
    }
  },
};

export default audioManager;
