import { Howl } from "howler";
import router from "./router";

const playSongsButtons = document.getElementsByClassName("playSong");

const audioManager = {
  init() {
    Array.from(playSongsButtons).forEach((button) => {
      button.addEventListener("click", () => {
        this.chooseSong();
        // display none pop up act
      });
    });
  },
  playVoice(actNumber, nextScene) {
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
    switch (router.getCurrentScene()) {
      case 3:
        this.playVoice(1, 4);
        break;
      case 4:
        this.playVoice(2, 5);
        break;
      case 5:
        this.playVoice(3, 6);
        break;
    }
  },
};

export default audioManager;
