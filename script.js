document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = Array.from(
    document.querySelectorAll("[data-filter]")
  );

  const experienceCards = Array.from(
    document.querySelectorAll("[data-domain]")
  );

  function setActiveFilter(selectedFilter) {
    filterButtons.forEach((button) => {
      const isActive = button.dataset.filter === selectedFilter;
      button.classList.toggle("active", isActive);
    });

    experienceCards.forEach((card) => {
      const domain = card.dataset.domain || "";
      const shouldShow =
        selectedFilter === "All" || domain === selectedFilter;

      card.style.display = shouldShow ? "" : "none";
    });
  }

  if (filterButtons.length && experienceCards.length) {
    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const selectedFilter = button.dataset.filter || "All";
        setActiveFilter(selectedFilter);
      });
    });

    setActiveFilter("All");
  }

  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const targetEl = document.querySelector(targetId);
      if (!targetEl) return;

      event.preventDefault();
      targetEl.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  });

  function removeInjectedHighlights() {
    document.querySelectorAll("mark, .highlight, [data-highlight]").forEach((el) => {
      el.style.background = "transparent";
      el.style.color = "inherit";
      el.style.boxShadow = "none";
      el.style.textShadow = "none";
      el.style.padding = "0";
      el.style.borderRadius = "0";
    });
  }

  removeInjectedHighlights();

  const observer = new MutationObserver(() => {
    removeInjectedHighlights();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
  });
});
