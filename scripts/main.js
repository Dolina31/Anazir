import "/style/navbar.css";
import "/scripts/navbar.js";
import "/style/footer.css";

const golemDataArray = [
  {
    id: "okurus",
    name: "Okurus",
    motion: "/assets/vidéos/Okorus_Motion.mp4",
    rarity: "/assets/images/epic-icon.png",
    type: "/assets/images/type-neutral.png",
    turretText: "Coup fatal : invoque 1 Golem sur le chemin adverse",
    invocationText:
      "Invoque 3 golems par niveau de tourelle à l'instant où elle est vendue",
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
    type: "/assets/images/type-humus.png",
    turretText:
      "Créer une tornade sur le terrain pendant 3s qui inflige des dégâts aux golems qui le traversent.",
    invocationText: "Pas d’effets.",
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
    type: "/assets/images/type-ignis.png",
    turretText:
      "Inflige 50% des dégâts à tous les golems présents derrière la cible en ligne droite",
    invocationText:
      "Passif : à chaque attaques subits, sa vitesse augmente d'un palier pendant 3 secondes",
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
    type: "/assets/images/type-neutral.png",
    turretText: "Attaque divisé en rafale de 7 tirs",
    invocationText:
      "À l'apparition : Gagne 7 boucliers qui bloquent l'attaque d'une tourelle",
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
    type: "/assets/images/type-humus.png",
    turretText:
      "Touche tous les golems dans une petite zone autour de son attaque",
    invocationText: "à la mort : il se sépare en deux puis encore en deux.",
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
    type: "/assets/images/type-ignis.png",
    turretText:
      "Attaque divisée en deux projectiles. Si le coup est fatal : Blicken ré-attaque directement",
    invocationText:
      "à la mort: boost la vitesse des autres Blicken de 15% (cumulable)",
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
      type,
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
    document.querySelector(".golem-infos__rarity").src = rarity;
    document.querySelector(".golem-infos__type").src = type;
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
    title: "Pleins de golems à collectioner !",
    text: "Débloquez des golems élémentaires rares aux effets uniques et personnaliser votre deck !",
    image: "/assets/images/slider-cards-img.png",
    sideImage: "/assets/images/humus_golem.png",
    imageClassName: "cards-types-images",
    sideImagePosition: "slide__side-image__position-left",
  },
  {
    title: "De la compétition !",
    text: "Affrontez des milliers d’autres joueurs et montez dans le classement !",
    image: "/assets/images/slider-cards-img-2.png",
    sideImage: "/assets/images/hasa.png",
    imageClassName: "cards-types-images",
    sideImagePosition: "slide__side-image__position-right",
  },
  {
    title: "Facile de prise en main !",
    text: "Vos tourelles génèrent automatiquement des invocations pour attaquer la base adverse ! ",
    image: "/assets/images/turret-function.png",
    sideImage: "/assets/images/okurus.png",
    imageClassName: "turret-funtion-image",
    sideImagePosition: "slide__side-image__position-right",
  },
  {
    title: "Progresser facilement !",
    text: "Montez le niveau de vos golems pour améliorer leurs statistiques ! ",
    image: "/assets/images/leveling.png",
    sideImage: "/assets/images/acorce.png",
    imageClassName: "acorce-image",
    sideImagePosition:
      "slide__side-image__position-right responsive-acorce-position",
  },
  {
    title: "Des multitudes de stratégies !",
    text: "Choisissez le Héros qui correspond a votre style de jeu",
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
    slide.style.display = index === slideIndex ? "block" : "none";
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
