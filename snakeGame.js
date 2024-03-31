const audio = new Audio();
audio.src = "bom_dia_numero_1.mp3";
audio.volume = 0.1;
audio.play();

const winSound = new Audio('win.mp3');
const scoreSound = new Audio('point.mp3');

const canvas = document.getElementById('snakeGame');
const ctx = canvas.getContext('2d');

const scale = 20;
const rows = canvas.height / scale;
const columns = canvas.width / scale;

let snake;

(function setup() {
    snake = new Snake();
    fruit = new Fruit();
    fruit.pickLocation();

    window.setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        fruit.draw();
        snake.update();
        snake.draw();

        if (snake.eat(fruit)) {
            fruit.pickLocation();
            scoreSound.play();
        }

        snake.checkCollision();
        console.log(snake.total)

        if (snake.total >= 15) {
            snake.stop();
            showConfetti();
        }

        drawScore();

    }, 250);
}());

function Snake() {
    this.x = 0;
    this.y = 0;
    this.xSpeed = scale * 1;
    this.ySpeed = 0;
    this.total = 0;
    this.tail = [];
    this.isStop = false;

    this.draw = function() {
        ctx.fillStyle = "#FFFFFF";

        for (let i=0; i<this.tail.length; i++) {
            ctx.fillRect(this.tail[i].x, this.tail[i].y, scale, scale);
        }

        ctx.fillRect(this.x, this.y, scale, scale);
    };

    this.update = function() {
        for (let i=0; i<this.tail.length - 1; i++) {
            this.tail[i] = this.tail[i+1];
        }

        this.tail[this.total - 1] = { x: this.x, y: this.y };

        this.x += this.xSpeed;
        this.y += this.ySpeed;

        if (this.x >= canvas.width) {
            this.x = 0;
        }

        if (this.y >= canvas.height) {
            this.y = 0;
        }

        if (this.x < 0) {
            this.x = canvas.width - scale;
        }

        if (this.y < 0) {
            this.y = canvas.height - scale;
        }
    };

    this.stop = function() {
        this.xSpeed = 0;
        this.ySpeed = 0;
        this.isStop = true;
    }
}

function Fruit() {
    this.x;
    this.y;

    this.pickLocation = function() {
        this.x = (Math.floor(Math.random() * rows - 1) + 1) * scale;
        this.y = (Math.floor(Math.random() * columns - 1) + 1) * scale;
    };

    this.draw = function() {
        ctx.fillStyle = "#4cafab";
        ctx.fillRect(this.x, this.y, scale, scale);
    };
}

Snake.prototype.eat = function(fruit) {
    if (this.x === fruit.x && this.y === fruit.y) {
        this.total++;
        return true;
    }
    return false;
};

Snake.prototype.checkCollision = function() {
    for (let i = 0; i < this.tail.length; i++) {
        if (this.x === this.tail[i].x && this.y === this.tail[i].y && !this.isStop) {
            this.total = 0;
            this.tail = [];
            alert('Colisão! Jogo reiniciado.');
        }
    }
};

document.addEventListener('keydown', (e) => {
    const direction = e.key.replace('Arrow', '');
    snake.changeDirection(direction);
});

Snake.prototype.changeDirection = function(direction) {
    if (!this.isStop) {
    switch(direction) {
        case 'Up':
            if (this.ySpeed === 0) {
                this.xSpeed = 0;
                this.ySpeed = -scale * 1;
            }
            break;
        case 'Down':
            if (this.ySpeed === 0) {
                this.xSpeed = 0;
                this.ySpeed = scale * 1;
            }
            break;
        case 'Left':
            if (this.xSpeed === 0) {
                this.xSpeed = -scale * 1;
                this.ySpeed = 0;
            }
            break;
        case 'Right':
            if (this.xSpeed === 0) {
                this.xSpeed = scale * 1;
                this.ySpeed = 0;
            }
            break;
        }
    }
};

function drawScore() {
    ctx.fillStyle = "white"; // Define a cor do texto
    ctx.font = "16px Arial"; // Define o tamanho e a fonte do texto
    ctx.fillText(snake.total, canvas.width - 20, 20); // Define o conteúdo e a posição do texto
}

function showConfetti() {
    const confettiContainer = document.getElementById('confetti-container');
    confettiContainer.style.display = 'block'; // Exibe o contêiner de confetes
    audio.pause();
    winSound.play();
    setTimeout(() => {
        window.location.href = 'memoryGame.html';
    }, 5000); // Ajuste o tempo conforme necessário
}
