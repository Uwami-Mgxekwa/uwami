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

    if (typewriterElement.dataset.initialized) return;
    typewriterElement.dataset.initialized = 'true';

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
            language: 'java',
            code: isMobile ?
                `@SpringBootApplication
class App {
  public static void 
  main(String[] args) {
    SpringApplication
      .run(App.class);
  }
}` :
                `@SpringBootApplication
public class Application {
    
    public static void main(String[] args) {
        SpringApplication.run(
            Application.class, args
        );
    }
    
    @Bean
    public CommandLineRunner demo() {
        return args -> {
            System.out.println("Ready!");
        };
    }
}`
        }
    ];

    let currentSnippet = 0;
    let currentChar = 0;
    let isDeleting = false;
    let isWaiting = false;

    function typeCode() {
        const snippet = codeSnippets[currentSnippet];
        const currentText = snippet.code.substring(0, currentChar);

        // Use textContent for smoother rendering and escape HTML
        const escapedText = currentText
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
        
        codeElement.innerHTML = `<code class="language-${snippet.language}">${escapedText}<span class="cursor">|</span></code>`;

        if (!isDeleting && currentChar < snippet.code.length) {
            // Typing - consistent speed for smoothness
            currentChar++;
            setTimeout(typeCode, 40); // Consistent 40ms for smooth typing
        } else if (isDeleting && currentChar > 0) {
            // Deleting - faster and consistent
            currentChar--;
            setTimeout(typeCode, 20); // Consistent 20ms for smooth deleting
        } else if (!isDeleting && currentChar === snippet.code.length) {
            // Finished typing, wait then start deleting
            if (!isWaiting) {
                isWaiting = true;
                setTimeout(() => {
                    isDeleting = true;
                    isWaiting = false;
                    typeCode();
                }, 2500); // Reduced wait time
            }
        } else if (isDeleting && currentChar === 0) {
            // Finished deleting, move to next snippet
            isDeleting = false;
            currentSnippet = (currentSnippet + 1) % codeSnippets.length;
            setTimeout(typeCode, 500);
        }
    }

    // Start the animation
    setTimeout(typeCode, 1500);
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

// ============================================
// CUSTOM CURSOR
// ============================================
function initCustomCursor() {
    // Only on desktop
    if (window.innerWidth <= 768) return;

    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    if (!cursorDot || !cursorOutline) return;

    let mouseX = 0, mouseY = 0;
    let outlineX = 0, outlineY = 0;
    let isMoving = false;

    // Use transform instead of left/top for better performance
    function updateCursorPosition(element, x, y) {
        element.style.transform = `translate(${x}px, ${y}px)`;
    }

    // Show cursor after first move
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        if (!isMoving) {
            cursorDot.classList.add('active');
            cursorOutline.classList.add('active');
            isMoving = true;
        }

        // Dot follows immediately with transform
        updateCursorPosition(cursorDot, mouseX, mouseY);
    });

    // Smooth outline follow with optimized animation
    let animationId;
    function animateOutline() {
        // Smooth easing
        const dx = mouseX - outlineX;
        const dy = mouseY - outlineY;
        
        outlineX += dx * 0.2; // Increased from 0.15 for snappier response
        outlineY += dy * 0.2;

        updateCursorPosition(cursorOutline, outlineX, outlineY);

        // Only continue animation if cursor is moving significantly
        if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
            animationId = requestAnimationFrame(animateOutline);
        } else {
            isMoving = false;
        }
    }

    // Start animation on mouse move
    document.addEventListener('mousemove', () => {
        if (!animationId) {
            animationId = requestAnimationFrame(animateOutline);
        }
    });

    // Hover effects
    const hoverElements = document.querySelectorAll('a, button, .project-card, .skill-card, .hex-item, .stat-card');
    
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOutline.classList.add('hover');
        });
        
        el.addEventListener('mouseleave', () => {
            cursorOutline.classList.remove('hover');
        });
    });

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        cursorDot.classList.remove('active');
        cursorOutline.classList.remove('active');
        isMoving = false;
        if (animationId) {
            cancelAnimationFrame(animationId);
            animationId = null;
        }
    });
}

// ============================================
// HEXAGONAL SKILLS ANIMATION
// ============================================
function initHexSkills() {
    const hexItems = document.querySelectorAll('.hex-item');

    const hexObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                hexObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    hexItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(50px)';
        item.style.transition = 'all 0.6s ease';
        hexObserver.observe(item);
    });
}

// ============================================
// GITHUB STATS FETCHER
// ============================================
async function fetchGitHubStats() {
    const username = 'Uwami-Mgxekwa';
    
    try {
        // Fetch user data
        const userResponse = await fetch(`https://api.github.com/users/${username}`);
        const userData = await userResponse.json();

        // Fetch repositories
        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
        const reposData = await reposResponse.json();

        // Calculate stats
        const totalStars = reposData.reduce((acc, repo) => acc + repo.stargazers_count, 0);
        const totalForks = reposData.reduce((acc, repo) => acc + repo.forks_count, 0);

        // Update DOM
        animateCounter('total-repos', userData.public_repos);
        animateCounter('total-stars', totalStars);
        animateCounter('total-forks', totalForks);
        animateCounter('total-followers', userData.followers);

        // Update profile info
        document.getElementById('github-avatar').src = userData.avatar_url;
        document.getElementById('github-name').textContent = userData.name || username;
        document.getElementById('github-bio').textContent = userData.bio || 'Software Developer & Educator';

    } catch (error) {
        console.error('Error fetching GitHub stats:', error);
        // Fallback values
        document.getElementById('total-repos').textContent = '50+';
        document.getElementById('total-stars').textContent = '100+';
        document.getElementById('total-forks').textContent = '20+';
        document.getElementById('total-followers').textContent = '50+';
        document.getElementById('github-name').textContent = 'Owami Mgxekwa';
        document.getElementById('github-bio').textContent = 'Software Developer & IT Systems Development Lecturer';
    }
}

function animateCounter(elementId, target) {
    const element = document.getElementById(elementId);
    if (!element) return;

    let current = 0;
    const increment = target / 50;
    const duration = 2000;
    const stepTime = duration / 50;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, stepTime);
}



// ============================================
// THEME TOGGLE
// ============================================
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;

    if (!themeToggle) {
        console.error('Theme toggle button not found!');
        return;
    }

    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('theme') || 'dark';
    htmlElement.setAttribute('data-theme', savedTheme);

    // Toggle theme on button click
    themeToggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

// ============================================
// INITIALIZE ALL NEW FEATURES
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Existing initializations
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

    // New feature initializations
    initCustomCursor();
    initHexSkills();
    fetchGitHubStats();
});
