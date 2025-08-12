// script.js

document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.slide');
  const prevBtn = document.getElementById('prev');
  const nextBtn = document.getElementById('next');
  const indicators = document.querySelectorAll('.slider-indicators button');

  let currentIndex = 0;
  let slideInterval;

  function showSlide(index) {
    if (index >= slides.length) index = 0;
    if (index < 0) index = slides.length - 1;

    slides.forEach((slide, i) => {
      slide.style.transform = `translateX(${100 * (i - index)}%)`;
    });

    indicators.forEach((btn, i) => {
      btn.classList.toggle('active', i === index);
    });

    currentIndex = index;
  }

  function nextSlide() {
    showSlide(currentIndex + 1);
  }

  function prevSlide() {
    showSlide(currentIndex - 1);
  }

  prevBtn.addEventListener('click', () => {
    prevSlide();
    resetInterval();
  });

  nextBtn.addEventListener('click', () => {
    nextSlide();
    resetInterval();
  });

  indicators.forEach((btn, i) => {
    btn.addEventListener('click', () => {
      showSlide(i);
      resetInterval();
    });
  });

  function resetInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 4000);
  }

  // Initialize slider
  showSlide(0);
  slideInterval = setInterval(nextSlide, 4000);

  // Smooth scrolling for nav links
  document.querySelectorAll('nav a.nav-link').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const targetId = link.getAttribute('href').slice(1);
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Dynamic loading of projects from an array of YouTube URLs
  const projects = [
    { title: 'Project 1', youtubeId: 'dQw4w9WgXcQ' },
    { title: 'Project 2', youtubeId: '3JZ_D3ELwOQ' },
    { title: 'Project 3', youtubeId: 'L_jWHffIx5E' },
    { title: 'Project 4', youtubeId: 'kJQP7kiw5Fk' },
    { title: 'Project 5', youtubeId: 'fRh_vgS2dFE' },
  ];

  const projectsGrid = document.querySelector('.projects-grid');

  projects.forEach(({ title, youtubeId }) => {
    const projectCard = document.createElement('a');
    projectCard.className = 'project-card';
    projectCard.href = `https://www.youtube.com/watch?v=${youtubeId}`;
    projectCard.target = '_blank';
    projectCard.rel = 'noopener noreferrer';
    projectCard.title = title;

    projectCard.innerHTML = `
      <div class="project-thumb">
        <img src="https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg" alt="${title}" />
        <div class="project-play-icon">&#9658;</div>
      </div>
    `;

    projectsGrid.appendChild(projectCard);
  });
});

