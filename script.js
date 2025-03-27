document.addEventListener("DOMContentLoaded", function() {
    console.log("Portfólio carregado!");
});

// Navegação suave
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        targetSection.scrollIntoView({ behavior: 'smooth' });
    });
});

// Efeito de digitação
const typingText = document.querySelector('.typing-text');
const words = ['Seu Corretor de Imóveis de Confiança', 'Especialista em Imóveis', 'Realizando seu Sonho'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        typingText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        setTimeout(type, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(type, 500);
    } else {
        setTimeout(type, isDeleting ? 100 : 200);
    }
}

type();

// Animações de scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Aplicar animações aos elementos
document.querySelectorAll('.section, .expertise-item, .imovel-card, .servico-card').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(element);
});

// Menu mobile
const createMobileMenu = () => {
    const nav = document.querySelector('nav ul');
    const menuButton = document.createElement('button');
    menuButton.className = 'mobile-menu-button';
    menuButton.innerHTML = '<i class="fas fa-bars"></i>';
    document.querySelector('header').prepend(menuButton);

    menuButton.addEventListener('click', () => {
        nav.classList.toggle('show');
        menuButton.innerHTML = nav.classList.contains('show') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
};

// Adicionar menu mobile em telas pequenas
if (window.innerWidth <= 768) {
    createMobileMenu();
}

// Atualizar menu mobile quando a janela for redimensionada
window.addEventListener('resize', () => {
    if (window.innerWidth <= 768) {
        if (!document.querySelector('.mobile-menu-button')) {
            createMobileMenu();
        }
    } else {
        const menuButton = document.querySelector('.mobile-menu-button');
        if (menuButton) {
            menuButton.remove();
        }
        document.querySelector('nav ul').classList.remove('show');
    }
});

// Manipulação do formulário
const contactForm = document.querySelector('.contato-form');
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Coletar dados do formulário
    const formData = new FormData(this);
    const formObject = {};
    formData.forEach((value, key) => {
        formObject[key] = value;
    });
    
    // Simular envio
    const submitButton = this.querySelector('button');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    submitButton.disabled = true;
    
    setTimeout(() => {
        // Aqui você pode adicionar a lógica para enviar os dados para um servidor
        console.log('Formulário enviado:', formObject);
        
        // Mostrar mensagem de sucesso
        showNotification('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
        this.reset();
        
        // Restaurar botão
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
    }, 2000);
});

// Sistema de notificações
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <p>${message}</p>
    `;
    
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Remover após 5 segundos
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Parallax effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// WhatsApp click handler
document.querySelector('.social-icons a[href="#"]').addEventListener('click', function(e) {
    e.preventDefault();
    const phoneNumber = '5583999999999'; // Substitua pelo número real
    const message = 'Olá! Gostaria de mais informações sobre imóveis.';
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
});

// Animação dos textos dinâmicos
function animateDynamicTexts() {
    const texts = document.querySelectorAll('.dynamic-text');
    let currentIndex = 0;

    function showText(index) {
        texts.forEach(text => text.style.opacity = '0');
        texts[index].style.opacity = '1';
    }

    function nextText() {
        currentIndex = (currentIndex + 1) % texts.length;
        showText(currentIndex);
    }

    // Mostrar o primeiro texto
    showText(0);

    // Alternar entre os textos a cada 3 segundos
    setInterval(nextText, 3000);
}

// Iniciar a animação quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    animateDynamicTexts();
});

// Controle das tabs de imóveis
function initImoveisTabs() {
    const tabs = document.querySelectorAll('.tab-btn');
    const grids = document.querySelectorAll('.imoveis-grid');

    function showGrid(categoria) {
        grids.forEach(grid => {
            grid.classList.remove('active');
            if (grid.classList.contains(categoria)) {
                grid.classList.add('active');
            }
        });
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active de todas as tabs
            tabs.forEach(t => t.classList.remove('active'));
            // Adiciona active na tab clicada
            tab.classList.add('active');
            // Mostra o grid correspondente
            const categoria = tab.getAttribute('data-categoria');
            showGrid(categoria);
        });
    });
}

// Inicializar as funcionalidades quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    initImoveisTabs();
    // ... existing code ...
});
