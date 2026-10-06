/* Detroit Trouble EPK — behaviour.
   Links live in js/config.js. Nothing in this file needs editing. */
(function () {
  "use strict";

  var LINKS = window.EPK_LINKS || {};
  if (window.EPK_SHOW_FPO) document.documentElement.classList.add("show-fpo");

  function isUnset(url) {
    return !url || /_PENDING$/.test(url);
  }

  /* 1. Wire every [data-link="key"] element to its URL in config.js.
        Unset links never appear as dead buttons: the [data-hide-if-unset]
        wrapper around the link is taken off the page; with no wrapper
        (press outlets) the link simply becomes plain text. */
  document.querySelectorAll("[data-link]").forEach(function (el) {
    var url = LINKS[el.getAttribute("data-link")];
    if (isUnset(url)) {
      el.removeAttribute("href");
      var wrapper = el.closest("[data-hide-if-unset]");
      if (wrapper) wrapper.remove();
      return;
    }
    el.setAttribute("href", url);
    if (/^https?:/.test(url)) {
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener");
    }
  });

  /* 2. Play YouTube links marked [data-video] in an on-page player.
        No video loads until a visitor clicks. */
  var dialog = document.getElementById("player");
  var frame = dialog && dialog.querySelector(".player__frame");
  var canEmbed = dialog && typeof dialog.showModal === "function" &&
                 /^https?:$/.test(window.location.protocol); /* YouTube refuses file:// pages */

  function youTubeId(url) {
    var m = String(url).match(/(?:youtu\.be\/|[?&]v=|\/embed\/|\/shorts\/|\/live\/)([\w-]{11})/);
    return m ? m[1] : null;
  }

  if (canEmbed) {
    document.querySelectorAll("a[data-video]").forEach(function (link) {
      link.addEventListener("click", function (event) {
        var id = youTubeId(link.getAttribute("href"));
        if (!id || event.metaKey || event.ctrlKey || event.shiftKey) return; /* fall back to YouTube */
        event.preventDefault();
        var iframe = document.createElement("iframe");
        iframe.src = "https://www.youtube-nocookie.com/embed/" + id + "?autoplay=1&rel=0";
        iframe.title = link.getAttribute("data-title") || "Detroit Trouble video";
        iframe.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen";
        iframe.referrerPolicy = "strict-origin-when-cross-origin";
        iframe.allowFullscreen = true;
        frame.replaceChildren(iframe);
        dialog.showModal();
      });
    });
    dialog.addEventListener("close", function () { frame.replaceChildren(); });
    dialog.addEventListener("click", function (event) {
      if (event.target === dialog) dialog.close(); /* click on backdrop */
    });
  }
})();
