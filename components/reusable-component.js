async function fetchComponents() {
  const footerHTML = await fetch("../../components/footer/footer.html").then(
    (response) => response.text()
  );
  const footerCSS = await fetch("../../components/footer/footer.css").then(
    (response) => response.text()
  );

  const navbarHTML = await fetch("../../components/navbar/navbar.html").then(
    (response) => response.text()
  );
  const navbarCSS = await fetch("../../components/navbar/navbar.css").then(
    (response) => response.text()
  );

  return {
    footerHTML,
    footerCSS,
    navbarHTML,
    navbarCSS,
  };
}

async function injectComponents() {
  const components = await fetchComponents();
  const body = document.body;

  const footerElement = document.createElement("footer");
  footerElement.innerHTML = components.footerHTML;
  body.parentNode.insertBefore(footerElement, null);

  const footerStyleElement = document.createElement("style");
  footerStyleElement.type = "text/css";
  footerStyleElement.textContent = components.footerCSS;
  document.head.appendChild(footerStyleElement);

  const navbarElement = document.createElement("header");
  navbarElement.innerHTML = components.navbarHTML;
  body.parentNode.insertBefore(navbarElement, body);

  navbar();

  const navbarStyleElement = document.createElement("style");
  navbarStyleElement.type = "text/css";
  navbarStyleElement.textContent = components.navbarCSS;
  document.head.appendChild(navbarStyleElement);
}
window.addEventListener("DOMContentLoaded", injectComponents);

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

// Appelez la fonction lors du redimensionnement de la fenêtre
window.addEventListener("resize", checkWindowSize);

// Appelez la fonction une fois au chargement de la page pour définir l'état initial
window.addEventListener("load", checkWindowSize);
