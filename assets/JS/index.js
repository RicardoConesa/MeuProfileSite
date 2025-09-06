document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('.section-card');
    const contentArea = document.querySelector('.content-area');
    const sidebar = document.querySelector('.sidebar');
    const svg = document.getElementById('connection-lines');

    function adjustContentAreaHeight() {
        const activeSection = document.querySelector('.section-card.active');
        if (activeSection) {
            contentArea.style.minHeight = `${activeSection.offsetHeight + (2 * 40) + 20}px`;
        }
    }

    function drawConnectionLine() {
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

    adjustContentAreaHeight();
    drawConnectionLine();

    window.addEventListener('resize', () => {
        adjustContentAreaHeight();
        drawConnectionLine();
    });
});



// Adicione esta lógica dentro do evento DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    // ... (seu código JavaScript existente aqui) ...

    // --- Lógica da Bola de Pingue-Pongue (DVD Screensaver) ---
    const ball = document.querySelector('.ping-pong-ball');
    
    if (ball) { // Verifica se a bola existe antes de tentar animá-la
        const ballSize = 20; // Largura/Altura da bola (deve ser a mesma do CSS)
        let x = 0; // Posição X inicial
        let y = 0; // Posição Y inicial
        let dx = 4; // Velocidade X (pixels por frame)
        let dy = 4; // Velocidade Y (pixels por frame)

        const colors = [
            '#FF0000', // Vermelho
            '#00FF00', // Verde
            '#0000FF', // Azul
            '#FFFF00', // Amarelo
            '#FF00FF', // Magenta
            '#00FFFF'  // Ciano
        ];
        let currentColorIndex = 0;

        function getRandomColor() {
            currentColorIndex = (currentColorIndex + 1) % colors.length;
            return colors[currentColorIndex];
        }

        function animateBall() {
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;

            // Lógica de movimento
            x += dx;
            y += dy;

            // Detecção de colisão com as bordas e mudança de direção
            if (x + ballSize > viewportWidth || x < 0) {
                dx *= -1; // Inverte a direção horizontal
                ball.style.backgroundColor = getRandomColor();
            }
            if (y + ballSize > viewportHeight || y < 0) {
                dy *= -1; // Inverte a direção vertical
                ball.style.backgroundColor = getRandomColor();
            }

            // Garante que a bola não saia da tela ao mudar de direção (ajuste fino)
            if (x + ballSize > viewportWidth) x = viewportWidth - ballSize;
            if (x < 0) x = 0;
            if (y + ballSize > viewportHeight) y = viewportHeight - ballSize;
            if (y < 0) y = 0;

            // Aplica a nova posição
            ball.style.transform = `translate(${x}px, ${y}px)`;

            requestAnimationFrame(animateBall);
        }

        // Inicia a animação
        animateBall();

        // Opcional: Reinicia a animação se a janela for redimensionada para ajustar as bordas
        window.addEventListener('resize', () => {
            // Reposiciona a bola se ela estiver fora da tela após o resize
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;
            if (x + ballSize > viewportWidth) x = viewportWidth - ballSize;
            if (x < 0) x = 0;
            if (y + ballSize > viewportHeight) y = viewportHeight - ballSize;
            if (y < 0) y = 0;
            ball.style.transform = `translate(${x}px, ${y}px)`;
        });
    }
    // --- Fim da Lógica da Bola de Pingue-Pongue ---

}); // Fecha o DOMContentLoaded