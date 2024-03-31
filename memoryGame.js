const audio = new Audio();
audio.src = "paraiba_song.mp3";
audio.volume = 0.1;
audio.play();

const scoreSound = new Audio('pointmemory.mp3');
const winSound = new Audio('win.mp3');

const gameContainer = document.getElementById('memory-game');
let cardImages = ['img1.jpeg', 'img2.jpeg', 'img3.jpeg', 'img4.jpeg', 'img5.jpeg', 'img6.jpeg', 'img7.jpeg', 'img8.jpeg', 'img9.jpeg', 'img10.jpeg']; // Substitua com as URLs das suas imagens
cardImages = [...cardImages, ...cardImages]; // Duplica para ter pares

function shuffle(array) {
  array.sort(() => 0.5 - Math.random());
}

function createCard(image) {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    
    // O ícone de coração é visível por padrão
    // A imagem é revelada quando a carta é virada
    cardElement.innerHTML = `
      <div class="icon">&#x2764;</div> <!-- Coração visível inicialmente -->
      <img src="${image}" alt="Image" class="hidden"> <!-- Imagem escondida -->
    `;
  
    cardElement.addEventListener('click', () => {
      cardElement.classList.add('flipped'); // Adiciona classe para revelar a imagem
      checkForMatch();
    });
    return cardElement;
  }
  

let flippedCards = [];
let matchesFound = 0;

function checkForMatch() {
  const allFlippedCards = document.querySelectorAll('.flipped:not(.match)');
  if (allFlippedCards.length === 2) {
    const match = allFlippedCards[0].innerHTML === allFlippedCards[1].innerHTML;
    if (match) {
      allFlippedCards.forEach(card => card.classList.add('match'));
      matchesFound++;
      scoreSound.play();
      if (matchesFound === cardImages.length / 2) {
        showConfetti();
      }      
    } else {
      setTimeout(() => {
        allFlippedCards.forEach(card => card.classList.remove('flipped'));
      }, 1000);
    }
  }
}

function startGame() {
  shuffle(cardImages);
  cardImages.forEach(image => {
    const card = createCard(image);
    gameContainer.appendChild(card);
  });
}

startGame();

function showConfetti() {
  const confettiContainer = document.getElementById('confetti-container');
  confettiContainer.style.display = 'block'; // Exibe o contêiner de confetes
  audio.pause();
  winSound.play();
  setTimeout(() => {
      window.location.href = 'letter.html';
  }, 5000); // Ajuste o tempo conforme necessário
}