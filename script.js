// Set current year in footer
const yearSpan = document.getElementById('year');
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// Handle PDF download for all devices (especially mobile)
const downloadCVBtn = document.querySelector('.download-cv-btn');
if (downloadCVBtn) {
  downloadCVBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    
    const pdfUrl = downloadCVBtn.getAttribute('href');
    const fileName = pdfUrl.split('/').pop() || 'Emmanuel-Udorah-CV.pdf';
    
    try {
      const response = await fetch(pdfUrl);
      const blob = await response.blob();
      
      // Create a blob URL
      const blobUrl = window.URL.createObjectURL(blob);
      
      // Create a temporary link and trigger download
      const tempLink = document.createElement('a');
      tempLink.href = blobUrl;
      tempLink.download = fileName;
      tempLink.style.display = 'none';
      
      document.body.appendChild(tempLink);
      tempLink.click();
      document.body.removeChild(tempLink);
      
      // Clean up the blob URL
      setTimeout(() => {
        window.URL.revokeObjectURL(blobUrl);
      }, 100);
    } catch (error) {
      // Fallback: open the PDF in a new tab if download fails
      console.warn('Download failed, opening PDF in new tab:', error);
      window.open(pdfUrl, '_blank');
    }
  });
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

// Handle contact form submission without page redirect
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const button = contactForm.querySelector('button[type="submit"]');
    const originalText = button.textContent;
    
    try {
      button.textContent = 'Sending...';
      button.disabled = true;
      
      const response = await fetch(contactForm.getAttribute('action'), {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        // Success! Show message and reset form
        button.textContent = 'Message Sent! ✓';
        button.style.backgroundColor = '#4ade80';
        contactForm.reset();
        
        // Reset button after 3 seconds
        setTimeout(() => {
          button.textContent = originalText;
          button.disabled = false;
          button.style.backgroundColor = '';
        }, 3000);
      } else {
        button.textContent = 'Error sending. Try again.';
        setTimeout(() => {
          button.textContent = originalText;
          button.disabled = false;
        }, 3000);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      button.textContent = 'Error. Please try again.';
      setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
      }, 3000);
    }
  });
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
