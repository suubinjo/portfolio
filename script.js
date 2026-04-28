const SITE_EMAIL = "suubinjo@gmail.com";
const RESUME_URL = "https://drive.google.com/file/d/19NEW1CUlaJjbJ3I4x2WTdFNShMXOpIA7/view?usp=sharing";
const LINKEDIN_URL = "https://www.linkedin.com/in/subinjo68/";

const FALLBACK_UPDATED_DATE = "April, 28th";
const GITHUB_REPO = "suubinjo/portfolio";

if (window.location.protocol.startsWith("http")) {
  const cleanPath = window.location.pathname
    .replace(/\/index\.html$/, "/")
    .replace(/\/([^/]+)\.html$/, "/$1/");

  if (cleanPath !== window.location.pathname) {
    window.history.replaceState(null, "", `${cleanPath}${window.location.search}${window.location.hash}`);
  }
}

function formatMonthDay(dateString) {
  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return FALLBACK_UPDATED_DATE;
  }

  const month = date.toLocaleDateString("en-US", { month: "long" });
  const day = date.getDate();

  function getOrdinal(n) {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  }

  return `${month}, ${getOrdinal(day)}`;
}

async function updateFooterDate() {
  const dateElement = document.querySelector(".js-last-updated");

  if (!dateElement) return;

  try {
    const response = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/commits?per_page=1&_=${Date.now()}`);

    if (!response.ok) throw new Error("Could not fetch latest commit date");

    const commits = await response.json();
    const latestCommitDate = commits?.[0]?.commit?.committer?.date;

    dateElement.textContent = `Last updated: ${formatMonthDay(latestCommitDate)}`;
    dateElement.dataset.loaded = "true";
  } catch (error) {
    dateElement.textContent = `Last updated: ${FALLBACK_UPDATED_DATE}`;
    dateElement.dataset.loaded = "fallback";
  }
}

function createFooter() {
  const footer = document.createElement("footer");
  footer.className = "site-footer";
  footer.innerHTML = `
    <div class="connect">
      <span>Thanks for stopping by ₍^. .^₎⟆ Let's connect:</span>
      <a class="footer-icon" href="${RESUME_URL}" target="_blank" rel="noreferrer" aria-label="Resume">
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M7 3h8.2L19 6.8V21H7V3Zm7.5 1.8v2.7H17.2L14.5 4.8ZM9.7 10.2h6.1v1.5H9.7v-1.5Zm0 3.2h6.1v1.5H9.7v-1.5Zm0 3.2h4.3v1.5H9.7v-1.5Z" />
        </svg>
      </a>
      <div class="email-copy" data-email="${SITE_EMAIL}">
        <button class="email-copy-button" type="button" aria-label="Copy email">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M16.5 12C16.5 14.7614 14.4853 17 12 17C9.51472 17 7.5 14.7614 7.5 12C7.5 9.23858 9.51472 7 12 7C14.4853 7 16.5 9.23858 16.5 12Z" stroke="currentColor" stroke-width="1.8" />
            <path d="M16.5 12V14C16.5 15.1046 17.1716 16 18 16C18.8284 16 19.5 15.1046 19.5 14V12C19.5 7.85786 16.1421 4.5 12 4.5C7.85786 4.5 4.5 7.85786 4.5 12C4.5 16.1421 7.85786 19.5 12 19.5H15" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
        <div class="email-copy-popup">Copy email</div>
      </div>
      <a class="footer-icon" href="${LINKEDIN_URL}" target="_blank" rel="noreferrer" aria-label="LinkedIn">
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M6.7 8.8H3.8V20h2.9V8.8ZM5.3 4a1.7 1.7 0 1 0 0 3.4A1.7 1.7 0 0 0 5.3 4Zm6.1 4.8H8.6V20h2.9v-5.9c0-1.6.7-2.6 2.1-2.6 1.2 0 1.8.8 1.8 2.6V20h2.9v-6.5c0-3.1-1.6-4.8-4.1-4.8-1.4 0-2.3.7-2.8 1.5V8.8Z" />
        </svg>
      </a>
    </div>
    <div class="date-stamp">
      <span class="js-last-updated">Last updated: ${FALLBACK_UPDATED_DATE}</span>
      <span>©2026 Subin Jo</span>
    </div>
  `;
  return footer;
}

document.querySelectorAll("site-footer").forEach((placeholder) => {
  placeholder.replaceWith(createFooter());
});

updateFooterDate();

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

document.querySelectorAll(".email-copy").forEach((wrapper) => {
  const button = wrapper.querySelector(".email-copy-button");
  const popup = wrapper.querySelector(".email-copy-popup");
  const email = wrapper.dataset.email || SITE_EMAIL;

  wrapper.addEventListener("mouseenter", () => {
    wrapper.classList.remove("hide-popup");
  });

  button?.addEventListener("click", async () => {
    try {
      wrapper.classList.remove("hide-popup");
      await navigator.clipboard.writeText(email);
      wrapper.classList.add("is-copied");
      button.classList.add("is-copied");
      if (popup) popup.textContent = "Copied!";

      window.setTimeout(() => {
        wrapper.classList.remove("is-copied");
        wrapper.classList.add("hide-popup");
        button.classList.remove("is-copied");
        window.setTimeout(() => {
          if (popup) popup.textContent = "Copy email";
        }, 220);
      }, 1600);
    } catch (error) {
      window.location.href = `mailto:${email}`;
    }
  });
});

const lockedCards = document.querySelectorAll(".project-card.locked");

lockedCards.forEach((card) => {
  card.addEventListener("click", () => {
    card.animate(
      [
        { transform: "translateX(0)" },
        { transform: "translateX(-4px)" },
        { transform: "translateX(4px)" },
        { transform: "translateX(0)" },
      ],
      {
        duration: 220,
        easing: "ease-out",
      }
    );
  });
});

const eaCard = document.querySelector(".ea-card");

if (eaCard) {
  const cursor = document.createElement("div");
  cursor.className = "ea-cursor";
  cursor.innerHTML = 'Work in progress ... <span class="ea-caret">|</span>';
  document.body.appendChild(cursor);

  eaCard.addEventListener("pointerenter", () => {
    cursor.classList.add("is-visible");
  });

  eaCard.addEventListener("pointermove", (event) => {
    cursor.style.left = `${event.clientX + 24}px`;
    cursor.style.top = `${event.clientY - 24}px`;
  });

  eaCard.addEventListener("pointerleave", () => {
    cursor.classList.remove("is-visible");
  });
}

document.querySelectorAll(".case-top-link").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    document.getElementById("top")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
});

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
      document.getElementById(section.id)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
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
