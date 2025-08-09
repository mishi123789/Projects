// kitchen.js
document.addEventListener('DOMContentLoaded', () => {
  // year
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (!href || href === '#') return;
      const el = document.querySelector(href);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Recipes modal data
  const RECIPES = {
    biryani: {
      title: 'Chicken Biryani',
      body: `Ingredients:\n- Basmati rice\n- Chicken pieces\n- Yogurt, fried onions, spices\n\nSteps:\n1. Marinate chicken.\n2. Par-cook rice.\n3. Layer and steam (dum).`
    },
    karahi: {
      title: 'Chicken Karahi',
      body: `Ingredients:\n- Chicken, tomatoes, green chilies\n- Garlic, ginger, garam masala\n\nSteps:\n1. Saute spices and chicken.\n2. Add tomatoes and cook till oil separates.`
    },
    spaghetti: {
      title: 'Spaghetti',
      body: `Ingredients:\n- Spaghetti pasta\n- Olive oil, garlic, canned tomatoes, basil\n\nSteps:\n1. Boil pasta.\n2. Prepare sauce and toss pasta.`
    },
    lava: {
      title: 'Chocolate Lava Cake',
      body: `Ingredients:\n- Dark chocolate, butter, eggs, sugar, flour\n\nSteps:\n1. Melt chocolate & butter.\n2. Mix and bake briefly for gooey center.`
    },
    halwa: {
      title: 'Gajar Halwa',
      body: `Ingredients:\n- Grated carrots, milk, sugar, ghee\n\nSteps:\n1. Cook carrots in milk.\n2. Add sugar and ghee, garnish with nuts.`
    },
    mango: {
      title: 'Mango Shake',
      body: `Ingredients:\n- Ripe mango, milk, sugar, ice\n\nSteps:\n1. Blend all ingredients until smooth.`
    }
  };

  // modal elements
  const modal = document.getElementById('recipeModal');
  const modalTitle = document.getElementById('recipeTitle');
  const modalBody = document.getElementById('recipeBody');
  const modalClose = modal?.querySelector('.modal-close');

  // open recipes on card click or keyboard
  document.querySelectorAll('.card[data-recipe]').forEach(card => {
    const key = card.dataset.recipe;
    card.addEventListener('click', () => openRecipe(key));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openRecipe(key); }
    });
  });

  function openRecipe(key) {
    const R = RECIPES[key];
    if (!R) return;
    modalTitle.textContent = R.title;
    modalBody.textContent = R.body;
    modal.classList.add('show');
    modal.setAttribute('aria-hidden', 'false');
    modalClose?.focus();
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  modalClose?.addEventListener('click', closeModal);
  modal?.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

  // floating buttons: menu, map, whatsapp already link to resources. Add small animation on click:
  document.querySelectorAll('.fab').forEach(el => {
    el.addEventListener('click', () => {
      el.animate([{ transform: 'scale(1)' }, { transform: 'scale(.92)' }, { transform: 'scale(1)' }], { duration: 260 });
    });
  });

  // feedback auto-slide (simple)
  (function feedbackSlider() {
    const track = document.querySelector('.feedback-track');
    if (!track) return;
    const items = track.children;
    let idx = 0;
    setInterval(() => {
      idx = (idx + 1) % items.length;
      track.style.transform = `translateX(-${idx * 100}%)`;
      track.style.transition = 'transform .6s ease';
    }, 3800);
  })();

  // contact form: stub — replace with real backend integration
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const fd = new FormData(contactForm);
      const name = (fd.get('name') || '').toString().trim();
      const email = (fd.get('email') || '').toString().trim();
      const message = (fd.get('message') || '').toString().trim();
      if (!name || !email || !message) {
        alert('Please complete all fields.');
        return;
      }
      // TODO: send to backend or 3rd party service
      alert(`Thanks ${name}! We received your message.`);
      contactForm.reset();
    });
  }
});
