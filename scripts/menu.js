document.addEventListener('DOMContentLoaded', function() {

    let startBtn = document.getElementById('startBtn');

    startBtn.addEventListener('click', function() {
        let menuContent = document.querySelectorAll('.game-menu');
        let gameContent = document.querySelectorAll('.game');

        menuContent.forEach(element => {
            element.classList.add('hidden');
        });
        gameContent.forEach(element => {
            element.classList.remove('hidden');
        });

        const audio = new Audio('ressources/sounds/music.ogg');
        audio.play()
        launchGame();
    });
});