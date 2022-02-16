import { Howl } from "howler";
import router from "./router";

const playSongsButtons = document.getElementsByClassName("playSong");
const actPopups = document.getElementsByClassName("act");

const audioManager = {
  init() {
    for (let i = 0; i < playSongsButtons.length; i++) {
      playSongsButtons[i].addEventListener("click", () => {
        this.chooseSong();
        actPopups[i].style.display = "none";
      });
    }
    // Array.from(playSongsButtons).forEach((button) => {
    //   button.addEventListener("click", () => {
    //     this.chooseSong();
    //   });
    // });
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
      case 4:
        this.playVoice(1, 5);
        break;
      case 5:
        this.playVoice(2, 6);
        break;
      case 6:
        this.playVoice(3, 7);
        break;
    }
  },
};

export default audioManager;
