"use strict";

async function loadComponent(selector, path) {
  const container = document.querySelector(selector);
  if (!container) return;

  try {
    const response = await fetch(path);
    if (!response.ok) throw new Error(`Unable to load ${path}`);
    container.innerHTML = await response.text();
  } catch (error) {
    console.error(error);
    container.innerHTML = '<div class="component-error">Site navigation is temporarily unavailable.</div>';
  }
}

function initializeNavigation() {
  const toggle = document.querySelector(".nav-toggle");
  const navigation = document.querySelector(".nav");
  if (!toggle || !navigation) return;

  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!open));
    toggle.setAttribute("aria-label", open ? "Open navigation" : "Close navigation");
    navigation.classList.toggle("open");
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open navigation");
      navigation.classList.remove("open");
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open navigation");
      navigation.classList.remove("open");
    }
  });
}

function markCurrentNavigationItem() {
  const path = window.location.pathname;
  document.querySelectorAll(".nav a").forEach((link) => {
    const linkPath = new URL(link.href, window.location.origin).pathname;
    if (linkPath !== "/" && path.startsWith(linkPath)) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
  });
}

function setFooterYear() {
  const year = document.querySelector("#footer-year");
  if (year) year.textContent = String(new Date().getFullYear());
}

async function initializeSite() {
  await Promise.all([
    loadComponent("#site-header", "/components/header.html"),
    loadComponent("#site-footer", "/components/footer.html")
  ]);
  initializeNavigation();
  markCurrentNavigationItem();
  setFooterYear();
}

document.addEventListener("DOMContentLoaded", () => {
  initializeIntro();
  initializeSite();
});

function initializeIntro() {
  const splash = document.querySelector("#splash");
  const skip = document.querySelector("#skip-intro");

  if (!splash) {
    document.body.classList.remove("intro-active");
    return;
  }

  let dismissed = false;

  const dismissIntro = () => {
    if (dismissed) return;
    dismissed = true;

    splash.classList.add("hide");
    document.body.classList.remove("intro-active");

    window.setTimeout(() => {
      splash.remove();
    }, 900);
  };

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    dismissIntro();
    return;
  }

  skip?.addEventListener("click", dismissIntro);
  window.setTimeout(dismissIntro, 3300);
}

