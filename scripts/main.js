import "/style/navbar.css";
import "/scripts/navbar.js";
import "/style/footer.css";

const golemDataArray = [
  {
    id: "okurus",
    name: "Okorus",
    motion: "/assets/vidéos/Okorus_Motion.mp4",
    rarity: "/assets/images/epic-icon.png",
    rarityText: "EPIC",
    typeIcon: "/assets/images/neutral.png",
    typeText: "NEUTRAL",
    turretText: "Fatal Strike: Summon 1 Golem on the opponent's path",
    invocationText: "When Sold, Summon 3 Golems per Tower level",
    damage: "200",
    rate: "1.5",
    range: "8",
    health: "1400",
    speed: "14.25",
  },
  {
    id: "mystone",
    name: "Mystone",
    motion: "/assets/vidéos/Mystone_Motion.mp4",
    rarity: "/assets/images/common-icon.png",
    rarityText: "COMMON",
    typeIcon: "/assets/images/humus.png",
    typeText: "HUMUS",
    turretText:
      "The projectile creates a whirlwind for 3 seconds. Inflicts damage on passing summons",
    invocationText: "No effects.",
    damage: "100",
    rate: "1",
    range: "7",
    health: "1000",
    speed: "14.25",
  },
  {
    id: "rusif",
    name: "Rusif",
    motion: "/assets/vidéos/Rusif_Motion.mp4",
    rarity: "/assets/images/legendary-icon.png",
    rarityText: "LEGENDARY",
    typeIcon: "/assets/images/ignis.png",
    typeText: "IGNIS",
    turretText:
      "The attack ignites a large area, burning any invocations passing through it.",
    invocationText:
      "Each time it is attacked, its speed increases for 3 seconds.",
    damage: "250",
    rate: "2",
    range: "6",
    health: "1800",
    speed: "9.75",
  },
  {
    id: "famas",
    name: "Famas",
    motion: "/assets/vidéos/Famas_Motion.mp4",
    rarity: "/assets/images/legendary-icon.png",
    rarityText: "LEGENDARY",
    typeIcon: "/assets/images/neutral.png",
    typeText: "NEUTRAL",
    turretText: "Attack split into 7-shot bursts",
    invocationText: "On spawn: Gains 7 shields that block turret attacks",
    damage: "200",
    rate: "1",
    range: "7",
    health: "600",
    speed: "14.25",
  },
  {
    id: "jaspyro",
    name: "Jaspyro",
    motion: "/assets/vidéos/Jaspyro_Motion.mp4",
    rarity: "/assets/images/epic-icon.png",
    rarityText: "EPIC",
    typeIcon: "/assets/images/humus.png",
    typeText: "HUMUS",
    turretText: "inflicts area damage around the target and stuns for 0.5s",
    invocationText:
      "On death: it splits in two and then in two again on death.",
    damage: "250",
    rate: "1.5",
    range: "7",
    health: "1800",
    speed: "11.25",
  },
  {
    id: "blicken",
    name: "Blicken",
    motion: "/assets/vidéos/Blicken_Motion.mp4",
    rarity: "/assets/images/common-icon.png",
    rarityText: "COMMON",
    typeIcon: "/assets/images/ignis.png",
    typeText: "IGNIS",
    turretText:
      "Attack split into 2-shot bursts Fatal blow: Relaunches his attack immediately",
    invocationText:
      "On death: increases the speed of other blicken on the path by 15% (cumulative)",
    damage: "200",
    rate: "2",
    range: "5",
    health: "1000",
    speed: "15.75",
  },
];

document.addEventListener("DOMContentLoaded", () => {
  const defaultGolem = golemDataArray[0]; // Choisissez le premier golem par défaut ou celui de votre choix

  if (defaultGolem) {
    displayInfo(defaultGolem.id);
    document.getElementById(defaultGolem.id).classList.add("active");
  }
});

function displayInfo(id) {
  const golemData = golemDataArray.find((item) => item.id === id);

  if (golemData) {
    const {
      name,
      motion,
      rarity,
      rarityText,
      typeIcon,
      typeText,
      turretText,
      invocationText,
      damage,
      rate,
      range,
      health,
      speed,
    } = golemData;

    document.querySelector(".golem-infos__name").textContent = name;
    document.querySelector(
      ".collect-golem-section__card__wrapper-center video"
    ).src = motion;
    document.querySelector(".golem-infos__rarity__img").src = rarity;
    document.querySelector(".golem-infos__rarity__text").textContent =
      rarityText;
    document.querySelector(".golem-infos__type__icon").src = typeIcon;
    const typeTextElement = document.querySelector(".golem-infos__type__text");
    typeTextElement.textContent = typeText;

    switch (typeText.toUpperCase()) {
      case "IGNIS":
        typeTextElement.style.color = "#FF2E00";
        break;
      case "HUMUS":
        typeTextElement.style.color = "#AEEA00";
        break;
      case "NEUTRAL":
        typeTextElement.style.color = "#C796CC";
        break;
    }

    document.querySelector(".turret-arrays__text").textContent = turretText;
    document.querySelector(".invocation-arrays__text").textContent =
      invocationText;
    document.querySelector(".damage").textContent = damage;
    document.querySelector(".rate").textContent = rate;
    document.querySelector(".range").textContent = range;
    document.querySelector(".health").textContent = health;
    document.querySelector(".speed").textContent = speed;
  } else {
    console.log("No data found");
  }
}

const images = document.querySelectorAll(
  ".collect-golem-section__selector img"
);

if (images.length > 0) {
  images.forEach((img) => {
    img.addEventListener("click", () => {
      displayInfo(img.id);
      images.forEach((img) => img.classList.remove("active"));
      img.classList.add("active");
    });
  });
}

const slideData = [
  {
    title: "Tons of golems to collect",
    text: "Unlock rare elemental golems with unique effects and customize your deck !",
    image: "/assets/images/slider-cards-img.png",
    sideImage: "/assets/images/humus_golem.png",
    imageClassName: "cards-types-images",
    sideImagePosition: "slide__side-image__position-left",
  },
  {
    title: "Competition !",
    text: "Compete against thousands of other players and climb the rankings !",
    image: "/assets/images/slider-cards-img-2.png",
    sideImage: "/assets/images/hasa.png",
    imageClassName: "cards-types-images",
    sideImagePosition: "slide__side-image__position-right",
  },
  {
    title: "Easy to learn !",
    text: "Your towers automatically generate summons to attack the opponent ! ",
    image: "/assets/images/turret-function.png",
    sideImage: "/assets/images/okurus.png",
    imageClassName: "turret-funtion-image",
    sideImagePosition: "slide__side-image__position-right",
  },
  {
    title: "Easy progression !",
    text: "Level up your golems to improve their stats !",
    image: "/assets/images/leveling.png",
    sideImage: "/assets/images/acorce.png",
    imageClassName: "acorce-image",
    sideImagePosition:
      "slide__side-image__position-right responsive-acorce-position",
  },
  {
    title: "Multitudes of strategies !",
    text: "Choose the hero that best suits your play style",
    image: "/assets/images/heros-cards-img.png",
    sideImage: "/assets/images/crustak.png",
    imageClassName: "hero-cards-image",
    sideImagePosition: "slide__side-image__position-right",
  },
];

const slidesContainer = document.querySelector(".slider__container");
const leftArrow = document.querySelector(".slider-left-arrow");
const rightArrow = document.querySelector(".slider-right-arrow");
const dotsContainer = document.querySelector(".dots");
let slideIndex = 0;

function createSlides() {
  slidesContainer.innerHTML = "";
  dotsContainer.innerHTML = ""; // Clear the dots container

  slideData.forEach((slide, index) => {
    const slideElement = document.createElement("div");
    slideElement.className = "slide";
    slideElement.innerHTML = `
      <div class="slider__container">
        <img src="${slide.image}" alt="" class="${slide.imageClassName}" />
        <div class="slider__text__wrapper">
          <p class="slide__title">${slide.title}</p>
          <h3 class="slide__text">${slide.text}</h3>
        </div>
      </div>
      <img src="${slide.sideImage}" alt="" class="slider__side-image ${slide.sideImagePosition}" />
    `;
    slidesContainer.appendChild(slideElement);

    // Create a dot for each slide
    const dot = document.createElement("span");
    dot.className = "dot";
    dot.addEventListener("click", () => showSlide(index));
    dotsContainer.appendChild(dot);
  });

  showSlide(slideIndex); // Show initial slide
}

function showSlide(index) {
  slideIndex = index;
  updateSlides();
}

function updateSlides() {
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dot");

  slides.forEach((slide, index) => {
    slide.style.display = index === slideIndex ? "flex" : "none";
  });

  if (slideIndex === 2 || slideIndex === 4) {
    slidesContainer.classList.add("slide-no-translate-style");
  } else {
    slidesContainer.classList.remove("slide-no-translate-style");
  }

  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === slideIndex);
  });

  document.querySelector(".slider__side-image").src =
    slideData[slideIndex].sideImage;
}

function changeSlide(n) {
  slideIndex = (slideIndex + n + slideData.length) % slideData.length;
  showSlide(slideIndex);
}

document.addEventListener("DOMContentLoaded", () => {
  createSlides();
  leftArrow.addEventListener("click", () => changeSlide(-1));
  rightArrow.addEventListener("click", () => changeSlide(1));
});

//
document.addEventListener("DOMContentLoaded", () => {
  const gameInfosWrappers = document.querySelectorAll(
    ".game-infos-section__wrapper"
  );
  const bannerTitles = document.querySelectorAll(".banner-section__wrapper h2");
  const bannerDots = document.querySelectorAll(".banner-section__wrapper img");
  const economySectionBackgroundImg = document.querySelector(
    ".economy-section__background-img"
  );
  const roadmapPhase = document.querySelectorAll(".roadmap__phase");
  const roadmapFigure = document.querySelectorAll(
    ".roadmap__background-figure"
  );

  console.log(economySectionBackgroundImg);

  let delay = 0; // Variable pour suivre le délai progressif

  // Options pour IntersectionObserver
  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.65,
  };

  // Créer une instance de l'observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Ajouter la classe pour déclencher l'animation
        entry.target.classList.add("animate");

        observer.unobserve(entry.target);
      }
    });
  }, options);

  bannerTitles.forEach((title) => {
    observer.observe(title);
  });

  bannerDots.forEach((dot) => {
    observer.observe(dot);
  });

  observer.observe(economySectionBackgroundImg);

  gameInfosWrappers.forEach((wrapper) => {
    observer.observe(wrapper);
  });

  roadmapPhase.forEach((phase, index) => {
    observer.observe(phase);
  });

  roadmapFigure.forEach((figure) => {
    observer.observe(figure);
  });
});
