const router = {
    init(){
        this.currentScreen = 0;
    },

    showScreen(index){
        this.currentScreen = index;
    }
}

export default router;