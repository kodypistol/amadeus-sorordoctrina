import { Howl } from "howler";
import router from "./router";

const playSongsButtons = document.getElementsByClassName("playSong");

const audioManager = {
  init() {
    Array.from(playSongsButtons).forEach((button) => {
      button.addEventListener("click", () => {
        this.chooseSong();
      });
    });
  },
  playVoice(actNumber, nextScene) {
    const sound = new Howl({
      src: [`./audio/act-${actNumber}.mp3`],
      onplay: function () {
        console.log(`voice ${actNumber} beginning`);
      },
      onend: function () {
        console.log(`voice ${actNumber} finished`);
        router.showScreen(nextScene);
      },
    });
    sound.play();
  },

  chooseSong() {
    switch (router.getCurrentScene()) {
      // intro
      case 4:
        this.playVoice(0, 5);
        break;
      // act1
      case 5:
        this.playVoice(1, 6);
        break;
      // act2
      case 6:
        this.playVoice(2, 7);
        break;
      // act3
      case 7:
        this.playVoice(3, 8);
        break;
    }
  },
};

export default audioManager;