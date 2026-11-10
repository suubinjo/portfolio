const SITE_EMAIL = "suubinjo@gmail.com";
const RESUME_URL = "/resume/";
const LINKEDIN_URL = "https://www.linkedin.com/in/subinjo68/";

if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

function resetScrollPosition() {
  window.scrollTo(0, 0);
}

resetScrollPosition();
window.addEventListener("pageshow", (event) => {
  if (event.persisted) resetScrollPosition();
});

if (window.location.protocol.startsWith("http")) {
  const cleanPath = window.location.pathname
    .replace(/\/index\.html$/, "/")
    .replace(/\/([^/]+)\.html$/, "/$1/");

  if (cleanPath !== window.location.pathname) {
    window.history.replaceState(null, "", `${cleanPath}${window.location.search}${window.location.hash}`);
  }
}

document.querySelectorAll(".animate-letters").forEach((element) => {
  const text = element.textContent || "";
  element.setAttribute("aria-label", element.getAttribute("aria-label") || text);
  element.textContent = "";

  Array.from(text).forEach((letter, index) => {
    const span = document.createElement("span");
    span.className = letter === " " ? "char char-space" : "char";
    span.style.setProperty("--char-index", index.toString());
    span.textContent = letter === " " ? "\u00a0" : letter;
    element.appendChild(span);
  });
});

const animatedCaseElements = document.querySelectorAll(
  ".case-study-shell .case-award, .case-study-shell .case-deck, .case-study-shell .case-facts > div, .case-study-shell .case-hero-media, .case-study-section"
);

animatedCaseElements.forEach((element) => {
  element.classList.add("scroll-fade");
});

if ("IntersectionObserver" in window) {
  const fadeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        fadeObserver.unobserve(entry.target);
      });
    },
    {
      threshold: 0.14,
      rootMargin: "0px 0px -8% 0px",
    }
  );

  animatedCaseElements.forEach((element) => fadeObserver.observe(element));
} else {
  animatedCaseElements.forEach((element) => {
    element.classList.add("is-visible");
  });
}

const eaHighlights = document.querySelectorAll(".ea-highlight");

if (eaHighlights.length) {
  const syncEaHighlights = () => {
    eaHighlights.forEach((highlight) => {
      const rect = highlight.getBoundingClientRect();
      const shouldPlay =
        rect.top <= window.innerHeight * 0.72 &&
        rect.bottom >= window.innerHeight * 0.18;
      const isActive = highlight.dataset.highlightActive === "true";

      if (shouldPlay && !isActive) {
        highlight.classList.remove("is-highlight-visible");
        void highlight.offsetWidth;
        highlight.classList.add("is-highlight-visible");
        highlight.dataset.highlightActive = "true";
      }

      if (!shouldPlay && isActive) {
        highlight.classList.remove("is-highlight-visible");
        highlight.dataset.highlightActive = "false";
      }
    });
  };

  window.addEventListener("scroll", syncEaHighlights, { passive: true });
  window.addEventListener("resize", syncEaHighlights);
  requestAnimationFrame(syncEaHighlights);
}

document.querySelectorAll(".case-nav-top").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    scrollToSection("top");
  });
});

function scrollToSection(id) {
  const element = document.getElementById(id);
  if (!element) return;

  const offset = id === "top" ? 0 : 100;
  const top = element.getBoundingClientRect().top + window.scrollY - offset;

  window.scrollTo({
    top,
    behavior: "smooth",
  });
}

document.querySelectorAll(".jump-solution-button").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    scrollToSection("solution");
  });
});

document.querySelectorAll(".image-zoom-trigger").forEach((button) => {
  button.addEventListener("click", () => {
    const image = button.querySelector("img");
    if (!image) return;

    const lightbox = document.createElement("div");
    lightbox.className = "image-lightbox";
    lightbox.setAttribute("role", "dialog");
    lightbox.setAttribute("aria-modal", "true");
    lightbox.setAttribute("aria-label", image.alt || "Expanded image");

    lightbox.innerHTML = `
      <button class="image-lightbox-close" type="button" aria-label="Close expanded image">×</button>
      <img src="${image.currentSrc || image.src}" alt="${image.alt}" />
    `;

    const closeLightbox = () => {
      lightbox.remove();
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeydown);
    };

    function handleKeydown(event) {
      if (event.key === "Escape") closeLightbox();
    }

    lightbox.addEventListener("click", closeLightbox);
    document.addEventListener("keydown", handleKeydown);
    document.body.style.overflow = "hidden";
    document.body.appendChild(lightbox);
    lightbox.querySelector(".image-lightbox-close")?.focus();
  });
});

const navInvertTargets = Array.from(document.querySelectorAll(".nav-invert-target"));
const sectionIndexes = Array.from(document.querySelectorAll(".section-index"));

if (navInvertTargets.length && sectionIndexes.length) {
  const updateNavTone = () => {
    const triggerX = window.innerWidth < 760 ? 24 : 80;
    const triggerY = window.innerHeight * 0.32;
    const shouldInvert = navInvertTargets.some((target) => {
      const rect = target.getBoundingClientRect();
      return rect.left <= triggerX && rect.right >= triggerX && rect.top <= triggerY && rect.bottom >= triggerY;
    });

    sectionIndexes.forEach((nav) => nav.classList.toggle("is-light", shouldInvert));
    document.querySelectorAll(".case-nav-top").forEach((link) => link.classList.toggle("is-light", shouldInvert));
  };

  updateNavTone();
  window.addEventListener("scroll", updateNavTone, { passive: true });
  window.addEventListener("resize", updateNavTone);
}

const milestoneGalleryItems = Array.from(document.querySelectorAll(".milestone-gallery-item"));

if (milestoneGalleryItems.length) {
  const galleryImages = milestoneGalleryItems.map((item) => {
    const image = item.querySelector("img");
    const caption = item.querySelector("span")?.textContent || image?.alt || "";
    return {
      src: image?.currentSrc || image?.src || "",
      alt: image?.alt || caption,
      caption,
    };
  });

  milestoneGalleryItems.forEach((item) => {
    item.addEventListener("click", () => {
      openMilestoneGallery(Number(item.dataset.galleryIndex || 0), galleryImages);
    });
  });
}

function openMilestoneGallery(startIndex, images) {
  let currentIndex = startIndex;
  const lightbox = document.createElement("div");
  lightbox.className = "gallery-lightbox";
  lightbox.setAttribute("role", "dialog");
  lightbox.setAttribute("aria-modal", "true");
  lightbox.setAttribute("aria-label", "Milestone Seed delivery gallery");

  lightbox.innerHTML = `
    <button class="gallery-lightbox-close" type="button" aria-label="Close gallery">×</button>
    <button class="gallery-lightbox-nav gallery-lightbox-prev" type="button" aria-label="Previous image">‹</button>
    <div class="gallery-lightbox-stage">
      <img alt="" />
    </div>
    <button class="gallery-lightbox-nav gallery-lightbox-next" type="button" aria-label="Next image">›</button>
    <div class="gallery-lightbox-dots" aria-label="Gallery pagination"></div>
  `;

  const image = lightbox.querySelector(".gallery-lightbox-stage img");
  const dots = lightbox.querySelector(".gallery-lightbox-dots");

  images.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("aria-label", `View image ${index + 1}`);
    dot.addEventListener("click", () => {
      currentIndex = index;
      updateGallery();
    });
    dots?.appendChild(dot);
  });

  const updateGallery = () => {
    const current = images[currentIndex];
    if (!current || !image) return;
    image.src = current.src;
    image.alt = current.alt;
    dots?.querySelectorAll("button").forEach((dot, index) => {
      dot.classList.toggle("is-active", index === currentIndex);
    });
  };

  const showNext = () => {
    currentIndex = (currentIndex + 1) % images.length;
    updateGallery();
  };

  const showPrevious = () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateGallery();
  };

  const closeLightbox = () => {
    lightbox.remove();
    document.body.style.overflow = "";
    document.removeEventListener("keydown", handleKeydown);
  };

  function handleKeydown(event) {
    if (event.key === "Escape") closeLightbox();
    if (event.key === "ArrowRight") showNext();
    if (event.key === "ArrowLeft") showPrevious();
  }

  lightbox.addEventListener("click", closeLightbox);
  lightbox.querySelector(".gallery-lightbox-close")?.addEventListener("click", closeLightbox);
  lightbox.querySelector(".gallery-lightbox-dots")?.addEventListener("click", (event) => event.stopPropagation());
  lightbox.querySelector(".gallery-lightbox-next")?.addEventListener("click", (event) => {
    event.stopPropagation();
    showNext();
  });
  lightbox.querySelector(".gallery-lightbox-prev")?.addEventListener("click", (event) => {
    event.stopPropagation();
    showPrevious();
  });
  document.addEventListener("keydown", handleKeydown);
  document.body.style.overflow = "hidden";
  document.body.appendChild(lightbox);
  updateGallery();
  lightbox.querySelector(".gallery-lightbox-close")?.focus();
}

function syncEaValidationVideoHeight() {
  document.querySelectorAll(".ea-validation-media").forEach((media) => {
    const poster = media.querySelector(".ea-poster-zoom");
    const video = media.querySelector(".ea-video-embed");
    if (!poster || !video) return;

    const isStacked = window.matchMedia("(max-width: 680px)").matches;
    if (isStacked) {
      video.style.height = "";
      return;
    }

    const posterHeight = poster.getBoundingClientRect().height;
    if (posterHeight > 0) {
      video.style.height = `${posterHeight}px`;
    }
  });
}

window.addEventListener("load", syncEaValidationVideoHeight);
window.addEventListener("resize", syncEaValidationVideoHeight);

if ("ResizeObserver" in window) {
  document.querySelectorAll(".ea-poster-zoom").forEach((poster) => {
    const observer = new ResizeObserver(syncEaValidationVideoHeight);
    observer.observe(poster);
  });
}

document.querySelectorAll(".section-index").forEach((nav) => {
  const rawSections = nav.dataset.sections || "";
  const sections = rawSections
    .split(",")
    .map((item) => {
      const [id, label] = item.split(":");
      return { id: id?.trim(), label: label?.trim() };
    })
    .filter((section) => section.id && section.label);

  sections.forEach((section) => {
    const link = document.createElement("a");
    link.href = `#${section.id}`;
    link.textContent = section.label;
    link.addEventListener("click", (event) => {
      event.preventDefault();
      scrollToSection(section.id);
    });
    nav.appendChild(link);
  });

  const links = Array.from(nav.querySelectorAll("a"));
  let ticking = false;

  const updateActiveSection = () => {
    const hero = document.getElementById("top");
    const trigger = window.innerHeight * 0.3;

    if (hero && hero.getBoundingClientRect().bottom > trigger) {
      links.forEach((link) => link.classList.remove("is-active"));
      return;
    }

    let activeId = "";
    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (!element) return;
      if (element.getBoundingClientRect().top <= trigger) {
        activeId = section.id;
      }
    });

    links.forEach((link) => {
      link.classList.toggle("is-active", link.getAttribute("href") === `#${activeId}`);
    });
  };

  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(() => {
      updateActiveSection();
      ticking = false;
    });
  };

  updateActiveSection();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", updateActiveSection);
});

const homeClock = document.getElementById("home-clock");
const homeCopyFlash = document.getElementById("home-copy-flash");
const sidebarCopyFlash = document.querySelector(".home-sidebar-copy-flash");
const homeCopyEmailButton = document.querySelector("[data-home-copy-email]");

async function writeTextToClipboard(text) {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (error) {
      /* fall through to legacy copy */
    }
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.top = "0";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();

  let copied = false;
  try {
    copied = document.execCommand("copy");
  } catch (error) {
    copied = false;
  }

  textarea.remove();
  return copied;
}

const homeCopyFlashTimers = { show: 0, hide: 0 };
const sidebarCopyFlashTimers = { show: 0, hide: 0 };

function revealCopyFlash(flash, timers) {
  if (!flash) return;

  window.clearTimeout(timers.show);
  window.clearTimeout(timers.hide);

  flash.hidden = false;
  flash.classList.remove("is-leaving");
  requestAnimationFrame(() => {
    flash.classList.add("is-visible");
  });

  timers.show = window.setTimeout(() => {
    flash.classList.remove("is-visible");
    flash.classList.add("is-leaving");
    timers.hide = window.setTimeout(() => {
      flash.classList.remove("is-leaving");
      flash.hidden = true;
    }, 220);
  }, 1200);
}

function showEmailCopiedFeedback(source = "hint") {
  const flash = source === "sidebar" ? sidebarCopyFlash : homeCopyFlash;
  const timers = source === "sidebar" ? sidebarCopyFlashTimers : homeCopyFlashTimers;
  revealCopyFlash(flash, timers);
}

async function copySiteEmail(source = "hint") {
  const copied = await writeTextToClipboard(SITE_EMAIL);
  if (copied) {
    showEmailCopiedFeedback(source);
    return;
  }

  window.location.href = `mailto:${SITE_EMAIL}`;
}

homeCopyEmailButton?.addEventListener("click", () => {
  void copySiteEmail("sidebar");
});

if (homeClock) {
  const updateHomeClock = () => {
    const parts = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Seoul",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).formatToParts(new Date());

  const hour = parts.find((part) => part.type === "hour")?.value ?? "00";
  const minute = parts.find((part) => part.type === "minute")?.value ?? "00";
  const second = parts.find((part) => part.type === "second")?.value ?? "00";

    homeClock.textContent = `Seoul, KR ${hour}:${minute}:${second}`;
  };

  updateHomeClock();
  window.setInterval(updateHomeClock, 1000);
}

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!prefersReducedMotion) {
  document.querySelector(".home-intro")?.classList.add("home-intro--enter");
  document.querySelector(".home-work")?.classList.add("home-work--intro");
}

if (document.body.classList.contains("home-page")) {
  window.addEventListener(
    "keydown",
    (event) => {
      if (event.defaultPrevented) return;
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      if (event.isComposing) return;
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) return;
      if (event.target instanceof HTMLElement && event.target.isContentEditable) return;

      const isCopyKey = event.key === "c" || event.key === "C" || event.code === "KeyC";
      if (!isCopyKey) return;

      event.preventDefault();
      void copySiteEmail();
    },
    true,
  );
}
