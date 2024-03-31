const audio = new Audio();
audio.src = "bom_dia_numero_2.mp3";
audio.volume = 0.1;
audio.loop = true;
audio.play();

const paddleHitSound = new Audio('hitpong.mp3'); 
const scoreSound = new Audio('pointpong.mp3');
const winSound = new Audio('win.mp3');

const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 600;
canvas.height = 400;

const paddleWidth = 10;
const paddleHeight = 60;
let leftPaddleY = (canvas.height - paddleHeight) / 2;
let rightPaddleY = (canvas.height - paddleHeight) / 2;
const paddleSpeed = 4;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 5;
let ballSpeedY = 3;
const ballSize = 10;
let playerScore = 0;
let computerScore = 0;

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Desenha as raquetes
    ctx.fillStyle = '#FFF';
    ctx.fillRect(0, leftPaddleY, paddleWidth, paddleHeight);
    ctx.fillRect(canvas.width - paddleWidth, rightPaddleY, paddleWidth, paddleHeight);
    // Desenha a bola
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballSize, 0, Math.PI*2);
    ctx.fill();
    // Atualiza a posição da bola
    ballX += ballSpeedX;
    ballY += ballSpeedY;
    // Colisões com as paredes superior e inferior
    if (ballY + ballSize > canvas.height || ballY - ballSize < 0) {
        ballSpeedY = -ballSpeedY;
    }
    // Colisões com as raquetes
    if (ballX - ballSize < paddleWidth && ballY > leftPaddleY && ballY < leftPaddleY + paddleHeight ||
        ballX + ballSize > canvas.width - paddleWidth && ballY > rightPaddleY && ballY < rightPaddleY + paddleHeight) {
        ballSpeedX = -ballSpeedX;
        paddleHitSound.play();
    }
    // Pontuação e reinício
    if (ballX < 0 || ballX > canvas.width) {
        scoreSound.play();
        if (ballX < 0) {
            computerScore++;
        } else {
            playerScore++;
        }
        ballX = canvas.width / 2;
        ballY = canvas.height / 2;
        ballSpeedX = -ballSpeedX;
        ballSpeedY = 3;
    }
    // Movimento automático da raquete direita
    if (rightPaddleY + paddleHeight / 2 < ballY) {
        rightPaddleY += paddleSpeed/1.5;
    } else {
        rightPaddleY -= paddleSpeed/1.5;
    }
    // Verifica pontuação
    if (playerScore >= 7) {
        //alert('Parabéns! Você ganhou!');
        // Reinicia o jogo ou avança para a próxima etapa
        showConfetti();
        ballSpeedX = 0;
        ballSpeedY = 0;
        //playerScore = 0;
        //computerScore = 0;
    } else if (computerScore >= 7) {
        alert('Você perdeu. Tente novamente!');
        // Reinicia o jogo
        playerScore = 0;
        computerScore = 0;
        // Optional: window.location.reload();
    }
    requestAnimationFrame(draw);

    // Desenha a pontuação
    ctx.font = '20px Arial';
    ctx.fillStyle = '#FFF';
    ctx.textAlign = 'center';
    ctx.fillText(playerScore, 150, 30); // Pontuação do jogador
    ctx.fillText(computerScore, canvas.width - 150, 30); // Pontuação
}

function controlPaddle(e) {
    if (e.key === "ArrowUp" && leftPaddleY > 0) {
        leftPaddleY -= paddleSpeed * 5;
    } else if (e.key === "ArrowDown" && leftPaddleY < canvas.height - paddleHeight) {
        leftPaddleY += paddleSpeed * 5;
    }
}

document.addEventListener('keydown', controlPaddle);

draw(); // Inicia o loop do jogo

function showConfetti() {
    const confettiContainer = document.getElementById('confetti-container');
    confettiContainer.style.display = 'block'; // Exibe o contêiner de confetes
    audio.pause();
    winSound.play();
    setTimeout(() => {
        window.location.href = 'snakeGame.html';
    }, 5000); // Ajuste o tempo conforme necessário
}