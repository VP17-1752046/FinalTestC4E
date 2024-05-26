let shake = false;
let totalBet = 0;
const maxBet = 3;

const randomImgs = document.querySelectorAll(".random-img img");
const betImgs = document.querySelectorAll(".bet-img");
const shakeButton = document.querySelector(".shake-button");
const refreshButton = document.querySelector(".refresh-button");

const images = [
  "./assets/bau.png",
  "./assets/cua.png",
  "./assets/tom.png",
  "./assets/ca.png",
  "./assets/huou.png",
  "./assets/ga.png",
];

function randomImage() {
  const index = Math.floor(Math.random() * images.length);
  return images[index];
}

function shaking() {
  let count = 0;
  const interval = setInterval(() => {
    randomImgs.forEach((img) => {
      img.src = randomImage();
    });
    count += 1;
    if (count >= 100) {
      clearInterval(interval);
      shake = false;
      checkResult();
      activeButtons(true);
    }
  }, 50);
}

function activeButtons(enable) {
  shakeButton.disabled = !enable;
  refreshButton.disabled = !enable;
  betImgs.forEach((betImg) => {
    betImg.querySelector("img").style.pointerEvents = enable ? "auto" : "none";
  });
}

function checkResult() {
  const results = Array.from(randomImgs).map((img) => img.src);
  const bets = Array.from(betImgs).map((betImg) => ({
    img: betImg.querySelector("img").src,
    points: parseInt(betImg.querySelector(".number-bet").textContent),
  }));

  let result = 0;
  bets.forEach((bet) => {
    if (results.includes(bet.img)) {
      result += bet.points;
    }
  });

  if (result > 0) {
    alert(
      `Bạn đã đoán đúng với kết quả: ${results
        .map((src) => src.split("/").pop())
        .join(", ")}`
    );
  } else {
    alert(
      `Bạn đã đoán sai với kết quả: ${results
        .map((src) => src.split("/").pop())
        .join(", ")}`
    );
  }
}

function shakeClick() {
  if (!shake) {
    shake = true;
    activeButtons(false);
    shaking();
  }
}

function betImgClick(event) {
  if (!shake && totalBet < maxBet) {
    const numberBet = event.currentTarget.querySelector(".number-bet");
    const currentBet = parseInt(numberBet.textContent);
    if (currentBet < maxBet && totalBet < maxBet) {
      numberBet.textContent = currentBet + 1;
      totalBet += 1;
    }
  }
}

function refreshClick() {
  if (!shake) {
    betImgs.forEach((betImg) => {
      betImg.querySelector(".number-bet").textContent = "0";
    });
    totalBet = 0;
  }
}

shakeButton.addEventListener("click", shakeClick);
betImgs.forEach((betImg) => {
  betImg.addEventListener("click", betImgClick);
});
refreshButton.addEventListener("click", refreshClick);
