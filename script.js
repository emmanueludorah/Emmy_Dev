// Set current year in footer
const yearSpan = document.getElementById('year');
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// Optional: smooth scrolling for internal links (basic fallback)
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href').slice(1);
    const target = document.getElementById(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Scroll reveal animations
const revealSections = document.querySelectorAll('.reveal');
const revealItems = document.querySelectorAll('.reveal-item');

if ('IntersectionObserver' in window) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
        } else {
          entry.target.classList.remove('reveal-visible');
        }
      });
    },
    { threshold: 0.15 }
  );

  revealSections.forEach((el) => sectionObserver.observe(el));

  const itemObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
        } else {
          entry.target.classList.remove('reveal-visible');
        }
      });
    },
    { threshold: 0.2 }
  );

  revealItems.forEach((el, index) => {
    el.style.transitionDelay = `${index * 40}ms`;
    itemObserver.observe(el);
  });
} else {
  // Fallback: make everything visible
  revealSections.forEach((el) => el.classList.add('reveal-visible'));
  revealItems.forEach((el) => el.classList.add('reveal-visible'));
}

// Skills tabs toggle
const skillsTabs = document.querySelectorAll('.skills-tab');
const skillsPanels = document.querySelectorAll('.skills-panel');

skillsTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const targetId = tab.getAttribute('data-target');
    const targetPanel = document.getElementById(targetId);
    if (!targetPanel) return;

    skillsTabs.forEach((t) => t.classList.remove('skills-tab-active'));
    skillsPanels.forEach((panel) => {
      panel.classList.remove('skills-panel-active');
      panel.toggleAttribute('hidden', true);
    });

    tab.classList.add('skills-tab-active');
    targetPanel.classList.add('skills-panel-active');
    targetPanel.toggleAttribute('hidden', false);
  });
});
