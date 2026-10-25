const botao = document.getElementById("theme-toggle");
const pagina = document.body;

botao.onclick = function() {
    pagina.classList.toggle("light-mode");
    
    if (pagina.classList.contains("light-mode")) {
        botao.src = "assets/light_mode_30dp.svg"; 
    } else {
        botao.src = "assets/dark_mode_30dp.svg"; 
    }
};

const dadosDigitacao = [
    { id: "type-nome", text: "Bruno Henrique Oliveira" },
    { id: "type-cargo", text: "Desenvolvedor Web | Suporte Técnico & Soluções digitais" },
    { id: "type-local", text: "São Paulo, SP" }
];

const velocidadeDigitacao = 40; 

async function iniciarTypewriter() {
    for (let i = 0; i < dadosDigitacao.length; i++) {
        let elemento = document.getElementById(dadosDigitacao[i].id);
        let texto = dadosDigitacao[i].text;
        
        elemento.innerHTML = ""; 
        
        for (let j = 0; j < texto.length; j++) {
            elemento.innerHTML += texto.charAt(j);
            await new Promise(resolve => setTimeout(resolve, velocidadeDigitacao));
        }
        
        await new Promise(resolve => setTimeout(resolve, 300));
    }
}

window.onload = iniciarTypewriter;

const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let particlesArray = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1; 
        this.speedX = (Math.random() - 0.5) * 0.6; 
        this.speedY = (Math.random() - 0.5) * 0.6;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }
    draw() {
        const isLightMode = document.body.classList.contains('light-mode');
        ctx.fillStyle = isLightMode ? 'rgba(0, 80, 200, 0.6)' : 'rgba(0, 225, 255, 0.6)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    particlesArray = [];
    const numberOfParticles = window.innerWidth < 768 ? 40 : 90;
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const isLightMode = document.body.classList.contains('light-mode');

    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
        
        for (let j = i; j < particlesArray.length; j++) {
            const dx = particlesArray[i].x - particlesArray[j].x;
            const dy = particlesArray[i].y - particlesArray[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 120) { 
                ctx.beginPath();
                const opacity = 1 - (distance / 120);
                ctx.strokeStyle = isLightMode 
                    ? `rgba(0, 80, 200, ${opacity * 0.5})` 
                    : `rgba(0, 225, 255, ${opacity * 0.5})`;
                ctx.lineWidth = 0.5;
                ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                ctx.stroke();
            }
        }
    }
    requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();