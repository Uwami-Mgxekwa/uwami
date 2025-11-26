// Navigation Functionality
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Active link highlighting
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}
// Typewriter Effect for Hero Name
function initTypewriter() {
    const typewriterElement = document.getElementById('typewriter');
    if (!typewriterElement) return;

    const text = 'Owami Mgxekwa';
    let i = 0;

    // Clear the text first
    typewriterElement.textContent = '';

    function typeWriter() {
        if (i < text.length) {
            typewriterElement.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }

    // Start after a small delay
    setTimeout(typeWriter, 1000);
}

// Animated Code Window
function initCodeAnimation() {
    const codeElement = document.getElementById('code-animation');
    if (!codeElement) return;

    // Mobile-specific adjustments
    const isMobile = window.innerWidth <= 768;
    const codeSnippets = [
        {
            language: 'java',
            code: isMobile ?
                `class Dev {
  String name = "Owami";
  String role = "Dev";
  
  void create() {
    while(true) {
      code();
      teach();
    }
  }
}` :
                `public class Developer {
    private String name = "Owami";
    private String role = "Developer";
    
    public void createApps() {
        while(learning) {
            code();
            teach();
            innovate();
        }
    }
}`

        },
        {
            language: 'javascript',
            code: isMobile ?
                `const dev = {
  name: 'Owami',
  skills: ['Java', 'JS'],
  learning: ['React'],
  
  build() {
    return 'Coding!';
  }
};` :
                `const developer = {
    name: 'Owami Mgxekwa',
    skills: ['Java', 'JS', 'Python'],
    learning: ['React', 'TypeScript'],
    
    buildAwesome() {
        return this.skills.map(s => 
            'Creating with ' + s
        );
    }
};`
        },
        {
            language: 'python',
            code: isMobile ?
                `class Dev:
  def __init__(self):
    self.name = "Owami"
    self.role = "Developer"
  
  def code(self):
    while True:
      self.learn()
      self.build()` :
                `class Developer:
    def __init__(self):
        self.name = "Owami"
        self.role = "Educator"
        self.skills = ["Java", "Python"]
    
    def inspire(self):
        return "Teaching & Coding"
    
    def build(self):
        while True:
            self.learn()
            self.create()`
        }
    ];

    let currentSnippet = 0;
    let currentChar = 0;
    let isDeleting = false;
    let isWaiting = false;

    function typeCode() {
        const snippet = codeSnippets[currentSnippet];
        const currentText = snippet.code.substring(0, currentChar);

        codeElement.innerHTML = `<code class="language-${snippet.language}">${currentText}<span class="cursor">|</span></code>`;

        if (!isDeleting && currentChar < snippet.code.length) {
            // Typing
            currentChar++;
            setTimeout(typeCode, Math.random() * 50 + 30);
        } else if (isDeleting && currentChar > 0) {
            // Deleting
            currentChar--;
            setTimeout(typeCode, 25);
        } else if (!isDeleting && currentChar === snippet.code.length) {
            // Finished typing, wait then start deleting
            if (!isWaiting) {
                isWaiting = true;
                setTimeout(() => {
                    isDeleting = true;
                    isWaiting = false;
                    typeCode();
                }, 3000);
            }
        } else if (isDeleting && currentChar === 0) {
            // Finished deleting, move to next snippet
            isDeleting = false;
            currentSnippet = (currentSnippet + 1) % codeSnippets.length;
            setTimeout(typeCode, 500);
        }
    }

    // Start the animation
    setTimeout(typeCode, 2000);
}

// Counter Animation for Stats
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const observerOptions = {
        threshold: 0.7
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });

    function animateCounter(counter) {
        const target = parseInt(counter.getAttribute('data-count'));
        const increment = target / 50;
        let current = 0;

        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };

        updateCounter();
    }
}

// Scroll Animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.about-card, .skill-card, .project-card, .timeline-item');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    animatedElements.forEach(element => {
        scrollObserver.observe(element);
    });
}

// Skill Bars Animation
function initSkillBars() {
    const skillCards = document.querySelectorAll('.skill-card');

    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillLevel = entry.target.getAttribute('data-skill');
                const progressBar = entry.target.querySelector('.skill-progress');

                setTimeout(() => {
                    progressBar.style.width = skillLevel + '%';
                }, Math.random() * 500);

                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    skillCards.forEach(card => {
        skillObserver.observe(card);
    });

    // Learning progress bars
    const learningCards = document.querySelectorAll('.learning-card');

    const learningObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target.querySelector('.progress-bar');
                const progress = progressBar.getAttribute('data-progress');

                setTimeout(() => {
                    progressBar.style.width = progress + '%';
                }, Math.random() * 300);

                learningObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    learningCards.forEach(card => {
        learningObserver.observe(card);
    });
}

// Timeline Animations
function initTimelineAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');

    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('timeline-animate');
                timelineObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });
}

// Smooth Scrolling
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll indicator click
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
}

// Parallax Effect for Hero Section
function initParallaxEffect() {
    const floatingElements = document.querySelectorAll('.floating-element');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;

        floatingElements.forEach((element, index) => {
            const speed = parseFloat(element.getAttribute('data-speed')) || 1;
            const yPos = -(scrolled * parallaxSpeed * speed);
            element.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.1}deg)`;
        });

        // Grid overlay parallax
        const gridOverlay = document.querySelector('.grid-overlay');
        if (gridOverlay) {
            gridOverlay.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });
}

// Contact Form Interactions
function initContactFormInteractions() {
    const contactButtons = document.querySelectorAll('.contact-button');

    contactButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-2px) scale(1.02)';
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0) scale(1)';
        });

        button.addEventListener('click', (e) => {
            // Add click animation
            button.style.transform = 'translateY(0) scale(0.98)';
            setTimeout(() => {
                button.style.transform = 'translateY(-2px) scale(1.02)';
            }, 150);
        });
    });
}

// Additional utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance optimization for scroll events
window.addEventListener('scroll', debounce(() => {
    // Additional scroll-based animations can be added here
    updateScrollProgress();
}, 10));

function updateScrollProgress() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;

    // You can use this for a scroll progress indicator if needed
    document.documentElement.style.setProperty('--scroll-progress', scrolled + '%');
}

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');

    // Trigger initial animations
    setTimeout(() => {
        const heroElements = document.querySelectorAll('.hero-text > *');
        heroElements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('fade-in-up');
            }, index * 200);
        });
    }, 500);
});

// Easter egg - Konami code
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.keyCode);
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }

    if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
        // Easter egg activated!
        document.body.classList.add('matrix-mode');
        setTimeout(() => {
            document.body.classList.remove('matrix-mode');
            konamiCode = [];
        }, 5000);
    }
});

// Handle errors gracefully
window.addEventListener('error', (e) => {
    console.warn('Portfolio JS Error:', e.error);
    // Continue execution - don't let small errors break the entire experience
});

// Export functions for potential testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initNavigation,
        initTypewriter,
        initCodeAnimation,
        initCounters,
        initScrollAnimations,
        initSkillBars,
        initTimelineAnimations,
        initSmoothScrolling,
        initParallaxEffect,
        initContactFormInteractions
    };
}
// Theme Toggle Functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;

    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('theme') || 'dark';
    htmlElement.setAttribute('data-theme', savedTheme);

    // Toggle theme on button click
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initTypewriter();
    initCodeAnimation();
    initCounters();
    initScrollAnimations();
    initSkillBars();
    initTimelineAnimations();
    initSmoothScrolling();
    initParallaxEffect();
    initContactFormInteractions();
    initThemeToggle();
});

