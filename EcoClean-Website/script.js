/**
 * EcoWash — Natural Organic Detergent Website
 * Simple, Sweet & Clean JavaScript Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. Mobile Drawer Navigation
  // --------------------------------------------------------------------------
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
  const drawerCloseBtn = document.getElementById('drawerCloseBtn');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  const header = document.getElementById('header');

  function openMobileMenu() {
    mobileMenuOverlay.classList.add('active');
    mobileMenuBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    mobileMenuOverlay.classList.remove('active');
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
      const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
      if (isExpanded) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  if (drawerCloseBtn) {
    drawerCloseBtn.addEventListener('click', closeMobileMenu);
  }

  if (mobileMenuOverlay) {
    mobileMenuOverlay.addEventListener('click', (e) => {
      if (e.target === mobileMenuOverlay) {
        closeMobileMenu();
      }
    });
  }

  mobileNavLinks.forEach((link) => {
    link.addEventListener('click', closeMobileMenu);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenuOverlay.classList.contains('active')) {
      closeMobileMenu();
    }
  });

  // --------------------------------------------------------------------------
  // 2. Header Scroll Effect & Active Link Highlighter
  // --------------------------------------------------------------------------
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  const sections = document.querySelectorAll('section[id]');
  const desktopNavLinks = document.querySelectorAll('.nav-link');

  function updateActiveNavLink() {
    const scrollPos = window.scrollY + 120;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        desktopNavLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNavLink, { passive: true });

  // --------------------------------------------------------------------------
  // 3. Photo Gallery Lightbox
  // --------------------------------------------------------------------------
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxBackdrop = document.getElementById('lightboxBackdrop');
  const galleryWraps = document.querySelectorAll('.gallery-img-wrap');

  galleryWraps.forEach((wrap) => {
    wrap.addEventListener('click', () => {
      const img = wrap.querySelector('.gallery-img');
      const card = wrap.closest('.gallery-card');
      const title = card ? card.querySelector('.caption-title')?.textContent : '';
      const desc = card ? card.querySelector('.caption-desc')?.textContent : '';

      if (img && lightboxModal && lightboxImg) {
        lightboxImg.src = img.getAttribute('src');
        lightboxCaption.innerHTML = `<strong>${title}</strong><br><span style="font-size: 0.88em; opacity: 0.85;">${desc}</span>`;
        lightboxModal.classList.add('active');
        lightboxModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeLightbox() {
    if (lightboxModal) {
      lightboxModal.classList.remove('active');
      lightboxModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightboxModal && lightboxModal.classList.contains('active')) {
      closeLightbox();
    }
  });

  // --------------------------------------------------------------------------
  // 4. FAQ Accordion
  // --------------------------------------------------------------------------
  const accordionTriggers = document.querySelectorAll('.accordion-trigger');

  accordionTriggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.accordion-item');
      const panel = item.querySelector('.accordion-panel');
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true';

      document.querySelectorAll('.accordion-item').forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          const otherTrigger = otherItem.querySelector('.accordion-trigger');
          const otherPanel = otherItem.querySelector('.accordion-panel');
          if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
          if (otherPanel) otherPanel.style.maxHeight = null;
        }
      });

      if (isExpanded) {
        item.classList.remove('active');
        trigger.setAttribute('aria-expanded', 'false');
        panel.style.maxHeight = null;
      } else {
        item.classList.add('active');
        trigger.setAttribute('aria-expanded', 'true');
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    });
  });

  // Open first item by default
  if (accordionTriggers.length > 0) {
    const firstTrigger = accordionTriggers[0];
    const firstItem = firstTrigger.closest('.accordion-item');
    const firstPanel = firstItem.querySelector('.accordion-panel');
    firstItem.classList.add('active');
    firstTrigger.setAttribute('aria-expanded', 'true');
    firstPanel.style.maxHeight = firstPanel.scrollHeight + 'px';
  }

  // --------------------------------------------------------------------------
  // 5. Product Sizing & Order Modal
  // --------------------------------------------------------------------------
  const orderModal = document.getElementById('orderModal');
  const orderCloseBtn = document.getElementById('orderCloseBtn');
  const orderBackdrop = document.getElementById('orderBackdrop');
  const confirmOrderBtn = document.getElementById('confirmOrderBtn');
  const selectedPlanLabel = document.getElementById('selectedPlanLabel');
  const modalSizeText = document.getElementById('modalSizeText');
  const modalPriceText = document.getElementById('modalPriceText');
  const modalWashText = document.getElementById('modalWashText');
  const selectPlanBtns = document.querySelectorAll('.select-plan-btn');

  const planDetails = {
    '250': {
      label: '250 mL Trial Pack',
      size: '250 mL',
      price: '₹99',
      washes: 'Approx. 8–10 machine loads'
    },
    '500': {
      label: '500 mL Classic Standard Bottle',
      size: '500 mL',
      price: '₹189',
      washes: 'Approx. 18–20 machine loads'
    },
    '1000': {
      label: '1 Litre Family Value Pack',
      size: '1000 mL (1 Litre)',
      price: '₹349',
      washes: 'Approx. 38–42 machine loads'
    }
  };

  selectPlanBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.pricing-card');
      const sizeKey = card ? card.getAttribute('data-size') : '500';
      const details = planDetails[sizeKey] || planDetails['500'];

      if (selectedPlanLabel) {
        selectedPlanLabel.innerHTML = `You selected: <strong>${details.label}</strong>`;
      }
      if (modalSizeText) modalSizeText.textContent = details.size;
      if (modalPriceText) modalPriceText.textContent = details.price;
      if (modalWashText) modalWashText.textContent = details.washes;

      if (orderModal) {
        orderModal.classList.add('active');
        orderModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeOrderModal() {
    if (orderModal) {
      orderModal.classList.remove('active');
      orderModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  if (orderCloseBtn) orderCloseBtn.addEventListener('click', closeOrderModal);
  if (orderBackdrop) orderBackdrop.addEventListener('click', closeOrderModal);
  if (confirmOrderBtn) confirmOrderBtn.addEventListener('click', closeOrderModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && orderModal && orderModal.classList.contains('active')) {
      closeOrderModal();
    }
  });

  // --------------------------------------------------------------------------
  // 6. Back to Top Button
  // --------------------------------------------------------------------------
  const backToTopBtn = document.getElementById('backToTopBtn');

  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTopBtn.style.opacity = '1';
        backToTopBtn.style.visibility = 'visible';
      } else {
        backToTopBtn.style.opacity = '0.5';
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  console.log('EcoWash website loaded successfully.');
});
