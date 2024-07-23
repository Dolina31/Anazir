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

  // Fonction pour vérifier et ajuster les logos en fonction de la largeur de la fenêtre
  function checkWindowSize() {
    if (window.innerWidth <= 576) {
      // Vérifiez si les logos sont déjà ajoutés pour éviter les doublons
      if (
        !document.querySelector(".google-logo") &&
        !document.querySelector(".apple-logo")
      ) {
        const googleLogo = document.createElement("img");
        const googleLogoLink = document.createElement("a");
        googleLogoLink.href =
          "https://play.google.com/store/apps/details?id=com.Threevision.AnazirGame";
        googleLogo.src = "/assets/images/google-store-logo.png";
        googleLogo.alt = "Logo du google play store";
        googleLogo.classList.add("google-logo"); // Ajout d'une classe pour vérification future
        googleLogoLink.appendChild(googleLogo);
        mobileMenu.appendChild(googleLogoLink);

        const appleLogoLink = document.createElement("a");
        appleLogoLink.href =
          "https://apps.apple.com/us/app/anazir-td-arena-tower-defense/id6450485930?uo=2";
        const appleLogo = document.createElement("img");
        appleLogo.src = "/assets/images/apple-store-logo.png";
        appleLogo.alt = "Logo de l'apple store";
        appleLogo.classList.add("apple-logo"); // Ajout d'une classe pour vérification future
        appleLogoLink.appendChild(appleLogo);
        mobileMenu.appendChild(appleLogoLink);
      }
    } else {
      // Supprimez les logos si la largeur de la fenêtre est supérieure à 576px
      const googleLogo = document.querySelector(".google-logo");
      const appleLogo = document.querySelector(".apple-logo");
      if (googleLogo) googleLogo.parentElement.remove();
      if (appleLogo) appleLogo.parentElement.remove();
    }
  }

  // Vérification de la taille de la fenêtre au chargement de la page
  checkWindowSize();

  // Vérification la taille de la fenêtre à chaque redimensionnement
  window.addEventListener("resize", checkWindowSize);
}
