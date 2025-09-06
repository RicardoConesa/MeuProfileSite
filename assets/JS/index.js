document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('.section-card');
    const contentArea = document.querySelector('.content-area');
    const sidebar = document.querySelector('.sidebar');
    const svg = document.getElementById('connection-lines');
    const ball = document.querySelector('.ping-pong-ball');

    // Função para verificar se está em modo desktop
    function isDesktopView() {
        return window.innerWidth > 768;
    }

    function adjustContentAreaHeight() {
        if (!isDesktopView()) {
            contentArea.style.minHeight = 'auto';
            return;
        }
        const activeSection = document.querySelector('.section-card.active');
        if (activeSection) {
            contentArea.style.minHeight = `${activeSection.offsetHeight + (2 * 40) + 20}px`;
        }
    }

    function drawConnectionLine() {
        if (!isDesktopView()) {
            svg.innerHTML = '';
            return;
        }
        svg.innerHTML = ''; 

        const activeSection = document.querySelector('.section-card.active');
        if (!activeSection) return;

        const sidebarRect = sidebar.getBoundingClientRect();
        const sidebarCenterX = sidebarRect.left + sidebarRect.width / 2;
        const sidebarCenterY = sidebarRect.top + sidebarRect.height / 2;

        const activeSectionRect = activeSection.getBoundingClientRect();
        const activeSectionCenterX = activeSectionRect.left + activeSectionRect.width / 2;
        const activeSectionCenterY = activeSectionRect.top + activeSectionRect.height / 2;

        const contentAreaRect = contentArea.getBoundingClientRect();
        const startX = sidebarCenterX - contentAreaRect.left;
        const startY = sidebarCenterY - contentAreaRect.top;
        const endX = activeSectionCenterX - contentAreaRect.left;
        const endY = activeSectionCenterY - contentAreaRect.top;

        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', startX);
        line.setAttribute('y1', startY);
        line.setAttribute('x2', endX);
        line.setAttribute('y2', endY);
        
        svg.appendChild(line);
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            if (!isDesktopView()) {
                document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
                return;
            }

            window.scrollTo({ top: 0, behavior: 'smooth' });

            const targetId = this.getAttribute('href');

            sections.forEach(section => {
                section.classList.remove('active');
            });

            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.classList.add('active');
                adjustContentAreaHeight();
                drawConnectionLine();
            }
        });
    });

    function initializeLayout() {
        if (!isDesktopView()) {
            sections.forEach(section => {
                section.classList.remove('active');
            });
        } else {
            sections.forEach((section, index) => {
                if (index === 0) {
                    section.classList.add('active');
                } else {
                    section.classList.remove('active');
                }
            });
        }
        adjustContentAreaHeight();
        drawConnectionLine();
    }

    initializeLayout();

    window.addEventListener('resize', () => {
        initializeLayout();
    });

    // --- Lógica da Bola de Pingue-Pongue (DVD Screensaver) ---
    if (ball) {
        const ballSize = 20;
        let x = 0;
        let y = 0;
        let dx = 4;
        let dy = 4;

        const colors = [
            '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'
        ];
        let currentColorIndex = 0;

        function getRandomColor() {
            currentColorIndex = (currentColorIndex + 1) % colors.length;
            return colors[currentColorIndex];
        }

        function animateBall() {
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;

            if (!isDesktopView()) {
                ball.style.display = 'none';
                return;
            } else {
                ball.style.display = 'block';
            }

            x += dx;
            y += dy;

            if (x + ballSize > viewportWidth || x < 0) {
                dx *= -1;
                ball.style.backgroundColor = getRandomColor();
            }
            if (y + ballSize > viewportHeight || y < 0) {
                dy *= -1;
                ball.style.backgroundColor = getRandomColor();
            }

            if (x + ballSize > viewportWidth) x = viewportWidth - ballSize;
            if (x < 0) x = 0;
            if (y + ballSize > viewportHeight) y = viewportHeight - ballSize;
            if (y < 0) y = 0;

            ball.style.transform = `translate(${x}px, ${y}px)`;

            requestAnimationFrame(animateBall);
        }

        animateBall();
    }
});