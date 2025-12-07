document.addEventListener('DOMContentLoaded', () => {
    // --- Configuration ---
    const DISCORD_ID = '1386443693401309256';
    const GITHUB_USERNAME = 'damnrightt';
    
    // --- Elements ---
    const loader = document.getElementById('loader');
    const musicBtn = document.getElementById('music-toggle');
    const bgMusic = document.getElementById('bg-music');
    const visualizer = document.querySelector('.visualizer');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const langBtns = document.querySelectorAll('.lang-switch button');

    // --- State ---
    let currentLang = localStorage.getItem('lang') || 'tr';

    // --- Translations ---
    const translations = {
        tr: {
            heroSubtitle: "AI Developer / Coder",
            playing: "Oynuyor",
            aboutTitle: "Hakkımda",
            skillsTitle: "Yetenekler",
            projectsTitle: "Projeler",
            aboutContent: "Yapay zeka destekli bir geliştirici olarak, karmaşık projelerin üstesinden gelmek ve yenilikçi çözümler üretmek için buradayım. Modern web teknolojileri ve AI entegrasyonları üzerine çalışıyorum.",
            location: "Türkiye",
            loading: "Yükleniyor...",
            error: "Hata oluştu."
        },
        en: {
            heroSubtitle: "AI Developer / Coder",
            playing: "Playing",
            aboutTitle: "About Me",
            skillsTitle: "Skills",
            projectsTitle: "Projects",
            aboutContent: "As an AI-powered developer, I'm here to tackle complex projects and deliver innovative solutions. I work on modern web technologies and AI integrations.",
            location: "Turkey",
            loading: "Loading...",
            error: "An error occurred."
        }
    };

    // --- Initialization ---
    function init() {
        applyLanguage(currentLang);
        fetchDiscordData();
        fetchGithubRepos();
        initParticles();
        
        // Remove loader
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 2000);

        // Music Volume
        bgMusic.volume = 0.2;
    }

    // --- Lanyard Integration (Discord) ---
    async function fetchDiscordData() {
        try {
            const response = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_ID}`);
            const data = await response.json();

            if (data.success) {
                updateDiscordUI(data.data);
            } else {
                console.warn('Lanyard user not monitored.');
                // Fallback is already in HTML (default image)
            }
        } catch (error) {
            console.error('Lanyard API Error:', error);
        }
    }

    function updateDiscordUI(data) {
        const avatarImg = document.getElementById('discord-avatar');
        const statusIndicator = document.getElementById('discord-status');
        const activityCard = document.getElementById('discord-activity');
        const activityImage = document.getElementById('activity-image');
        const activityName = document.getElementById('activity-name');
        const activityState = document.getElementById('activity-state');
        const activityTime = document.getElementById('activity-time');

        // Update Avatar
        if (data.discord_user.avatar) {
            const extension = data.discord_user.avatar.startsWith('a_') ? 'gif' : 'png';
            avatarImg.src = `https://cdn.discordapp.com/avatars/${DISCORD_ID}/${data.discord_user.avatar}.${extension}?size=256`;
        }

        // Update Status
        statusIndicator.className = `status-indicator ${data.discord_status}`;
        statusIndicator.title = data.discord_status;

        // Update Activity
        const activity = data.activities.find(a => a.type === 0); // Type 0 is "Playing"

        if (activity) {
            activityCard.classList.remove('hidden');
            activityName.textContent = activity.name;
            activityState.textContent = activity.state || activity.details || '';

            // Image
            if (activity.assets && activity.assets.large_image) {
                let imageUrl = activity.assets.large_image;
                if (imageUrl.startsWith('mp:')) {
                    imageUrl = `https://media.discordapp.net/${imageUrl.replace('mp:', '')}`;
                } else {
                    imageUrl = `https://cdn.discordapp.com/app-assets/${activity.application_id}/${activity.assets.large_image}.png`;
                }
                activityImage.src = imageUrl;
            } else {
                activityImage.src = 'https://cdn.discordapp.com/embed/avatars/0.png'; // Fallback
            }

            // Time elapsed
            if (activity.timestamps && activity.timestamps.start) {
                const startTime = activity.timestamps.start;
                setInterval(() => {
                    const elapsed = Date.now() - startTime;
                    const hours = Math.floor(elapsed / 3600000);
                    const minutes = Math.floor((elapsed % 3600000) / 60000);
                    const seconds = Math.floor((elapsed % 60000) / 1000);

                    const h = hours > 0 ? `${hours}:` : '';
                    const m = minutes.toString().padStart(2, '0');
                    const s = seconds.toString().padStart(2, '0');
                    activityTime.textContent = `${h}${m}:${s}`;
                }, 1000);
            } else {
                activityTime.textContent = '';
            }

        } else {
            activityCard.classList.add('hidden');
        }
    }

    // --- GitHub Projects ---
    async function fetchGithubRepos() {
        const container = document.getElementById('repos-container');
        try {
            const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=5`);
            const repos = await response.json();
            
            container.innerHTML = '';

            if (Array.isArray(repos)) {
                repos.forEach(repo => {
                    const el = document.createElement('a');
                    el.href = repo.html_url;
                    el.target = '_blank';
                    el.className = 'repo-item';
                    el.innerHTML = `
                        <div class="repo-name">
                            <i class="fas fa-book"></i> ${repo.name}
                        </div>
                        <div class="repo-desc">${repo.description || (currentLang === 'tr' ? 'Açıklama yok' : 'No description')}</div>
                        <div class="repo-stats">
                            <span><i class="fas fa-star"></i> ${repo.stargazers_count}</span>
                            <span><i class="fas fa-code-branch"></i> ${repo.forks_count}</span>
                            <span><i class="fas fa-circle" style="font-size: 8px;"></i> ${repo.language || '?'}</span>
                        </div>
                    `;
                    container.appendChild(el);
                });
            } else {
                container.innerHTML = '<p style="color:#888; text-align:center;">Failed to load projects.</p>';
            }

        } catch (error) {
            console.error('GitHub API Error:', error);
            container.innerHTML = '<p style="color:#888; text-align:center;">Failed to load projects.</p>';
        }
    }

    // --- Language System ---
    function applyLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('lang', lang);

        // Update Buttons
        langBtns.forEach(btn => {
            if (btn.dataset.lang === lang) btn.classList.add('active');
            else btn.classList.remove('active');
        });

        // Update Text
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.dataset.i18n;
            if (translations[lang][key]) {
                el.textContent = translations[lang][key];
            }
        });

        // Refresh Repos for description translation if needed (simple reload)
        // For simplicity, we won't re-fetch, but ideally we should.
    }

    langBtns.forEach(btn => {
        btn.addEventListener('click', () => applyLanguage(btn.dataset.lang));
    });

    // --- Tabs ---
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Deactivate all
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Activate target
            btn.classList.add('active');
            const targetId = btn.dataset.tab;
            document.getElementById(targetId).classList.add('active');
        });
    });

    // --- Music ---
    let isPlaying = false;
    visualizer.classList.add('paused');

    musicBtn.addEventListener('click', () => {
        if (isPlaying) {
            bgMusic.pause();
            musicBtn.innerHTML = '<i class="fas fa-play"></i>';
            visualizer.classList.add('paused');
        } else {
            bgMusic.play().catch(e => console.log('Autoplay prevented', e));
            musicBtn.innerHTML = '<i class="fas fa-pause"></i>';
            visualizer.classList.remove('paused');
        }
        isPlaying = !isPlaying;
    });

    // --- Simple Particles ---
    function initParticles() {
        const particlesContainer = document.getElementById('particles');
        const count = 30;
        
        for (let i = 0; i < count; i++) {
            const p = document.createElement('div');
            p.style.position = 'absolute';
            p.style.width = Math.random() * 4 + 'px';
            p.style.height = p.style.width;
            p.style.background = 'rgba(255,255,255,0.1)';
            p.style.borderRadius = '50%';
            p.style.left = Math.random() * 100 + '%';
            p.style.top = Math.random() * 100 + '%';
            p.style.animation = `float ${Math.random() * 10 + 10}s infinite linear`;
            p.style.animationDelay = `-${Math.random() * 10}s`;
            particlesContainer.appendChild(p);
        }
        
        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes float {
                0% { transform: translateY(0px); opacity: 0; }
                50% { opacity: 0.5; }
                100% { transform: translateY(-100vh); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }

    // Run
    init();
});
