//---------- fonction qui gère le comportement de la navbar en responsive
function navbar() {
  const navbarMobileButton = document.querySelector(".navbar-mobile");
  const navbarMobileCloseButton = document.querySelector(
    ".navbar__mobile-menu__close-item"
  );
  const mobileMenu = document.querySelector(".navbar__mobile-menu");

  navbarMobileButton.addEventListener("click", () => {
    mobileMenu.classList.add("active");
  });

  navbarMobileCloseButton.addEventListener("click", () => {
    mobileMenu.classList.remove("active");
  });
}

// Variable pour suivre l'état des images
let imagesAdded = false;

function checkWindowSize() {
  const testDiv = document.querySelector(
    ".navbar__mobile-menu__logos__wrapper"
  );

  if (window.innerWidth <= 576) {
    if (testDiv && !imagesAdded) {
      testDiv.innerHTML = `
      <a
            href="https://play.google.com/store/apps/details?id=com.Threevision.AnazirGame"
            target="_blank"
            ><img
              src="../../assets/images/google-store-logo.png"
              alt="Logo du google play store"
          /></a>
          <a
            href="https://apps.apple.com/us/app/anazir-td-arena-tower-defense/id6450485930?uo=2"
            target="_blank"
            ><img
              src="../../assets/images/apple-store-logo.png"
              alt="Logo de l'apple store"
          /></a>
        `;
      imagesAdded = true; // Indique que les images ont été ajoutées
    }
  } else {
    if (testDiv && imagesAdded) {
      testDiv.innerHTML = ""; // Supprime la div contenant les images
      imagesAdded = false; // Indique que les images ont été supprimées
    }
  }
}

navbar();
// Appelez la fonction lors du redimensionnement de la fenêtre
window.addEventListener("resize", checkWindowSize);

// Appelez la fonction une fois au chargement de la page pour définir l'état initial
window.addEventListener("load", checkWindowSize);
