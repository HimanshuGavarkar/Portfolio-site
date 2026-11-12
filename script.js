const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

document.documentElement.classList.add('js');
requestAnimationFrame(() => document.body.classList.add('page-ready'));

if (!reduceMotion && 'IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.18 });
  document.querySelectorAll('.about-strip, .about-fact, .interest-item, .project-image, .project-info, .gallery-item, .skill-cloud span, .timeline-item, .contact-content, .contact-footer').forEach((item) => {
    item.classList.add('reveal');
    revealObserver.observe(item);
  });
}

const setupScrollStory = () => {
  if (reduceMotion || !window.gsap || !window.ScrollTrigger) return;
  const { gsap, ScrollTrigger } = window;
  gsap.registerPlugin(ScrollTrigger);

  const previousHero = ScrollTrigger.getById('hero-master');
  if (previousHero) previousHero.kill();
  gsap.killTweensOf('.hero-photo, .hero-copy h1');
  gsap.set('.hero-photo, .hero-copy h1', { opacity: 1 });

  const heroIsMobile = window.matchMedia('(max-width: 760px)').matches;
  const heroStory = gsap.timeline({
    scrollTrigger: {
      trigger: '.hero',
      id: 'hero-master',
      start: 'top top',
      end: heroIsMobile ? 'bottom top' : '+=115%',
      scrub: 1.2,
      pin: !heroIsMobile,
      pinSpacing: true,
      invalidateOnRefresh: true
    }
  });
  heroStory.fromTo('.hero-photo', { y: 0, scale: 1 }, { y: -150, scale: .62, ease: 'none' }, 0)
    .fromTo('.hero-copy h1', { y: 0, scale: 1 }, { y: -105, scale: .7, ease: 'none' }, 0)
    .to('.hero-copy .hero-intro, .hero-actions', { y: -80, ease: 'none' }, .3)
    .to('.hero-meta, .hero-center-meta, .scroll-cue, .hero-socials', { opacity: 0, ease: 'none' }, .44);

  const aboutStory = gsap.timeline({ scrollTrigger: { trigger: '.manifesto', start: 'top 82%', end: 'bottom 32%', scrub: 1 } });
  aboutStory.from('.manifesto h2', { yPercent: 18, opacity: 0, ease: 'none', immediateRender: false }, 0)
    .from('.manifesto-body p', { y: 30, opacity: 0, stagger: .12, ease: 'none', immediateRender: false }, .08)
    .from('.portrait-slot', { clipPath: 'inset(0 100% 0 0)', ease: 'none', immediateRender: false }, .24)
    .from('.about-fact', { y: 22, opacity: 0, stagger: .1, ease: 'none', immediateRender: false }, .34);

  gsap.to('.marquee-track', { xPercent: -24, ease: 'none', scrollTrigger: { trigger: '.marquee', start: 'top bottom', end: 'bottom top', scrub: 1 } });

  gsap.from('.interest-intro h2', { xPercent: -12, opacity: 0, ease: 'none', immediateRender: false, scrollTrigger: { trigger: '.interests', start: 'top 78%', end: 'top 28%', scrub: 1 } });
  gsap.from('.interest-item', { x: 70, opacity: 0, stagger: .1, ease: 'none', immediateRender: false, scrollTrigger: { trigger: '.interest-list', start: 'top 82%', end: 'bottom 42%', scrub: 1 } });
  gsap.from('.skill-cloud span', { x: (index) => index % 2 ? 35 : -35, opacity: 0, stagger: .025, ease: 'none', immediateRender: false, scrollTrigger: { trigger: '.archive', start: 'top 78%', end: 'bottom 58%', scrub: 1 } });

  document.querySelectorAll('.project').forEach((project) => {
    const image = project.querySelector('.project-image');
    const copy = project.querySelector('.project-info');
    const heading = project.querySelector('h3');
    const tags = project.querySelectorAll('.tags span');
    const chapter = gsap.timeline({ scrollTrigger: { trigger: project, start: 'top 88%', end: 'bottom 24%', scrub: 1 } });
    chapter.fromTo(image, { clipPath: 'inset(12% 12% 12% 12%)', scale: .92 }, { clipPath: 'inset(0% 0% 0% 0%)', scale: 1, ease: 'none' }, 0)
      .from(copy, { x: project.classList.contains('project-attendance') ? 45 : -45, opacity: 0, ease: 'none', immediateRender: false }, .08)
      .from(heading, { y: 28, opacity: 0, ease: 'none', immediateRender: false }, .16)
      .from(tags, { y: 14, opacity: 0, stagger: .05, ease: 'none', immediateRender: false }, .24);
  });

  gsap.from('.gallery-item', { clipPath: (index) => index % 2 ? 'inset(0 0 100% 0)' : 'inset(0 100% 0 0)', scale: .94, stagger: .08, ease: 'none', immediateRender: false, scrollTrigger: { trigger: '.gallery', start: 'top 82%', end: 'bottom 38%', scrub: 1 } });
  gsap.from('.gallery-caption', { y: 28, opacity: 0, ease: 'none', immediateRender: false, scrollTrigger: { trigger: '.gallery', start: 'top 60%', end: 'bottom 30%', scrub: 1 } });

  const timeline = document.querySelector('.timeline');
  if (timeline) {
    const timelineStory = gsap.timeline({ scrollTrigger: { trigger: timeline, start: 'top 78%', end: 'bottom 64%', scrub: 1 } });
    timelineStory.to(timeline, { '--timeline-progress': 1, ease: 'none' }, 0)
        .from(timeline.querySelectorAll('.timeline-item'), { y: 24, opacity: 0, stagger: .1, ease: 'none', immediateRender: false }, 0);
  }
      gsap.from('.contact-content h2', { yPercent: 18, opacity: 0, ease: 'none', immediateRender: false, scrollTrigger: { trigger: '.contact', start: 'top 78%', end: 'top 32%', scrub: 1 } });
      gsap.from('.contact-mail, .contact-footer', { y: 25, opacity: 0, stagger: .12, ease: 'none', immediateRender: false, scrollTrigger: { trigger: '.contact', start: 'top 58%', end: 'bottom 70%', scrub: 1 } });
};

if (document.readyState === 'loading') window.addEventListener('load', setupScrollStory, { once: true });
else setupScrollStory();

window.addEventListener('load', () => {
  if (window.ScrollTrigger) window.ScrollTrigger.refresh();
}, { once: true });

const navLinks = [...document.querySelectorAll('.main-nav a')];
const navigableSections = navLinks
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

if ('IntersectionObserver' in window) {
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => link.classList.toggle('is-active', link.getAttribute('href') === `#${entry.target.id}`));
    });
  }, { rootMargin: '-30% 0px -55% 0px' });
  navigableSections.forEach((section) => navObserver.observe(section));
}

if (finePointer && !reduceMotion) {
  const cursor = document.querySelector('.cursor');
  const hero = document.querySelector('.hero');
  const magneticItems = document.querySelectorAll('.button-link, .text-link, .main-nav a');
  window.addEventListener('pointermove', (event) => {
    if (cursor) cursor.style.transform = `translate3d(${event.clientX - 6}px, ${event.clientY - 6}px, 0)`;
  }, { passive: true });
  magneticItems.forEach((item) => {
    item.addEventListener('pointermove', (event) => {
      const bounds = item.getBoundingClientRect();
      const x = (event.clientX - bounds.left - bounds.width / 2) * .12;
      const y = (event.clientY - bounds.top - bounds.height / 2) * .12;
      item.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    });
    item.addEventListener('pointerleave', () => { item.style.transform = ''; });
  });
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
  });
});
