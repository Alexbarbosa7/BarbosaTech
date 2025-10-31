// script.js - Barbosa Tech (VERSÃO FINAL CONSOLIDADA E COMPLETA)
// Foco na Lógica, Limpeza de Código e SPA Navigation

// ====================================
// 0. CONSTANTES E VARIÁVEIS GLOBAIS
// ====================================

const techElement = document.querySelector('.tech');
const typingElement = document.getElementById('typing-text');
const textToType = 'Sua fonte de inovação e tecnologia. Desenvolvendo o futuro, hoje.'; 
const typingSpeed = 60;

let charIndex = 0;
let typingInterval; 


// ====================================
// 1. FUNÇÃO DE NAVEGAÇÃO ENTRE PÁGINAS (SPA)
// ====================================

function setupNavigation() {
    const navLinks = document.querySelectorAll('nav a');
    const pages = document.querySelectorAll('.page-content');
    
    function showPage(targetId, clickedLink) {
        
        // 1. Controle de Visibilidade de Conteúdo (esconde todos)
        pages.forEach(page => {
            page.classList.remove('active-page');
        });
        
        // 2. Controle de Link Ativo (define o link clicado como ativo)
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
        if (clickedLink) {
            clickedLink.classList.add('active');
        }
        
        // 3. Adiciona 'active-page' no alvo
        const targetPage = document.getElementById(targetId);
        if (targetPage) {
            targetPage.classList.add('active-page');
        }

        // 4. Lógica de Reinício do Efeito de Digitação
        if (targetId === 'page-home' && typingElement) {
            clearTimeout(typingInterval);
            typingElement.textContent = '';
            charIndex = 0;
            typingElement.classList.add('cursor-blink');
            typeText();
        } else if (typingElement) {
            // Interrompe a animação se sair da Home
            clearTimeout(typingInterval);
            typingElement.classList.remove('cursor-blink');
        }
    }

    // Configuração dos Listeners de Clique
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Pega o ID da seção do atributo href (ex: 'page-contato')
            const targetId = e.target.getAttribute('href').substring(1); 
            
            showPage(targetId, e.target); 
            
            // Se estiver em mobile, fecha o menu após a navegação
            if (window.innerWidth <= 768) {
                const mainNav = document.getElementById('main-nav');
                const hamburgerBtn = document.getElementById('hamburger-btn');
                if (mainNav.classList.contains('open')) {
                    mainNav.classList.remove('open');
                    hamburgerBtn.classList.remove('active');
                }
            }
        });
    });

    // Ação Inicial: Define a página "Início" como ativa ao carregar
    const initialLink = document.getElementById('nav-home');
    if (initialLink) {
        showPage('page-home', initialLink); 
    }
}
        
// ====================================
// 2. EFEITO NEON PULSANTE NO NOME DO SITE
// ====================================

if (techElement) {
    techElement.classList.add('is-pulsing');
}

// ====================================
// 3. EFEITO DE DIGITAÇÃO NA SEÇÃO HERO
// ====================================

function typeText() {
    if (typingElement && charIndex < textToType.length) {
        typingElement.textContent += textToType.charAt(charIndex);
        charIndex++;
        typingInterval = setTimeout(typeText, typingSpeed); 
    } else if (typingElement) {
        typingElement.classList.remove('cursor-blink');
    }
}

// ====================================
// 4. LÓGICA DO MENU HAMBÚRGUER (MOBILE)
// ====================================

function setupHamburgerMenu() {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mainNav = document.getElementById('main-nav');

    if (hamburgerBtn && mainNav) {
        
        function toggleMenu() {
            mainNav.classList.toggle('open');
            hamburgerBtn.classList.toggle('active');
        }

        // Abre/Fecha o menu ao clicar no botão
        hamburgerBtn.addEventListener('click', toggleMenu);

        // O fechamento do menu ao clicar em um link está agora dentro de setupNavigation
    }
}


// ====================================
// 5. LÓGICA DO FORMULÁRIO DE CONTATO (ADICIONADA)
// ====================================

function setupContactForm() {
    // ID 'main-contact-form' foi usado no bloco HTML atualizado
    const form = document.getElementById('main-contact-form'); 
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault(); // Impede o recarregamento da página (CRUCIAL para SPA)
            
            const name = form.querySelector('input[type="text"]').value;
            
            alert(`Obrigado, ${name || 'cliente'}! Sua mensagem foi enviada. Responderemos em breve.`);
            
            // Limpa o formulário após a simulação de envio
            form.reset();
        });
    }
}


// ====================================
// 6. INICIALIZAÇÃO GERAL
// ====================================

document.addEventListener('DOMContentLoaded', () => {
    // Inicializa todos os módulos
    setupNavigation();
    setupHamburgerMenu(); 
    setupContactForm(); // <--- NOVO: Inicializa o formulário
});