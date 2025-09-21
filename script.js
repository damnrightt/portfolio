document.addEventListener('DOMContentLoaded', () => {
    localStorage.clear();
    
    const cursorFollower = document.getElementById('cursor-follower');
    const entryOverlay = document.getElementById('entry-overlay');
    const backgroundMusic = document.getElementById('background-music');
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const projectsContainer = document.getElementById('projects-container');
    const loadingScreen = document.getElementById('loading-screen');
    let isHovering = false;
    let musicPlaying = false;

    const translations = {
        tr: {
            pageTitle: "✦ damn right | AI Developer",
            heroTitle: "✦ damn right",
            heroSubtitle: "Yapay Zeka Geliştiricisi / Kodlayıcı",
            heroLocation: "Türkiye",
            entryClick: "Giriş için tıklayın",
            aboutTitle: "Hakkımda",
            aboutContent: "Yapay zeka destekli bir geliştirici olarak, karmaşık projelerin üstesinden gelmek ve yenilikçi çözümler üretmek için buradayım.",
            skillsTitle: "Yetenekler",
            languagesTitle: "Diller",
            projectsTitle: "Projeler",
            contactTitle: "İletişim",
            viewProject: "Projeyi Görüntüle",
            noDescription: "Açıklama yok.",
            projectsError: "Projeler yüklenemedi. Lütfen daha sonra tekrar deneyin.",
            footerText: "© 2025 ✦ damn right"
        },
        en: {
            pageTitle: "✦ damn right | AI Developer",
            heroTitle: "✦ damn right",
            heroSubtitle: "AI Developer / Coder",
            heroLocation: "Turkey",
            entryClick: "Click to enter",
            aboutTitle: "About Me",
            aboutContent: "As an AI-powered developer, I'm here to tackle complex projects and deliver innovative solutions.",
            skillsTitle: "Skills",
            languagesTitle: "Languages",
            projectsTitle: "Projects",
            contactTitle: "Contact",
            viewProject: "View Project",
            noDescription: "No description.",
            projectsError: "Projects could not be loaded. Please try again later.",
            footerText: "© 2025 ✦ damn right"
        }
    };

    function setLanguage(lang) {
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                element.textContent = translations[lang][key];
            }
        });
        
        document.title = translations[lang].pageTitle;
        document.documentElement.lang = lang;
        localStorage.setItem('lang', lang);

        document.querySelectorAll('.lang-option').forEach(option => {
            option.classList.remove('active');
        });
        const activeOption = document.querySelector(`.lang-option[data-lang="${lang}"]`);
        if (activeOption) {
            activeOption.classList.add('active');
        }
    }

    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;
    const speed = 0.1;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    let scale = 1;
    let targetScale = 1;


    window.addEventListener('mousedown', () => {
        targetScale = 0.8;
    });

    window.addEventListener('mouseup', () => {
        targetScale = 1;
    });

    function animateCursor() {
        const diffX = mouseX - followerX;
        const diffY = mouseY - followerY;

        followerX += diffX * speed;
        followerY += diffY * speed;

        scale += (targetScale - scale) * 0.2;

        cursorFollower.style.transform = `translate(${followerX - 15}px, ${followerY - 15}px) scale(${scale})`;

        if (isHovering) {
            const accentColor = getComputedStyle(body).getPropertyValue('--accent-color');
            cursorFollower.style.backgroundColor = accentColor;
            cursorFollower.style.borderColor = accentColor;
        } else {
            const textSecondaryColor = getComputedStyle(body).getPropertyValue('--text-secondary');
            cursorFollower.style.backgroundColor = 'transparent';
            cursorFollower.style.borderColor = textSecondaryColor;
        }

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    const loadingIPNotice = document.getElementById('loading-ip-notice');
    let detectedLanguage = 'tr';
    
    async function detectLanguageAndUpdateLoading() {
        try {
            const ipResponse = await fetch('https://api.ipify.org/');
            const userIP = await ipResponse.text();
            
            const locationResponse = await fetch(`http://ip-api.com/json/${userIP}`);
            const locationData = await locationResponse.json();
            
            if (locationData.status === 'success') {
                detectedLanguage = locationData.countryCode === 'TR' ? 'tr' : 'en';
                
                if (detectedLanguage === 'tr') {
                    loadingIPNotice.textContent = 'IP adresiniz otomatik çeviri için kullanılacaktır.';
                } else {
                    loadingIPNotice.textContent = 'Your IP address will be used for automatic translation.';
                }
            }
        } catch (error) {
            detectedLanguage = 'tr';
            loadingIPNotice.textContent = 'IP adresiniz otomatik çeviri için kullanılacaktır.';
        }
        
        return detectedLanguage;
    }

    async function initializeApp() {
        await detectLanguageAndUpdateLoading();
        
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                
                const savedLang = localStorage.getItem('lang');
                
                if (!savedLang) {
                    setLanguage(detectedLanguage);
                    currentLang = detectedLanguage;
                } else {
                    setLanguage(savedLang);
                    currentLang = savedLang;
                }
            }, 800);
        }, 5000);
    }

    initializeApp();


    const typedTextElement = document.getElementById('typed-text');
    const textsToType = {
        tr: ['AI Developer', 'Yapay Zeka Geliştiricisi', 'Coder', 'Kodlayıcı'],
        en: ['AI Developer', 'Coder', 'Developer', 'Programmer']
    };
    
    let currentTextIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let currentLang = localStorage.getItem('lang') || 'tr';

    function typeWriter() {
        const currentTexts = textsToType[currentLang];
        const currentText = currentTexts[currentTextIndex];
        
        if (isDeleting) {
            typedTextElement.textContent = currentText.substring(0, currentCharIndex - 1);
            currentCharIndex--;
        } else {
            typedTextElement.textContent = currentText.substring(0, currentCharIndex + 1);
            currentCharIndex++;
        }

        let typeSpeed = 100;
        if (isDeleting) {
            typeSpeed /= 2;
        }

        if (!isDeleting && currentCharIndex === currentText.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && currentCharIndex === 0) {
            isDeleting = false;
            currentTextIndex = (currentTextIndex + 1) % currentTexts.length;
        }

        setTimeout(typeWriter, typeSpeed);
    }

    setTimeout(typeWriter, 4000);

    entryOverlay.addEventListener('click', () => {
        entryOverlay.style.opacity = '0';
        setTimeout(() => entryOverlay.style.display = 'none', 800);
        backgroundMusic.play().then(() => {
            musicPlaying = true;
        }).catch(() => {});
    }, { once: true });

    document.querySelectorAll('.lang-option').forEach(option => {
        option.addEventListener('click', () => {
            setLanguage(option.dataset.lang);
        });
    });


    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        const icon = themeToggle.querySelector('i');
        if (body.classList.contains('light-mode')) {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    });

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                entry.target.style.transitionDelay = entry.target.dataset.delay || '0s';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.scroll-reveal').forEach(el => {
        scrollObserver.observe(el);
    });

    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBars = entry.target.querySelectorAll('.skill-progress');
                skillBars.forEach(bar => {
                    const skillLevel = bar.getAttribute('data-skill');
                    setTimeout(() => {
                        bar.style.width = skillLevel + '%';
                    }, 500);
                });
            }
        });
    }, { threshold: 0.5 });

    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }

    async function fetchProjects() {
        try {
            const response = await fetch('https://api.github.com/users/damnrightt/repos?sort=updated&direction=desc');
            if (!response.ok) {
                throw new Error('API Error');
            }
            const repos = await response.json();
            
            projectsContainer.innerHTML = '';

            repos.slice(0, 5).forEach(repo => {
                const projectElement = document.createElement('div');
                projectElement.classList.add('project-item');
                const currentLang = localStorage.getItem('lang') || detectedLanguage;
                const noDescText = translations[currentLang].noDescription;
                
                projectElement.innerHTML = `
                    <h3>${repo.name}</h3>
                    <p>${repo.description || noDescText}</p>
                    <a href="${repo.html_url}" target="_blank" data-i18n="viewProject">Projeyi Görüntüle</a>
                `;
                projectsContainer.appendChild(projectElement);
            });

        } catch (error) {
            const currentLang = localStorage.getItem('lang') || detectedLanguage;
            const errorText = translations[currentLang].projectsError;
            projectsContainer.innerHTML = `<p style="color: var(--text-secondary);">${errorText}</p>`;
        }
    }

    fetchProjects();

    const hoverElements = document.querySelectorAll('a, button, input, textarea, span.lang-option');

    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            isHovering = true;
            if(el.tagName === 'A' || el.tagName === 'BUTTON' || el.classList.contains('lang-option')) {
                targetScale = 0.3;
            } else {
                targetScale = 1.5;
            }
        });
        el.addEventListener('mouseleave', () => {
            isHovering = false;
            targetScale = 1;
        });
    });

    const rainCanvas = document.getElementById('rainCanvas');
    const rainCtx = rainCanvas.getContext('2d');

    let rainDrops = [];
    const numberOfDrops = 100;

    function resizeRainCanvas() {
        rainCanvas.width = window.innerWidth;
        rainCanvas.height = window.innerHeight;
    }

    class RainDrop {
        constructor() {
            this.x = Math.random() * rainCanvas.width;
            this.y = Math.random() * rainCanvas.height;
            this.length = Math.random() * 10 + 5;
            this.speed = Math.random() * 5 + 2;
            this.opacity = Math.random() * 0.5 + 0.3;
        }

        draw() {
            rainCtx.beginPath();
            rainCtx.moveTo(this.x, this.y);
            rainCtx.lineTo(this.x, this.y + this.length);
            rainCtx.strokeStyle = `rgba(174,194,224,${this.opacity})`;
            rainCtx.lineWidth = 1;
            rainCtx.stroke();
        }

        update() {
            this.y += this.speed;
            if (this.y > rainCanvas.height) {
                this.y = -this.length;
                this.x = Math.random() * rainCanvas.width;
            }
        }
    }

    function initRain() {
        for (let i = 0; i < numberOfDrops; i++) {
            rainDrops.push(new RainDrop());
        }
    }

    function animateRain() {
        rainCtx.clearRect(0, 0, rainCanvas.width, rainCanvas.height);
        for (let i = 0; i < numberOfDrops; i++) {
            rainDrops[i].update();
            rainDrops[i].draw();
        }
        requestAnimationFrame(animateRain);
    }

    window.addEventListener('resize', resizeRainCanvas);
    resizeRainCanvas();
    initRain();
    animateRain();

    // Particle System
    const particleCanvas = document.getElementById('particleCanvas');
    const particleCtx = particleCanvas.getContext('2d');
    let particles = [];
    let mouse = { x: 0, y: 0 };

    function resizeParticleCanvas() {
        particleCanvas.width = window.innerWidth;
        particleCanvas.height = window.innerHeight;
    }

    class Particle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 3 - 1.5;
            this.speedY = Math.random() * 3 - 1.5;
            this.color = `rgba(187, 134, 252, ${Math.random() * 0.5 + 0.2})`;
            this.life = 1;
            this.decay = Math.random() * 0.02 + 0.01;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.life -= this.decay;
            this.size *= 0.99;

            // Attraction to mouse
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                const force = (100 - distance) / 100;
                this.speedX += dx * force * 0.001;
                this.speedY += dy * force * 0.001;
            }
        }

        draw() {
            particleCtx.save();
            particleCtx.globalAlpha = this.life;
            particleCtx.fillStyle = this.color;
            particleCtx.beginPath();
            particleCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            particleCtx.fill();
            particleCtx.restore();
        }
    }

    function createParticles(x, y) {
        for (let i = 0; i < 5; i++) {
            particles.push(new Particle(x, y));
        }
    }

    function animateParticles() {
        particleCtx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
        
        particles.forEach((particle, index) => {
            particle.update();
            particle.draw();
            
            if (particle.life <= 0 || particle.size <= 0.1) {
                particles.splice(index, 1);
            }
        });
        
        requestAnimationFrame(animateParticles);
    }

    // Mouse tracking for particles
    document.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        
        // Create particles occasionally
        if (Math.random() < 0.1) {
            createParticles(e.clientX, e.clientY);
        }
    });

    window.addEventListener('resize', resizeParticleCanvas);
    resizeParticleCanvas();
    animateParticles();

    // Language change handler for typing animation
    document.querySelectorAll('.lang-option').forEach(option => {
        option.addEventListener('click', () => {
            currentLang = option.dataset.lang;
            currentTextIndex = 0;
            currentCharIndex = 0;
            isDeleting = false;
        });
    });
});
