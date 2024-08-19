(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const s of t.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function n(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function a(e){if(e.ep)return;e.ep=!0;const t=n(e);fetch(e.href,t)}})();function c(){const o=document.querySelector(".navbar-mobile"),r=document.querySelector(".navbar__mobile-menu__close-item"),n=document.querySelector(".navbar__mobile-menu");o.addEventListener("click",()=>{n.classList.add("active")}),r.addEventListener("click",()=>{n.classList.remove("active")})}let i=!1;function l(){const o=document.querySelector(".navbar__mobile-menu__logos__wrapper");window.innerWidth<=576?o&&!i&&(o.innerHTML=`
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
        `,i=!0):o&&i&&(o.innerHTML="",i=!1)}c();window.addEventListener("resize",l);window.addEventListener("load",l);
