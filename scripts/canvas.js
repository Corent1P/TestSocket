document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("glcanvas");
    const ctx = canvas.getContext("2d");

    const backgroundImage = new Image();
    backgroundImage.src = "../ressources/img/backgroundGame.png";

    const obstacleTexture = new Image();
    obstacleTexture.src = "../ressources/img/obstacle1.png";

    const coinTexture = new Image();
    coinTexture.src = "../ressources/img/coins.png";

    const goldCoinTexture = new Image();
    goldCoinTexture.src = "../ressources/img/goldCoins.png";

    const tandemTexture = new Image();
    tandemTexture.src = "../ressources/img/tandem.png";

    let score = 0;

    function initCanvas() {
        if (window.innerWidth > 600) {
            canvas.width = 580;
            canvas.height = 580;
        } else {
            canvas.width = window.innerWidth - 10;
            canvas.height = 580;
        }
    }

    initCanvas();

    const tandem = {
        x: canvas.width / 8,
        y: canvas.height / 10 * 8,
        width: 50,
        height: 50,
        color: "black",
        speed: canvas.width / 4,
        lane: 0,
        targetX: canvas.width / 8,
    };

    const obstacles = [];
    const coins = [];

    let lastRowCreationTime = 0;
    let gamePaused = false;
    let gameOver = false;
    let backgroundY = 0; // Variable to control the background position

    function isColliding(tanLane, tanY, objLane, objY, objHeight) {
        return tanLane == objLane &&
            (tanY < objY + objHeight && tanY > objY);
    }

    function drawBackground() {
        ctx.drawImage(backgroundImage, 0, backgroundY, canvas.width, canvas.height);
        ctx.drawImage(backgroundImage, 0, backgroundY - canvas.height, canvas.width, canvas.height);
    }

    function drawObstacles() {
        for (let i = obstacles.length - 1; i >= 0; i--) {
            const obstacle = obstacles[i];
            const imageWidth = obstacle.width;
            const imageHeight = obstacle.height;

            ctx.drawImage(
                obstacleTexture,
                obstacle.x,
                obstacle.y,
                imageWidth,
                imageHeight
            );

            obstacle.y += obstacle.speed;

            if (obstacle.y > canvas.height) {
                obstacles.splice(i, 1);
            }

            if (!gameOver && isColliding(tandem.lane, tandem.y, obstacle.lane, obstacle.y, obstacle.height)) {
                console.log("Obstacle Collision");
                gameOver = true;
                showScoreboard();
            }
        }
    }

    function drawCoins() {
        for (let i = coins.length - 1; i >= 0; i--) {
            const coin = coins[i];
            const imageWidth = coin.width * 0.50;
            const imageHeight = coin.height * 0.50;

            if (coin.gold) {
                ctx.drawImage(
                    goldCoinTexture,
                    coin.x + imageWidth / 2,
                    coin.y + imageHeight / 2,
                    imageWidth,
                    imageHeight
                );
            } else {
                ctx.drawImage(
                    coinTexture,
                    coin.x + imageWidth / 2,
                    coin.y + imageHeight / 2,
                    imageWidth,
                    imageHeight
                );
            }

            coin.y += coin.speed;

            if (coin.y > canvas.height) {
                coins.splice(i, 1);
            }

            if (!gameOver && isColliding(tandem.lane, tandem.y, coin.lane, coin.y, coin.height)) {
                coins.splice(i, 1);
                if (coin.gold) {
                    console.log("Gold Collision");
                    score += 5;
                } else {
                    console.log("Coin Collision");
                    score += 1;
                }
            }
        }
    }

    function createRow() {
        const currentTime = Date.now();
        if (currentTime - lastRowCreationTime < 1500 || gamePaused)
            return;

        const laneChoice = [];
        for (let i = 0; i < 4; i++) {
            laneChoice.push(0);
        }

        let nbObject = Math.floor(Math.random() * 10);
        if (nbObject >= 1 && nbObject <= 3)
            nbObject = 1;
        if (nbObject >= 4 && nbObject <= 6)
            nbObject = 2;
        if (nbObject >= 7 && nbObject <= 9)
            nbObject = 3;

        for (let j = 0; j < nbObject; j++) {
            const _lane = Math.floor(Math.random() * 4);
            laneChoice[_lane] = 1;
        }

        for (let k = 0; k < 4; k++) {
            if (laneChoice[k] == 0 && Math.floor(Math.random() * 10) == 0) {
                laneChoice[k] = 2;
            }
        }

        for (let i = 0; i < 4; i++) {
            const xPosition = (canvas.width / 4) * i + (canvas.width / 8) - 60;

            if (laneChoice[i] == 1) {
                const newObstacle = {
                    x: xPosition,
                    y: -120,
                    width: 120,
                    height: 120,
                    color: "blue",
                    speed: canvas.height / 250,
                    lane: i,
                };
                obstacles.push(newObstacle);
            }

            if (laneChoice[i] == 2) {
                const newCoin = {
                    x: xPosition,
                    y: -120,
                    width: 120,
                    height: 120,
                    color: "red",
                    speed: canvas.height / 250,
                    lane: i,
                    gold: Math.floor(Math.random() * 5) == 0,
                };
                coins.push(newCoin);
            }
        }
        lastRowCreationTime = currentTime;
    }

    function clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function update() {
        clearCanvas();
        drawBackground();
        drawTandem();
        drawObstacles();
        drawCoins();
    }

    function drawTandem() {
        const deltaX = tandem.targetX - tandem.x;
        const easing = 0.2; // Adjust the easing for a smoother effect
        tandem.x += deltaX * easing;

        ctx.drawImage(
            tandemTexture,
            tandem.x - 100,
            tandem.y - 100,
            200,
            200
        );
    }

    function handleKeyPress(event) {
        const keyCode = event.keyCode;
        if (keyCode == 27) {
            if (!gameOver) {
                if (gamePaused) {
                    gamePaused = false;
                    animate();
                } else {
                    gamePaused = true;
                    showPauseMenu();
                }
            }
        } else if (keyCode == 68 || keyCode == 39) {
            if (tandem.lane < 3 && !gamePaused && !gameOver) {
                tandem.targetX += tandem.speed;
                tandem.lane++;
            }
        } else if (keyCode == 81 || keyCode == 37) {
            if (tandem.lane > 0 && !gamePaused && !gameOver) {
                tandem.targetX -= tandem.speed;
                tandem.lane--;
            }
        }
    }

    function showPauseMenu() {
        ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "white";
        ctx.font = "30px Arial";
        ctx.fillText("Game Paused", canvas.width / 2 - 100, canvas.height / 2 - 50);

        // Draw Resume button
        ctx.fillRect(canvas.width / 2 - 75, canvas.height / 2, 150, 40);
        ctx.fillStyle = "black";
        ctx.font = "20px Arial";
        ctx.fillText("Resume", canvas.width / 2 - 35, canvas.height / 2 + 25);
    }

    function showScoreboard() {
        ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "white";
        ctx.font = "30px Arial";
        ctx.fillText("Game Over", canvas.width / 2 - 90, canvas.height / 2 - 50);

        // Display Score
        ctx.font = "20px Arial";
        ctx.fillText("Score: " + score, canvas.width / 2 - 40, canvas.height / 2);

        // Draw Restart button
        ctx.fillRect(canvas.width / 2 - 75, canvas.height / 2 + 50, 150, 40);
        ctx.fillStyle = "black";
        ctx.font = "20px Arial";
        ctx.fillText("Restart", canvas.width / 2 - 35, canvas.height / 2 + 75);
    }

    function handleCanvasClick(event) {
        const rect = canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        if (gameOver) {
            // Check if the click is within the Restart button area
            if (
                mouseX > canvas.width / 2 - 75 &&
                mouseX < canvas.width / 2 + 75 &&
                mouseY > canvas.height / 2 + 50 &&
                mouseY < canvas.height / 2 + 90
            ) {
                restartGame();
            }
        } else if (gamePaused) {
            // Check if the click is within the Resume button area
            if (
                mouseX > canvas.width / 2 - 75 &&
                mouseX < canvas.width / 2 + 75 &&
                mouseY > canvas.height / 2 &&
                mouseY < canvas.height / 2 + 40
            ) {
                gamePaused = false;
                animate();
            }
        }
    }

    function restartGame() {
        score = 0;
        gameOver = false;
        obstacles.length = 0;
        coins.length = 0;
        animate();
    }

    window.addEventListener("keydown", handleKeyPress);
    canvas.addEventListener("click", handleCanvasClick);

    // Clock system for regular canvas updates
    function animate() {
        if (!gamePaused && !gameOver) {
            update();
            createRow();
            backgroundY += canvas.height / 250; // Move the background downward
            if (backgroundY >= canvas.height) {
                backgroundY = 0; // Reset the background position when it reaches the bottom
            }
            requestAnimationFrame(animate);
        }
    }

    // Start the animation loop
    animate();
});
