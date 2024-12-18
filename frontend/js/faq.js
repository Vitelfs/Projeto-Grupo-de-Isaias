
        document.getElementById('logout').addEventListener('click', () => {
    alert("Logout realizado com sucesso!");
    window.location.href = 'index.html';
});

// Função para mostrar ou ocultar a resposta da FAQ
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const answer = question.nextElementSibling;
        answer.style.display = (answer.style.display === 'none' || answer.style.display === '') ? 'block' : 'none';
    });
});