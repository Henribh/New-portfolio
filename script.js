// Alternar Tema (Claro / Escuro)
const botao = document.getElementById("theme-toggle");
const pagina = document.body;

botao.onclick = function() {
    pagina.classList.toggle("light-mode");
};

// Efeito Typewriter (Máquina de Escrever)
const dadosDigitacao = [
    { id: "type-nome", text: "Bruno Henrique Oliveira" },
    { id: "type-cargo", text: "Desenvolvedor Web | Suporte Técnico & Soluções digitais" },
    { id: "type-local", text: "São Paulo, SP" }
];

const velocidadeDigitacao = 40; // Velocidade ajustada para ficar mais natural

async function iniciarTypewriter() {
    for (let i = 0; i < dadosDigitacao.length; i++) {
        let elemento = document.getElementById(dadosDigitacao[i].id);
        let texto = dadosDigitacao[i].text;
        
        elemento.innerHTML = ""; // Limpa antes de começar a digitar
        
        for (let j = 0; j < texto.length; j++) {
            elemento.innerHTML += texto.charAt(j);
            await new Promise(resolve => setTimeout(resolve, velocidadeDigitacao));
        }
        // Uma pequena pausa entre a digitação de uma frase e a próxima
        await new Promise(resolve => setTimeout(resolve, 300));
    }
}

// Inicia o efeito logo quando a tela carrega
window.onload = iniciarTypewriter;