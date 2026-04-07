document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = Array.from(
    document.querySelectorAll("#filters [data-filter]")
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

  document.querySelectorAll("mark").forEach((mark) => {
    mark.style.background = "transparent";
    mark.style.color = "inherit";
    mark.style.boxShadow = "none";
    mark.style.padding = "0";
    mark.style.borderRadius = "0";
  });
});
