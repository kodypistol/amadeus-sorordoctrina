const ui = {
    init() {
        signal.on('goto', this.goto);
    },
    goto (chapterIndex) {
        this.screens[chapterIndex].style.display = "block";
    }
}

export default ui
