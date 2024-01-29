// globals

let counter = 0;
let activesData = [
  {
    name: "Grandma",
    initCost: 20,
    cost: 20,
    count: 0,
    profitTime: 5000,
  },
  {
    name: "Factory",
    initCost: 100,
    cost: 50,
    count: 0,
    profitTime: 2500,
  },
  {
    name: "Mine",
    initCost: 500,
    cost: 200,
    count: 0,
    profitTime: 1000,
  },
  {
    name: "Wizard Tower",
    initCost: 2000,
    cost: 500,
    count: 0,
    profitTime: 500,
  },
  {
    name: "Time Machine",
    initCost: 10000,
    cost: 1000,
    count: 0,
    profitTime: 100,
  },
];
let activesProfit = new Array(activesData.length).fill(null);

let cursorsData = [
  { name: "Cursor", cost: 0, profit: 1 },
  { name: "Double Clicker", cost: 20, profit: 2 },
  { name: "Mouse Pad", cost: 100, profit: 5 },
  { name: "Golden Mouse", cost: 500, profit: 10 },
  { name: "Diamond Clicker", cost: 2000, profit: 20 },
  // Special Cursor
  { name: "Rainbow Cursor", cost: 5000, profit: 50 },
  // GOD CURSOR
  { name: "Divine Cursor", cost: 10000, profit: 200 },
];
let currentCursor = 0;

let gameWindows = [
  {
    name: "actives",
    active: false,
    view: `
    <div class="card window actives">
      <div class="window-info">
       <strong class="title">Adquire Assets</strong>
       <p class="description">You can invest in assets to exponentially increase cookie production.</p>
      </div>
    </div>
    `,
    drawBuyButtons: drawActives,
  },
  {
    name: "cursors",
    active: false,
    view: `
    <div class="card window cursors">
      <div class="window-info">
       <strong class="title">Update The Cursor</strong>
       <p class="description">You can update the mouse cursor to earn more cookies per click.</p>
     </div>
    </div>
  `,
    drawBuyButtons: drawCursors,
  },
];

const interfaceBuyButtons = [
  {
    name: "actives",
    view: `<div class="card buy">
  <p>Assets</p>
  <svg
    stroke="currentColor"
    fill="currentColor"
    stroke-width="0"
    role="img"
    viewBox="0 0 24 24"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title></title>
    <path
      d="m10.84 11.22-.688-2.568c.728-.18 2.839-1.051 3.39.506.27 1.682-1.978 1.877-2.702 2.062zm.289 1.313.755 2.829c.868-.228 3.496-.46 3.241-2.351-.433-1.666-3.125-.706-3.996-.478zM24 12c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12zm-6.341.661c-.183-1.151-1.441-2.095-2.485-2.202.643-.57.969-1.401.57-2.488-.603-1.368-1.989-1.66-3.685-1.377l-.546-2.114-1.285.332.536 2.108c-.338.085-.685.158-1.029.256L9.198 5.08l-1.285.332.545 2.114c-.277.079-2.595.673-2.595.673l.353 1.377s.944-.265.935-.244c.524-.137.771.125.886.372l1.498 5.793c.018.168-.012.454-.372.551.021.012-.935.241-.935.241l.14 1.605s2.296-.588 2.598-.664l.551 2.138 1.285-.332-.551-2.153c.353-.082.697-.168 1.032-.256l.548 2.141 1.285-.332-.551-2.135c1.982-.482 3.38-1.73 3.094-3.64z"
    ></path>
  </svg>
</div>`,
  },
  {
    name: "cursors",
    view: `<div class="card buy">
  <p>Cursors</p>
  <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 320 512" height="200px" width="200px" xmlns="http://www.w3.org/2000/svg"><path d="M0 55.2V426c0 12.2 9.9 22 22 22c6.3 0 12.4-2.7 16.6-7.5L121.2 346l58.1 116.3c7.9 15.8 27.1 22.2 42.9 14.3s22.2-27.1 14.3-42.9L179.8 320H297.9c12.2 0 22.1-9.9 22.1-22.1c0-6.3-2.7-12.3-7.4-16.5L38.6 37.9C34.3 34.1 28.9 32 23.2 32C10.4 32 0 42.4 0 55.2z"></path></svg>
</div>`,
  },
];

const gameSounds = {
  pickCookie: [
    "./static/sounds/cookie/cookie_sound1.mp3",
    "./static/sounds/cookie/cookie_sound2.mp3",
  ],
  switchItem: "./static/sounds/switch_item.mp3",
  buy: "./static/sounds/cash_register.mp3",
  openWindow: "./static/sounds/open_window_sound.mp3",
  closeWindow: "./static/sounds/close_window_sound.mp3",
};

// functions

function load() {
  const gameItem = window.localStorage.getItem("game");
  if (gameItem) {
    const game = JSON.parse(gameItem);
    activesData = game.activesData;
    for (activeIndex in activesData) {
      if (activesData[activeIndex].count > 0) updateActiveProfit(activeIndex);
    }
    currentCursor = game.currentCursor;
    updateCookieCounter(game.counter, false);
    updateTitleTab();
  }
  drawCookieChips(4, 6);

  // FIXME:

  drawWindows();
  drawInterfaceBuyButtons();
}

function drawCookieChips(minNChips, maxNChips) {
  // resets previous cookie chips
  const cookie = document.getElementById("cookie");
  cookie.innerHTML = "";
  // setting a random num of chips
  const nChips =
    Math.floor(Math.random() * (maxNChips - minNChips)) + minNChips;
  // defining cookie chips arr
  const cookieChips = [];
  const cookieChipsPositions = [];
  new Array(nChips).fill(null).forEach(() => {
    // randomizig size for chip
    const chipSizes = ["small", "medium", "big"];
    const chipSize =
      chipSizes[Math.floor(Math.random() * (chipSizes.length - 1))];
    // randomizing and appending the current chip pos to the chip pos arr
    const getCorrectChipPos = (distance) => {
      let correctChipPos;
      let expirationCounter = 100;
      while (true) {
        expirationCounter--;
        const possibleChipPos = {
          top: Math.floor(Math.random() * 60) + 20,
          left: Math.floor(Math.random() * 60) + 20,
        };
        if (expirationCounter < 1) {
          correctChipPos = possibleChipPos;
          break;
        }
        // if it is the first pos it is just correct because there is any pos
        if (cookieChipsPositions.length === 0) {
          correctChipPos = possibleChipPos;
          break;
        }
        // checking if new random pos for chip is correct in terms of distance between other chips positions
        const evalPosArr = cookieChipsPositions
          .map((currentCookieChipPos) => {
            return [
              Math.abs(currentCookieChipPos.top - possibleChipPos.top) >=
                distance,
              Math.abs(currentCookieChipPos.left - possibleChipPos.left) >=
                distance,
            ];
          })
          .flat();
        // the checking has failed
        if (evalPosArr.includes(false)) {
          continue;
        }
        // the checking has passed
        correctChipPos = possibleChipPos;
        break;
      }
      return correctChipPos;
    };
    const chipPosition = getCorrectChipPos(10);
    cookieChipsPositions.push(chipPosition);
    // appending the chip
    const chip = `<div class="chip ${chipSize}" style="position: absolute; top: ${chipPosition.top}%; left: ${chipPosition.left}%"></div>`;
    cookieChips.push(chip);
  });
  cookie.innerHTML = cookieChips.join("");
}

function handleCookieClick(callback) {
  const cookie = document.getElementById("cookie");
  cookie.addEventListener("click", callback);
}

function updateCookieCounter(newValue, hasPopNumberAnimation = true) {
  // Determina si debe o no ejecutar la animacion del numero chiquito
  if (hasPopNumberAnimation === true)
    popNumberAnimation(Math.abs(counter - newValue));
  // Actualiza el contador con el nuevo valor
  counter = newValue;
  // Actualiza el indicador de cantidad de cookies
  const cookieCounterSpan = document.querySelector(
    ".game .cookie-counter .counter"
  );
  cookieCounterSpan.innerHTML = counter.toLocaleString().split(".").join(",");
  // Actualiza title
  updateTitleTab();
  // Actualiza el indicador de produccion de galletas
  updateCookiesProductionIndicator();
  // UPDATE GOD CURSOR
  // cursorsData[cursorsData.length - 1].profit = Math.floor((1 / 3) * counter);
  // Guarda la partida en el localStorage
  saveGame();
}

function playCookieClickAnimation(animationDuration = 0.3) {
  const cookie = document.getElementById("cookie");
  cookie.style.animation = `cookie-click ${animationDuration}s`;
  setTimeout(() => {
    cookie.style.animation = "";
  }, animationDuration * 1000 * 0.5);
}

function generalCookieAnimation() {
  playGameSound("pickCookie", 1);
  playCookieClickAnimation(0.15 + Math.random() * 0.15);
  drawCookieChips(4, 6);
}

function drawActives(overrideOldActives = true) {
  const actives = document.querySelector(".actives");
  if (!actives) return;
  if (overrideOldActives) {
    for (child of [...actives.childNodes]) {
      if (child instanceof HTMLElement && child.classList.contains("active")) {
        actives.removeChild(child);
      }
    }
  }
  const activeElementsString = activesData
    .map(({ name, cost, count, profitTime }) => {
      return `<div class="card active ${window.theme === "dark" ? "dark" : ""}">
      <p class="name">${name}</p>
      <div class="card stats">
        <span class="count">Currently working: ${count}</span>
        <span class="cost">Cost: ${cost} cookies</span>
        <span class="profit">Efficiency: +${1000 / profitTime} cookies/s</span>
      </div>
    </div>`;
    })
    .join("");
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = activeElementsString;
  for (activeIndex in [...tempDiv.children]) {
    const activeData = activesData[activeIndex];
    const activeElement = [...tempDiv.children][activeIndex].cloneNode(true);
    // evento click en el boton de compra del activo
    activeElement.addEventListener("click", () => {
      buyActive(activeData.name);
      drawActives(true);
    });
    // evento hover sobre el boton de compra del activo
    const statsActiveElement = activeElement.querySelector(".card.stats");
    activeElement.addEventListener("mouseover", () => {
      statsActiveElement.classList.add("active");
    });
    // evento unhover sobr eel boton de compra del activo
    activeElement.addEventListener("mouseleave", () => {
      statsActiveElement.classList.remove("active");
    });
    // evento hover sobre elemento active stats
    statsActiveElement.addEventListener("mouseenter", () => {
      statsActiveElement.classList.remove("active");
    });
    actives.appendChild(activeElement);
  }
}

function buyActive(activeName) {
  const activeIndex = activesData.findIndex(({ name }) => name === activeName);
  if (activeIndex === -1) throw new Error(`${activeName} does not exist !`);
  const active = activesData[activeIndex];
  if (counter >= active.cost) {
    const newCounter = counter - active.cost;
    active.count++;
    // aumento en el costo
    active.cost = parseInt(active.cost * 1.05);

    playGameSound("buy");
    updateCookieCounter(newCounter, false);
    activesData[activeIndex] = active;
    updateActiveProfit(activeIndex);
    return newCounter;
  }
  //TODO: Agregar sonido para cuando no hay dinero suficiente
}

function updateActiveProfit(activeIndex) {
  clearInterval(activesProfit[activeIndex]);
  activesProfit[activeIndex] = setInterval(() => {
    updateCookieCounter(counter + activesData[activeIndex].count);
  }, activesData[activeIndex].profitTime);
}

function popNumberAnimation(number) {
  const gameContainer = document.querySelector(".game");
  const popNumber = document.createElement("span");
  popNumber.classList.add("popNumber");
  popNumber.style.top = `${Math.floor(Math.random() * 60)}%`;
  popNumber.style.left = `${Math.floor(Math.random() * 20) + 40}%`;
  popNumber.innerHTML = `+${number}`;
  gameContainer.appendChild(popNumber);
  setTimeout(() => {
    gameContainer.removeChild(popNumber);
  }, 1000);
}

// TODO: Mejorar sistema de compra de cursores. Ejemplo: Evitar el jugador pueda comprar cursores peores
// TODO: Mejorar algoritomo para agregar eventos a los botones. Mejor div temporal.
function drawCursors(overrideOldCursors = false) {
  const cursors = document.querySelector(".cursors");
  if (!cursors) return;
  if (overrideOldCursors) {
    for (child of [...cursors.childNodes]) {
      if (child instanceof HTMLElement && child.classList.contains("cursor"))
        cursors.removeChild(child);
    }
  }
  // TODO: Mejorar visualizacion de los botones de compra de los cursores
  cursorsElementsString = cursorsData
    .map(({ name, cost, profit }) => {
      return `<div class="card cursor ${window.theme === "dark" ? "dark" : ""}">
      <p class="name">${name}</p>
      <div class="card stats">
        <span class="cost">Cost: ${cost} cookies</span>
        <span class="profit">Earn: ${profit} cookies</span>
      </div>
    </div>`;
    })
    .join("");

  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = cursorsElementsString;
  for (cursorIndex in [...tempDiv.children]) {
    const cursorElement = [...tempDiv.children][cursorIndex].cloneNode(true);
    const cursorData = cursorsData[cursorIndex];
    // TODO: detectar cuando se este dibujando el cursor actual
    if (currentCursor == cursorIndex) {
      cursorElement.classList.add("current");
    }
    //
    cursorElement.addEventListener("click", () => {
      if (
        counter >= cursorData.cost &&
        cursorsData.indexOf(cursorData) > currentCursor
      ) {
        playGameSound("buy");
        updateCookieCounter(counter - cursorData.cost, false);
        currentCursor = cursorsData.indexOf(cursorData);
        drawCursors(true);
      }
    });
    // mouseover event
    cursorElement.addEventListener("mouseover", () => {
      cursorElement.querySelector(".card.stats").classList.add("active");
    });
    // mouseleave event
    cursorElement.addEventListener("mouseleave", () => {
      cursorElement.querySelector(".card.stats").classList.remove("active");
    });
    // mouseover sobre stats
    const cursorStatsElement = cursorElement.querySelector(".card.stats");
    cursorStatsElement.addEventListener("mouseenter", () => {
      cursorStatsElement.classList.remove("active");
    });
    cursors.appendChild(cursorElement);
  }
}

function calculateCookiesProduction() {
  let cookiesProduction = 0;
  activesData.map(({ count, profitTime }) => {
    if (count === 0) return;
    cookiesProduction += count / (profitTime / 1000);
  });
  return new Number(cookiesProduction.toFixed(2));
}

function updateCookiesProductionIndicator() {
  const cookieCounter = document.querySelector(".cookie-counter");
  const cookiesProductionIndicator = cookieCounter.querySelector(".production");
  cookiesProductionIndicator.innerHTML = `${calculateCookiesProduction()} per seccond`;
}

function playGameSound(soundName, volume = 1) {
  if (!window.sound) return;
  const sound = gameSounds[soundName];
  if (sound instanceof Array) {
    const audio = new Audio(
      sound[Math.floor(Math.random() * sound.length - 1) + 1]
    );
    audio.play();
    while (audio.volume < volume) {
      audio.volume += 0.1;
    }
    return;
  }
  const audio = new Audio(sound);
  audio.play();
  while (audio.volume < volume) {
    audio.volume += 0.1;
  }
}

function updateTitleTab() {
  window.document.title = `${counter} Cookies !`;
}

function saveGame() {
  const game = {
    counter,
    activesData,
    activesProfit,
    currentCursor,
  };
  window.localStorage.setItem("game", JSON.stringify(game));
}

function resetGame() {
  window.localStorage.removeItem("game");
  window.history.go(0);
}

function switchWindowActive(windowName) {
  // update data
  let openedWindows;
  gameWindows = gameWindows.map((windowData) => {
    if (windowData.active) openedWindows = true;
    return {
      ...windowData,
      active: false,
    };
  });
  // si abres una ventana habiendo una ya abierta, retornar
  if (openedWindows) return;
  //
  const gameWindow = gameWindows.find(({ name }) => name === windowName);
  if (!gameWindow) throw new Error("Window name does not exist !");
  gameWindow.active = true;

  // update html elements
  const mainContainer = document.querySelector(`.main-container`);
  const windowElement = mainContainer.querySelector(`.${windowName}`);
  if (!windowElement)
    throw new Error(
      "The name of the window and the html window element class name does not match or it does not exist"
    );
  const blockingBackground = mainContainer.querySelector(
    ".blocking-background"
  );
  blockingBackground.classList.add("active");
  // window.theme === "dark" ? blockingBackground.classList.add("dark") : "";
  document.body.style.overflow = "hidden";
  document.querySelector("header").scrollIntoView();
  playGameSound("openWindow");
  windowElement.style.display = "block";
}

// TODO: Colocar boton para cerrar las ventanas
function drawWindows() {
  const mainContainer = document.querySelector(".main-container");
  const windowsElements = gameWindows
    .map(({ view }) => {
      return view;
    })
    .join("");

  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = windowsElements;
  const fragment = document.createDocumentFragment();
  for (childNode of [...tempDiv.children]) {
    const closeWindow = document.createElement("div");
    closeWindow.classList.add("close-window");
    closeWindow.innerHTML = `<svg stroke="currentColor" fill="none" stroke-width="0" viewBox="0 0 15 15" height="200px" width="200px" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" fill="currentColor"></path></svg>`;
    childNode.appendChild(closeWindow);
    fragment.appendChild(childNode.cloneNode(true));
  }
  // introducir todos los elementos del fragmento dentro del contenedor
  mainContainer.appendChild(fragment);
  // agragar funcionalidad al boton de cierre de ventana de cada ventana
  mainContainer
    .querySelectorAll(".close-window")
    .forEach((element) =>
      element.addEventListener("click", switchWindowsDeactive)
    );
  // Dibujar botones de compra internos de cada ventana
  gameWindows.forEach(({ name, drawBuyButtons }) => drawBuyButtons(true));
}

function drawInterfaceBuyButtons() {
  const buyContainer = document.querySelector(".buy-container");
  const interfaceBuyButtonsElementsString = interfaceBuyButtons
    .map(({ view }) => {
      return view;
    })
    .join("");

  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = interfaceBuyButtonsElementsString;

  for (interBuyButtonIndex in [...tempDiv.children]) {
    const interfaceBuyButtonElement = [...tempDiv.children][
      interBuyButtonIndex
    ].cloneNode(true);

    const interfaceBuyButton = interfaceBuyButtons[interBuyButtonIndex];

    interfaceBuyButtonElement.addEventListener("click", () => {
      switchWindowActive(interfaceBuyButton.name);
    });
    buyContainer.appendChild(interfaceBuyButtonElement);
  }
}

function switchWindowsDeactive() {
  const mainContainer = document.querySelector(".main-container");
  gameWindows = gameWindows.map((gameWindow) => {
    const gameWindowElement = mainContainer.querySelector(
      `.${gameWindow.name}`
    );
    gameWindowElement.style.display = "none";
    return {
      ...gameWindow,
      active: false,
    };
  });
  playGameSound("closeWindow", 1);
  const blockingBackground = mainContainer.querySelector(
    ".blocking-background"
  );
  blockingBackground.classList.remove("active");
  document.body.style.overflow = "auto";
  document.querySelector("header").scrollIntoView();
}

// starts here

window.addEventListener("load", load);

handleCookieClick(() => {
  updateCookieCounter(counter + cursorsData[currentCursor].profit);
  generalCookieAnimation();
});
