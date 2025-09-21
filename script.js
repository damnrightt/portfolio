document.addEventListener('DOMContentLoaded', () => {

    const entryOverlay = document.getElementById('entry-overlay');
    const backgroundMusic = document.getElementById('background-music');
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const cursor = document.getElementById('cursor-follower');
    const projectsContainer = document.getElementById('projects-container');

    // 1. Giriş Ekranı ve Müzik Başlatma
    entryOverlay.addEventListener('click', () => {
        entryOverlay.style.opacity = '0';
        setTimeout(() => entryOverlay.style.display = 'none', 800);

        backgroundMusic.volume = 0.1; // Ses seviyesi %10'a düşürüldü
        backgroundMusic.play().catch(e => console.error("Müzik oynatılamadı:", e));
    }, { once: true });

    // 2. Akıcı ve Animasyonlu Fare Takipçisi
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    const speed = 0.1; // Takip yumuşaklığı (daha düşük = daha yumuşak)

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        const distX = mouseX - cursorX;
        const distY = mouseY - cursorY;

        cursorX += distX * speed;
        cursorY += distY * speed;

        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // 3. Tema Değiştirici
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        const icon = themeToggle.querySelector('i');
        icon.className = body.classList.contains('light-mode') ? 'fas fa-moon' : 'fas fa-sun';
    });

    // 4. Scroll ile İçerik Gösterme Animasyonu
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || '0s';
                entry.target.style.transitionDelay = delay;
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));

    // 5. GitHub Projelerini Çekme
    async function fetchProjects() {
        try {
            const response = await fetch('https://api.github.com/users/damnrightt/repos?sort=updated&direction=desc');
            if (!response.ok) throw new Error('API yanıt vermiyor');
            const repos = await response.json();
            
            projectsContainer.innerHTML = ''; // Spinner'ı temizle

            repos.slice(0, 4).forEach(repo => {
                if (repo.fork) return;
                const projectItem = document.createElement('div');
                projectItem.className = 'project-item';
                projectItem.innerHTML = `
                    <h3>${repo.name}</h3>
                    <p>${repo.description || 'Açıklama yok.'}</p>
                    <a href="${repo.html_url}" target="_blank">GitHub'da Görüntüle →</a>
                `;
                projectsContainer.appendChild(projectItem);
            });
        } catch (error) {
            projectsContainer.innerHTML = `<p style="color: var(--text-secondary);">Projeler yüklenemedi.</p>`;
            console.error('Projeler çekilirken hata:', error);
        }
    }

    fetchProjects();
});
