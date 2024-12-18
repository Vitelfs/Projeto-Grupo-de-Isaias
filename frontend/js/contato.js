// script.js

// Função para simular chamada de emergência
function chamarEmergencia() {
    alert("Chamando a emergência (SAMU)...");
}

// Exibe o modal para adicionar contatos
function adicionarContato() {
    document.getElementById('modal').classList.remove('hidden');
}

// Fecha o modal
function fecharModal() {
    document.getElementById('modal').classList.add('hidden');
}

// Salva um novo contato na lista
function salvarContato() {
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;

    if (name && phone) {
        const contactList = document.getElementById('contact-list');
        const li = document.createElement('li');
        li.innerHTML = `
            ${name} - ${phone}
            <button onclick="chamarFamiliar('${name}', '${phone}')">Ligar</button>
        `;
        contactList.appendChild(li);
        fecharModal();
    } else {
        alert("Por favor, preencha todos os campos.");
    }
}

// Função para simular ligação para um familiar
function chamarFamiliar(name, phone) {
    alert(`Ligando para ${name} no número ${phone}...`);
}
