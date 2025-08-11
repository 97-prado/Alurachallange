//O principal objetivo deste desafio é fortalecer suas habilidades em lógica de programação. Aqui você deverá desenvolver a lógica para resolver o problema.
// Variável para armazenar a lista de participantes
let participantes = [];

// Função para adicionar um amigo à lista
function adicionarAmigo() {
    const inputAmigo = document.getElementById('amigo');
    const nomeAmigo = inputAmigo.value.trim();
    
    // Validação do nome
    if (nomeAmigo === '') {
        alert('Por favor, digite um nome válido.');
        return;
    }
    
    if (participantes.includes(nomeAmigo)) {
        alert('Este nome já foi adicionado!');
        return;
    }
    
    // Adiciona o nome à lista
    participantes.push(nomeAmigo);
    
    // Atualiza a lista visual
    atualizarListaAmigos();
    
    // Limpa o campo de input
    inputAmigo.value = '';
    
    // Foca novamente no campo para facilitar a digitação
    inputAmigo.focus();
}

// Função para atualizar a lista visual de participantes
function atualizarListaAmigos() {
    const listaAmigos = document.getElementById('listaAmigos');
    listaAmigos.innerHTML = '';
    
    participantes.forEach(amigo => {
        const itemLista = document.createElement('li');
        itemLista.textContent = amigo;
        listaAmigos.appendChild(itemLista);
    });
}

// Função principal para sortear os amigos secretos
function sortearAmigo() {
    // Verifica se há participantes suficientes
    if (participantes.length < 2) {
        alert('Adicione pelo menos 2 participantes para sortear!');
        return;
    }
    
    // Cria uma cópia da lista para embaralhar
    let listaEmbaralhada = [...participantes];
    
    // Embaralha a lista
    for (let i = listaEmbaralhada.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [listaEmbaralhada[i], listaEmbaralhada[j]] = [listaEmbaralhada[j], listaEmbaralhada[i]];
    }
    
    // Verifica se alguém tirou a si mesmo e corrige se necessário
    let sorteioValido = false;
    let pares = [];
    
    while (!sorteioValido) {
        // Embaralha novamente se necessário
        for (let i = listaEmbaralhada.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [listaEmbaralhada[i], listaEmbaralhada[j]] = [listaEmbaralhada[j], listaEmbaralhada[i]];
        }
        
        // Cria os pares
        pares = participantes.map((nome, index) => ({
            de: nome,
            para: listaEmbaralhada[index]
        }));
        
        // Verifica se o sorteio é válido (ninguém tirou a si mesmo)
        sorteioValido = pares.every(par => par.de !== par.para);
    }
    
    // Exibe os resultados
    exibirResultados(pares);
}

// Função para exibir os resultados do sorteio
function exibirResultados(pares) {
    const resultadoElement = document.getElementById('resultado');
    resultadoElement.innerHTML = '';
    
    pares.forEach(par => {
        const itemResultado = document.createElement('li');
        itemResultado.textContent = `${par.de} tirou ${par.para}`;
        resultadoElement.appendChild(itemResultado);
    });
    
    // Rolagem suave para os resultados
    resultadoElement.scrollIntoView({ behavior: 'smooth' });
}

// Adiciona evento para permitir adicionar nomes com Enter
document.getElementById('amigo').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        adicionarAmigo();
    }
});