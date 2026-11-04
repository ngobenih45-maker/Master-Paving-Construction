(() => {
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");
  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(open));
      menuButton.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    });
    nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
    }));
  }

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Reveal-on-scroll animation with a graceful fallback.
  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add("is-visible"));
  }

  // Subtle pointer-based 3D tilt on desktop; disabled for touch and reduced motion.
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (window.matchMedia("(hover: hover) and (pointer: fine)").matches && !reduceMotion) {
    document.querySelectorAll(".tilt-card").forEach(card => {
      card.addEventListener("pointermove", event => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `perspective(850px) rotateX(${y * -5}deg) rotateY(${x * 5}deg) translateY(-3px)`;
      });
      card.addEventListener("pointerleave", () => { card.style.transform = ""; });
    });
  }

  // Service buttons start a WhatsApp conversation with the clicked service prefilled.
  document.querySelectorAll(".service-wa").forEach(button => {
    button.addEventListener("click", () => {
      const service = button.dataset.service || "a project";
      const message = `Hello Master Paving Construction, I'm interested in ${service}. Please let me know how I can get a free quotation.`;
      window.open(`https://wa.me/27630387098?text=${encodeURIComponent(message)}`, "_blank", "noopener");
    });
  });

  // Enquiry form composes a personalised WhatsApp message; no backend is required.
  const form = document.getElementById("quoteForm");
  if (form) {
    form.addEventListener("submit", event => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const data = new FormData(form);
      const message = [
        "Hello Master Paving Construction, I'd like to request a quotation.",
        `Name: ${data.get("name")}`,
        `Contact number: ${data.get("phone")}`,
        `Service: ${data.get("service")}`,
        `Project location: ${data.get("location") || "Not provided"}`,
        `Project details: ${data.get("message") || "I would like to discuss my requirements."}`
      ].join("\n");
      window.open(`https://wa.me/27630387098?text=${encodeURIComponent(message)}`, "_blank", "noopener");
    });
  }
})();