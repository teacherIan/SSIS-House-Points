rubyPoints = document.getElementById('ruby-points');
sapphirePoints = document.getElementById('sapphire-points');
amberPoints = document.getElementById('amber-points');
pearlPoints = document.getElementById('pearl-points');
winner = document.getElementById('winner');
startButton = document.getElementById('start-button');

rubyInput = document.getElementById('ruby-input');
pearlInput = document.getElementById('pearl-input');
sapphireInput = document.getElementById('sapphire-input');
amberInput = document.getElementById('amber-input');

submit = document.getElementById('submit');

form = document.getElementById('form-container');

submit.addEventListener('click', () => {
  let rubyNum = parseInt(rubyInput.value);
  let pearlNum = parseInt(pearlInput.value);
  let sapphireNum = parseInt(sapphireInput.value);
  let amberNum = parseInt(amberInput.value);
  houses[0].totalPoints = rubyNum;
  houses[1].totalPoints = sapphireNum;
  houses[2].totalPoints = amberNum;
  houses[3].totalPoints = pearlNum;

  form.style.display = 'none';
});

startButton.addEventListener('click', () => {
  start = true;
  let startOpacity = 1;

  const buttonInterval = setInterval(() => {
    if (startOpacity == 0) {
      startButton.style.display = 'none';
      clearInterval(buttonInterval);
    }
    startButton.style.opacity = startOpacity;
    startOpacity -= 0.01;
  }, 10);
});

let start = false;

const showWinner = () => {
  if (winningIndex == 0) {
    winner.innerHTML = 'RUBY WINS';
    winner.style.backgroundColor = '#c11c22';
  }
  if (winningIndex == 1) {
    winner.innerHTML = 'SAPPHIRE WINS';
    winner.style.backgroundColor = '#1271b5';
  }
  if (winningIndex == 2) {
    winner.innerHTML = 'AMBER WINS';
    winner.style.backgroundColor = '#e46725';
  }
  if (winningIndex == 3) {
    winner.innerHTML = 'PEARL WINS';
    winner.style.backgroundColor = '#000000';
  }

  let winnerOpacity = 0;
  const showWinnerInterval = setInterval(() => {
    winnerOpacity += 0.01;
    if (winner.style.opacity < 1) {
      winner.style.opacity = winnerOpacity;
    } else {
      clearInterval(showWinnerInterval);
    }
  }, 50);
};

const houses = [
  {
    houseReference: rubyPoints,
    totalPoints: Math.floor(Math.random() * 1500) + 500,
    difference: 0,
    currentNumber: 0,
    winner: false,
  },
  {
    houseReference: sapphirePoints,
    totalPoints: Math.floor(Math.random() * 1500) + 500,
    difference: 0,
    currentNumber: 0,
    winner: false,
  },
  {
    houseReference: amberPoints,
    totalPoints: Math.floor(Math.random() * 1500) + 500,
    difference: 0,
    currentNumber: 0,
    winner: false,
  },
  {
    houseReference: pearlPoints,
    totalPoints: Math.floor(Math.random() * 1500) + 500,
    difference: 0,
    currentNumber: 0,
    winner: false,
  },
];

let winningIndex = 0;
let largestScore = 0;

for (let i = 0; i < houses.length; i++) {
  if (houses[i].totalPoints > largestScore) {
    largestScore = houses[i].totalPoints;
    winningIndex = i;
  }
}

let finished;

const gameInterval = setInterval(() => {
  finished = 0;
  houses.forEach((house) => {
    if (start) {
      house.difference = house.totalPoints - house.currentNumber;
      if (house.difference > 100) {
        house.currentNumber += Math.floor(Math.random() * 20);
      } else if (house.difference > 50) {
        house.currentNumber += Math.floor(Math.random() * 10);
      } else if (house.difference > 25) {
        house.currentNumber += Math.floor(Math.random() * 5);
      } else if (house.difference > 12) {
        house.currentNumber += Math.floor(Math.random() * 3);
      } else if (house.difference > 0) {
        house.currentNumber += 1;
      }
      house.houseReference.innerHTML = house.currentNumber;

      if (house.difference === 0) {
        finished++;
      }
    }
  });

  if (finished === houses.length) {
    houses.forEach((house) => {
      console.log(house.totalPoints, house.houseReference, finished);
    });

    showWinner();
    clearInterval(gameInterval);
  }
}, 70);
