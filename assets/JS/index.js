document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('.section-card');
    const contentArea = document.querySelector('.content-area');
    const sidebar = document.querySelector('.sidebar');
    const svg = document.getElementById('connection-lines');

    // Função para verificar se está em modo mobile
    function isMobileView() {
        return window.innerWidth <= 768; // O mesmo breakpoint do CSS
    }

    // Função para ajustar a altura da área de conteúdo (apenas em desktop)
    function adjustContentAreaHeight() {
        if (isMobileView()) {
            contentArea.style.minHeight = 'auto'; // Deixa o fluxo normal em mobile
            return;
        }
        const activeSection = document.querySelector('.section-card.active');
        if (activeSection) {
            contentArea.style.minHeight = `${activeSection.offsetHeight + (2 * 40) + 20}px`;
        }
    }

    // Função para desenhar as linhas de conexão (apenas em desktop)
    function drawConnectionLine() {
        if (isMobileView()) {
            svg.innerHTML = ''; // Limpa o SVG em mobile
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
            // Em mobile, a navegação pode rolar para a seção, mas não precisa do 'active'
            if (isMobileView()) {
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
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

    // Lógica para inicializar e reajustar no carregamento/redimensionamento
    function initializeLayout() {
        if (isMobileView()) {
            // Remove a classe 'active' de todas as seções para exibi-las em fluxo normal
            sections.forEach(section => {
                section.classList.remove('active');
            });
            // Adiciona a classe 'active' à primeira seção novamente, se precisar de um estado inicial
            // Ou, remove todos os estilos inline para que o CSS de mobile assuma
            sections.forEach(section => {
                section.style = ''; // Limpa estilos inline que o JS poderia ter aplicado
            });
            // Opcional: Ativa a primeira seção em mobile para garantir borda de destaque
            // if (sections.length > 0) {
            //     sections[0].classList.add('active');
            // }
        } else {
            // Em desktop, garante que apenas a primeira esteja ativa
            sections