(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const c of t.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&a(c)}).observe(document,{childList:!0,subtree:!0});function r(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function a(e){if(e.ep)return;e.ep=!0;const t=r(e);fetch(e.href,t)}})();async function l(){const o=await fetch("../../components/footer/footer.html").then(e=>e.text()),n=await fetch("../../components/footer/footer.css").then(e=>e.text()),r=await fetch("../../components/navbar/navbar.html").then(e=>e.text()),a=await fetch("../../components/navbar/navbar.css").then(e=>e.text());return{footerHTML:o,footerCSS:n,navbarHTML:r,navbarCSS:a}}async function d(){const o=await l(),n=document.body,r=document.createElement("footer");r.innerHTML=o.footerHTML,n.parentNode.insertBefore(r,null);const a=document.createElement("style");a.type="text/css",a.textContent=o.footerCSS,document.head.appendChild(a);const e=document.createElement("header");e.innerHTML=o.navbarHTML,n.parentNode.insertBefore(e,n),m();const t=document.createElement("style");t.type="text/css",t.textContent=o.navbarCSS,document.head.appendChild(t)}window.addEventListener("DOMContentLoaded",d);function m(){const o=document.querySelector(".navbar-mobile"),n=document.querySelector(".navbar__mobile-menu__close-item"),r=document.querySelector(".navbar__mobile-menu");o.addEventListener("click",()=>{r.classList.add("active")}),n.addEventListener("click",()=>{r.classList.remove("active")})}let s=!1;function i(){const o=document.querySelector(".navbar__mobile-menu__logos__wrapper");window.innerWidth<=576?o&&!s&&(o.innerHTML=`
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
      `,s=!0):o&&s&&(o.innerHTML="",s=!1)}window.addEventListener("resize",i);window.addEventListener("load",i);
