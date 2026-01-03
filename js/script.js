// Navegação suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
        });
        
        // Fechar menu mobile se aberto
        document.querySelector('.nav-links').classList.remove('active');
    });
});

// Menu mobile
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Header scroll
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Tabs de planos - Atualizado
const tabBtns = document.querySelectorAll('.tab-btn');
const categoriaContainers = document.querySelectorAll('.categoria-container');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const tabId = btn.getAttribute('data-tab');
        
        // Remover classe active de todos os botões
        tabBtns.forEach(b => b.classList.remove('active'));
        
        // Adicionar classe active ao botão clicado
        btn.classList.add('active');
        
        // Esconder todos os conteúdos
        categoriaContainers.forEach(container => {
            container.classList.remove('active');
        });
        
        // Mostrar o conteúdo correspondente
        document.getElementById(`${tabId}-container`).classList.add('active');
    });
});

// Formulário de contato com Formspree
const formContato = document.getElementById('form-contato');
const formSuccess = document.getElementById('form-success');
const formError = document.getElementById('form-error');

formContato.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Esconder mensagens anteriores
    formSuccess.style.display = 'none';
    formError.style.display = 'none';
    
    try {
        const formData = new FormData(this);
        const response = await fetch(this.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (response.ok) {
            // Mostrar mensagem de sucesso
            formSuccess.style.display = 'block';
            
            // Rolar até a mensagem de sucesso
            formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Resetar o formulário
            formContato.reset();
        } else {
            throw new Error('Erro no envio');
        }
    } catch (error) {
        // Mostrar mensagem de erro
        formError.style.display = 'block';
        formError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
});
