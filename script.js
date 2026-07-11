const navLinks = document.querySelector('.nav-links');
const menuToggle = document.querySelector('.menu-toggle');
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('i');
const sections = document.querySelectorAll('main .section');
const navItems = document.querySelectorAll('.nav-links a');
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

function setTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);

    if (theme === 'dark') {
        themeIcon.className = 'fa-solid fa-sun';
        themeToggle.setAttribute('aria-label', 'Switch to light mode');
    } else {
        themeIcon.className = 'fa-solid fa-moon';
        themeToggle.setAttribute('aria-label', 'Switch to dark mode');
    }
}

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('open');
        menuToggle.setAttribute('aria-expanded', isOpen);
    });
}

navItems.forEach((link) => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            navLinks.classList.remove('open');
            if (menuToggle) {
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        }
    });
});

const savedTheme = localStorage.getItem('portfolio-theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
setTheme(savedTheme || (prefersDark ? 'dark' : 'light'));

themeToggle.addEventListener('click', () => {
    const nextTheme = document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.2 });

sections.forEach((section) => observer.observe(section));

const sectionIds = Array.from(sections).map((section) => section.id);

window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY + 120;

    sectionIds.forEach((id) => {
        const section = document.getElementById(id);
        if (section) {
            const top = section.offsetTop;
            const bottom = top + section.offsetHeight;
            const link = document.querySelector(`.nav-links a[href="#${id}"]`);

            if (scrollPosition >= top && scrollPosition < bottom) {
                navItems.forEach((item) => item.classList.remove('active'));
                if (link) link.classList.add('active');
            }
        }
    });
});

if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();
        if (formStatus) {
            formStatus.textContent = 'Thanks for reaching out! Your message has been prepared to send.';
        }
        contactForm.reset();
    });
}

window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navLinks.classList.remove('open');
        if (menuToggle) {
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    }
});
