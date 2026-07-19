"use strict";

async function loadComponent(selector, path) {
  const container = document.querySelector(selector);

  if (!container) {
    return;
  }

  try {
    const response = await fetch(path);

    if (!response.ok) {
      throw new Error(
        `Unable to load ${path}. HTTP status: ${response.status}`
      );
    }

    const componentHTML = await response.text();

    container.innerHTML = componentHTML;
  } catch (error) {
    console.error(error);

    /*
      The page remains usable if the shared component fails.
      Only the unavailable component receives this message.
    */

    container.innerHTML = `
      <div class="component-error">
        Site navigation is temporarily unavailable.
      </div>
    `;
  }
}

function initializeNavigation() {
  const toggle = document.querySelector(".nav-toggle");
  const navigation = document.querySelector(".nav");

  if (!toggle || !navigation) {
    return;
  }

  toggle.addEventListener("click", () => {
    const currentlyOpen =
      toggle.getAttribute("aria-expanded") === "true";

    toggle.setAttribute(
      "aria-expanded",
      String(!currentlyOpen)
    );

    navigation.classList.toggle("open");

    toggle.setAttribute(
      "aria-label",
      currentlyOpen
        ? "Open navigation"
        : "Close navigation"
    );
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open navigation");
      navigation.classList.remove("open");
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") {
      return;
    }

    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open navigation");
    navigation.classList.remove("open");
  });
}

function markCurrentNavigationItem() {
  const currentPath = window.location.pathname;
  const navigationLinks = document.querySelectorAll(".nav a");

  navigationLinks.forEach((link) => {
    const linkURL = new URL(link.href, window.location.origin);
    const linkPath = linkURL.pathname;

    const isCurrentSection =
      linkPath !== "/" &&
      currentPath.startsWith(linkPath);

    if (isCurrentSection) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
  });
}

function setFooterYear() {
  const yearElement = document.querySelector("#footer-year");

  if (!yearElement) {
    return;
  }

  yearElement.textContent = String(
    new Date().getFullYear()
  );
}

async function initializeSite() {
  await Promise.all([
    loadComponent(
      "#site-header",
      "/components/header.html"
    ),

    loadComponent(
      "#site-footer",
      "/components/footer.html"
    )
  ]);

  initializeNavigation();
  markCurrentNavigationItem();
  setFooterYear();
}

document.addEventListener(
  "DOMContentLoaded",
  initializeSite
);