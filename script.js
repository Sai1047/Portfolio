document.addEventListener('DOMContentLoaded', () => {

  // --- THEME MANAGEMENT ---
  const themeToggle = document.getElementById('theme-toggle');
  const sunIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>`;
  const moonIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>`;
  
  const applyTheme = (theme) => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      themeToggle.innerHTML = sunIcon;
    } else {
      document.documentElement.classList.remove('dark');
      themeToggle.innerHTML = moonIcon;
    }
  };

  const currentTheme = localStorage.getItem('theme') || 'dark';
  applyTheme(currentTheme);

  themeToggle.addEventListener('click', () => {
    const newTheme = document.documentElement.classList.contains('dark') ? 'light' : 'dark';
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
  });


  // --- DYNAMIC GREETING ---
  const greetingEl = document.getElementById('greeting');
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning, I'm";
    if (hour < 18) return "Good Afternoon, I'm";
    return "Good Evening, I'm";
  };
  greetingEl.textContent = getGreeting();


  // --- TYPING ANIMATION ---
  const typeAnimationEl = document.getElementById('type-animation');
  const roles = ['Front-End Developer.', 'Creative Designer.', 'Digital Creator.'];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentRole = roles[roleIndex];
    let text = '';
    if (isDeleting) {
      text = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      text = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }
    typeAnimationEl.textContent = text;
    
    let typeSpeed = 150;
    if (isDeleting) typeSpeed /= 2;

    if (!isDeleting && charIndex === currentRole.length) {
      typeSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
  }
  type();


  // --- SCROLL-BASED UI CHANGES (HEADER & BACK-TO-TOP) ---
  const header = document.getElementById('header');
  const backToTopButton = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    // Sticky header
    if (window.scrollY > 10) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    // Back to top button
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
  });

  backToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  
  // Smooth scroll for nav links
  document.querySelectorAll('a.nav-link').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });


  // --- PROJECTS CAROUSEL ---
  const PROJECTS = [
    { title: 'Portfolio Website', description: 'A modern and responsive personal portfolio website to showcase my skills and projects, featuring dark/light modes.', imageUrl: 'https://picsum.photos/seed/project1/1200/800', liveDemoUrl: 'https://santo-dev.vercel.app', techStack: ['React', 'TypeScript', 'Tailwind CSS'] },
    { title: 'Task Manager App', description: 'A React-based productivity tool with real-time synchronization, allowing users to manage tasks efficiently.', imageUrl: 'src/project1.jpg', liveDemoUrl: 'https://github.com/Sai1047/Landing-Page', techStack: ['React', 'Firebase', 'Context API'] },
    { title: 'E-commerce Dashboard', description: 'An intuitive admin UI for an e-commerce platform, complete with data visualization for analytics and sales tracking.', imageUrl: 'src/project2.jpg', liveDemoUrl: 'https://github.com/Sai1047/Dashboard-Designs', techStack: ['React', 'D3.js', 'Styled Components'] },
    { title: 'Creative Landing Page', description: 'A visually appealing landing page with an animated hero section and smooth scrolling effects for a product launch.', imageUrl: 'src/project3.jpg', liveDemoUrl: 'https://github.com/Sai1047/Landing-Page', techStack: ['HTML5', 'CSS3', 'GSAP'] },
  ];

  const carouselWrapper = document.querySelector('.carousel-wrapper');
  PROJECTS.forEach((p, index) => {
    carouselWrapper.innerHTML += `
      <div class="carousel-slide" data-index="${index}">
        <img src="${p.imageUrl}" alt="${p.title}" />
        <div class="slide-content-wrapper">
          <div class="slide-content">
            <h3>${p.title}</h3>
            <p>${p.description}</p>
            <div class="tech-stack">${p.techStack.map(t => `<span class="tech-badge">${t}</span>`).join('')}</div>
            <a href="${p.liveDemoUrl }" target="_blank" rel="noopener noreferrer" class="details-btn">View Details</a>
          </div>
        </div>
      </div>
    `;
  });
  
  const slides = document.querySelectorAll('.carousel-slide');
  let currentIndex = 0;
  let autoSlideInterval;

  function updateCarousel() {
    slides.forEach((slide, index) => {
      slide.classList.remove('active', 'prev-slide', 'next-slide');
      if (index === currentIndex) {
        slide.classList.add('active');
      }
    });
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
  }
  
  function showPrev() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateCarousel();
  }

  document.querySelector('.carousel-btn.next').addEventListener('click', showNext);
  document.querySelector('.carousel-btn.prev').addEventListener('click', showPrev);

  function startAutoSlide() {
    stopAutoSlide(); // Prevent multiple intervals
    autoSlideInterval = setInterval(showNext, 5000);
  }

  function stopAutoSlide() {
    clearInterval(autoSlideInterval);
  }

  document.getElementById('project-carousel').addEventListener('mouseenter', stopAutoSlide);
  document.getElementById('project-carousel').addEventListener('mouseleave', startAutoSlide);
  
  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'ArrowLeft') showPrev();
  });

  updateCarousel();
  startAutoSlide();


  // --- CONTACT FORM SUBMISSION ---
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  const submitButton = document.getElementById('submit-button');

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';
    formStatus.textContent = '';

    const formData = new FormData(contactForm);
    // Replace with your Formspree endpoint ID
    const formspreeEndpoint = 'https://formspree.io/f/movyqzzd'; 

    try {
      // Dummy logic since the real endpoint is missing. Replace with fetch logic.
      if (formspreeEndpoint.includes('YOUR_FORM_ID_HERE')) {
         setTimeout(() => {
            formStatus.textContent = 'Message sent successfully!';
            formStatus.style.color = 'green';
            contactForm.reset();
        }, 1000);
      } else {
        const response = await fetch(formspreeEndpoint, {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' },
        });

        if (response.ok) {
            formStatus.textContent = 'Message sent successfully!';
            formStatus.style.color = 'green';
            contactForm.reset();
        } else {
            throw new Error('Form submission failed');
        }
      }
    } catch (error) {
        formStatus.textContent = 'Oops! There was a problem.';
        formStatus.style.color = 'red';
    } finally {
        setTimeout(() => {
            submitButton.disabled = false;
            submitButton.textContent = 'Send Message';
            formStatus.textContent = '';
        }, 5000);
    }
  });

});


