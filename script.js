// Menu Mobile
document.querySelector('.mobile-menu-btn').addEventListener('click', function() {
    document.querySelector('nav ul').classList.toggle('active');
});

// Animação ao Scroll
const animateOnScroll = function() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (elementPosition < screenPosition) {
            element.classList.add('animated');
        }
    });
};

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Smooth Scrolling para Links Internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Fechar menu mobile se estiver aberto
            document.querySelector('nav ul').classList.remove('active');
        }
    });
});

// Tabs
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', function() {
        const tabId = this.getAttribute('data-tab');
        
        // Remover classe active de todas as tabs
        document.querySelectorAll('.tab').forEach(t => {
            t.classList.remove('active');
        });
        
        // Adicionar classe active à tab clicada
        this.classList.add('active');
        
        // Esconder todos os conteúdos
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        
        // Mostrar o conteúdo correspondente
        document.getElementById(`${tabId}-content`).classList.add('active');
    });
});

// Gráfico da Função
const canvas = document.getElementById('functionGraph');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    drawGraph();
}

function drawGraph() {
    const a = parseFloat(document.getElementById('coef-a').value);
    const b = parseFloat(document.getElementById('coef-b').value);
    
    // Limpar o canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Configurações
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const scale = 30; // pixels por unidade
    
    // Desenhar eixos
    ctx.strokeStyle = 'rgba(255, 215, 0, 0.5)';
    ctx.lineWidth = 1;
    
    // Eixo X
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(width, centerY);
    ctx.stroke();
    
    // Eixo Y
    ctx.beginPath();
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, height);
    ctx.stroke();
    
    // Marcações no eixo X
    ctx.fillStyle = 'rgba(255, 215, 0, 0.7)';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    
    for (let x = -10; x <= 10; x++) {
        if (x === 0) continue;
        const pixelX = centerX + x * scale;
        ctx.beginPath();
        ctx.moveTo(pixelX, centerY - 5);
        ctx.lineTo(pixelX, centerY + 5);
        ctx.stroke();
        ctx.fillText(x.toString(), pixelX, centerY + 10);
    }
    
    // Marcações no eixo Y
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    
    for (let y = -10; y <= 10; y++) {
        if (y === 0) continue;
        const pixelY = centerY - y * scale;
        ctx.beginPath();
        ctx.moveTo(centerX - 5, pixelY);
        ctx.lineTo(centerX + 5, pixelY);
        ctx.stroke();
        ctx.fillText(y.toString(), centerX - 10, pixelY);
    }
    
    // Origem
    ctx.fillStyle = 'rgba(255, 215, 0, 1)';
    ctx.fillText('0', centerX - 10, centerY + 10);
    
    // Desenhar a função
    ctx.strokeStyle = 'rgba(255, 215, 0, 1)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    
    let firstPoint = true;
    for (let x = -10; x <= 10; x += 0.1) {
        const y = a * x + b;
        const pixelX = centerX + x * scale;
        const pixelY = centerY - y * scale;
        
        if (firstPoint) {
            ctx.moveTo(pixelX, pixelY);
            firstPoint = false;
        } else {
            ctx.lineTo(pixelX, pixelY);
        }
    }
    
    ctx.stroke();
    
    // Destacar ponto de interseção com eixo Y
    if (b >= -10 && b <= 10) {
        ctx.fillStyle = 'rgba(255, 165, 0, 1)';
        ctx.beginPath();
        ctx.arc(centerX, centerY - b * scale, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillText(`(0, ${b})`, centerX + 15, centerY - b * scale);
    }
}

// Inicializar o gráfico
window.addEventListener('load', resizeCanvas);
window.addEventListener('resize', resizeCanvas);

document.getElementById('update-graph').addEventListener('click', drawGraph);

// Simulador de Função
document.getElementById('calcular-funcao').addEventListener('click', function() {
    const a = parseFloat(document.getElementById('sim-a').value);
    const b = parseFloat(document.getElementById('sim-b').value);
    const x = parseFloat(document.getElementById('sim-x').value);
    const resultado = document.getElementById('resultado-funcao');
    
    if (isNaN(a) || isNaN(b) || isNaN(x)) {
        resultado.innerHTML = '<p style="color: #ff6b6b;">Por favor, insira valores válidos.</p>';
    } else {
        const fx = a * x + b;
        resultado.innerHTML = `<p>Para f(x) = ${a}x + ${b} e x = ${x}:</p><p><strong>f(${x}) = ${fx.toFixed(2)}</strong></p>`;
    }
    
    resultado.style.display = 'block';
});

// Simulador de Custo
document.getElementById('calcular-custo').addEventListener('click', function() {
    const horas = parseFloat(document.getElementById('horas-servico').value);
    const resultado = document.getElementById('resultado-custo');
    
    if (isNaN(horas) || horas < 0) {
        resultado.innerHTML = '<p style="color: #ff6b6b;">Por favor, insira um número válido de horas.</p>';
    } else {
        const custo = 25 * horas + 80;
        resultado.innerHTML = `<p>Para ${horas} horas de serviço:</p><p><strong>Custo total = R$ ${custo.toFixed(2)}</strong></p>`;
    }
    
    resultado.style.display = 'block';
});

// Quiz
const quizQuestions = [
    {
        question: "Qual é a forma geral de uma função do 1º grau?",
        options: [
            "f(x) = ax² + bx + c",
            "f(x) = ax + b",
            "f(x) = a/x + b",
            "f(x) = a^x + b"
        ],
        correct: 1
    },
    {
        question: "O que representa o coeficiente 'a' na função f(x) = ax + b?",
        options: [
            "O ponto onde a reta corta o eixo y",
            "A taxa de variação da função",
            "O valor de f(x) quando x = 0",
            "O ponto onde a reta corta o eixo x"
        ],
        correct: 1
    },
    {
        question: "Se uma função é decrescente, o que podemos afirmar sobre seu coeficiente angular?",
        options: [
            "a > 0",
            "a < 0",
            "a = 0",
            "a = 1"
        ],
        correct: 1
    },
    {
        question: "Qual é o valor de f(3) para a função f(x) = 2x + 5?",
        options: [
            "6",
            "11",
            "8",
            "10"
        ],
        correct: 1
    },
    {
        question: "O que representa o coeficiente 'b' na função f(x) = ax + b?",
        options: [
            "A inclinação da reta",
            "O ponto onde a reta corta o eixo y",
            "A taxa de variação",
            "O ponto onde a reta corta o eixo x"
        ],
        correct: 1
    },
    {
        question: "Qual das seguintes funções é crescente?",
        options: [
            "f(x) = -3x + 2",
            "f(x) = 0x + 5",
            "f(x) = 4x - 1",
            "f(x) = -x + 7"
        ],
        correct: 2
    },
    {
        question: "Em que ponto a função f(x) = 3x - 6 corta o eixo x?",
        options: [
            "(0, -6)",
            "(2, 0)",
            "(-6, 0)",
            "(0, 2)"
        ],
        correct: 1
    },
    {
        question: "Qual é a função que representa uma reta horizontal?",
        options: [
            "f(x) = 2x + 3",
            "f(x) = 5",
            "f(x) = -x",
            "f(x) = 0x + 0"
        ],
        correct: 1
    },
    {
        question: "Se f(x) = -2x + 8, qual é o valor de x quando f(x) = 0?",
        options: [
            "4",
            "-4",
            "8",
            "-8"
        ],
        correct: 0
    },
    {
        question: "Qual é a inclinação da reta representada por f(x) = 0.5x - 3?",
        options: [
            "0.5",
            "-3",
            "3",
            "-0.5"
        ],
        correct: 0
    },
    {
        question: "Se uma função passa pelos pontos (1, 5) e (2, 8), qual é o coeficiente angular?",
        options: [
            "2",
            "3",
            "1",
            "4"
        ],
        correct: 1
    },
    {
        question: "Qual das seguintes situações pode ser modelada por uma função do 1º grau?",
        options: [
            "O crescimento de uma planta ao longo do tempo",
            "A área de um círculo em função do raio",
            "A trajetória de uma bola lançada para cima",
            "O preço de um produto com desconto percentual"
        ],
        correct: 0
    },
    {
        question: "Se f(x) = 4x - 2, qual é o valor de f(0)?",
        options: [
            "4",
            "-2",
            "2",
            "0"
        ],
        correct: 1
    },
    {
        question: "Qual é a função que representa uma reta com inclinação zero?",
        options: [
            "f(x) = 3x + 2",
            "f(x) = 5",
            "f(x) = -x + 1",
            "f(x) = 2x"
        ],
        correct: 1
    },
    {
        question: "Se uma função do 1º grau tem coeficiente angular 2 e coeficiente linear -3, qual é sua expressão?",
        options: [
            "f(x) = -3x + 2",
            "f(x) = 2x - 3",
            "f(x) = 3x - 2",
            "f(x) = -2x + 3"
        ],
        correct: 1
    }
];

// Renderizar questões do quiz
const quizContainer = document.getElementById('quiz-questions');

quizQuestions.forEach((q, index) => {
    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = `
        <h4>${index + 1}. ${q.question}</h4>
        <div class="options">
            ${q.options.map((option, i) => `
                <div class="option" data-question="${index}" data-option="${i}">
                    ${option}
                </div>
            `).join('')}
        </div>
    `;
    quizContainer.appendChild(questionElement);
});

// Selecionar opções
document.querySelectorAll('.option').forEach(option => {
    option.addEventListener('click', function() {
        const questionIndex = this.getAttribute('data-question');
        const optionIndex = this.getAttribute('data-option');
        
        // Remover seleção anterior nesta questão
        document.querySelectorAll(`.option[data-question="${questionIndex}"]`).forEach(opt => {
            opt.classList.remove('selected');
        });
        
        // Selecionar esta opção
        this.classList.add('selected');
    });
});

// Verificar respostas
document.getElementById('verificar-respostas').addEventListener('click', function() {
    let score = 0;
    
    quizQuestions.forEach((q, index) => {
        const selectedOption = document.querySelector(`.option[data-question="${index}"].selected`);
        
        if (selectedOption && parseInt(selectedOption.getAttribute('data-option')) === q.correct) {
            score++;
            selectedOption.style.backgroundColor = 'rgba(0, 180, 216, 0.3)';
        } else if (selectedOption) {
            selectedOption.style.backgroundColor = 'rgba(255, 107, 107, 0.3)';
        }
        
        // Destacar resposta correta
        const correctOption = document.querySelector(`.option[data-question="${index}"][data-option="${q.correct}"]`);
        correctOption.style.border = '2px solid #00b4d8';
    });
    
    // Mostrar resultados
    const results = document.getElementById('quiz-results');
    const scoreText = document.getElementById('score-text');
    const performanceMessage = document.getElementById('performance-message');
    const progressBar = document.getElementById('quiz-progress-bar');
    
    const percentage = (score / quizQuestions.length) * 100;
    scoreText.textContent = `Você acertou ${score} de ${quizQuestions.length} questões!`;
    progressBar.style.width = `${percentage}%`;
    
    if (score >= 12) {
        performanceMessage.textContent = 'Excelente! Você domina o conteúdo sobre função do 1º grau!';
        performanceMessage.style.color = '#10b981';
    } else if (score >= 9) {
        performanceMessage.textContent = 'Muito bom! Você tem um bom conhecimento sobre o assunto.';
        performanceMessage.style.color = '#FFD700';
    } else if (score >= 6) {
        performanceMessage.textContent = 'Bom! Continue estudando para melhorar seu desempenho.';
        performanceMessage.style.color = '#FFA500';
    } else {
        performanceMessage.textContent = 'Estude um pouco mais os conceitos de função do 1º grau e tente novamente!';
        performanceMessage.style.color = '#ef4444';
    }
    
    results.style.display = 'block';
});

// Reiniciar quiz
document.getElementById('reiniciar-quiz').addEventListener('click', function() {
    document.querySelectorAll('.option').forEach(option => {
        option.classList.remove('selected');
        option.style.backgroundColor = '';
        option.style.border = '1px solid rgba(255, 215, 0, 0.2)';
    });
    
    document.getElementById('quiz-results').style.display = 'none';
});

// Problemas
const problems = [
    {
        question: "Um táxi cobra uma taxa fixa de R$ 5,00 mais R$ 2,50 por quilômetro rodado. Qual é a função que representa o custo da corrida em função dos quilômetros percorridos?",
        answer: "f(x) = 2.5x + 5",
        hint: "Lembre-se que a taxa fixa é o coeficiente linear e o valor por km é o coeficiente angular."
    },
    {
        question: "Uma empresa de celular cobra R$ 30,00 por mês mais R$ 0,10 por minuto de ligação. Se um cliente falou 200 minutos no mês, qual será o valor da sua conta?",
        answer: "50",
        hint: "Use a função f(x) = 0.1x + 30 e substitua x por 200."
    },
    {
        question: "Um vendedor recebe um salário fixo de R$ 800,00 mais R$ 50,00 por produto vendido. Quantos produtos ele precisa vender para receber R$ 2.000,00?",
        answer: "24",
        hint: "Resolva a equação 50x + 800 = 2000."
    },
    {
        question: "A temperatura em uma cidade varia linearmente ao longo do dia. Às 6h, a temperatura era de 15°C e às 14h, era de 27°C. Qual é a função que representa essa variação?",
        answer: "f(x) = 1.5x + 6",
        hint: "Encontre o coeficiente angular usando os dois pontos: (6,15) e (14,27)."
    },
    {
        question: "Um reservatório de água tem 500 litros. Uma torneira despeja água no reservatório a uma taxa de 20 litros por minuto. Qual é a função que representa o volume de água no reservatório em função do tempo?",
        answer: "f(x) = 20x + 500",
        hint: "O volume inicial é 500 litros e a taxa de variação é 20 litros por minuto."
    },
    {
        question: "Um carro consome 1 litro de combustível a cada 12 km. Se o tanque tem capacidade para 50 litros, qual é a função que representa a quantidade de combustível no tanque em função da distância percorrida?",
        answer: "f(x) = -1/12 x + 50",
        hint: "O consumo é de 1/12 litros por km, e o sinal é negativo porque o combustível diminui."
    },
    {
        question: "Uma loja vende camisetas por R$ 25,00 cada. O custo de produção de cada camiseta é R$ 10,00 e a loja tem um custo fixo mensal de R$ 1.500,00. Quantas camisetas precisam ser vendidas para que a loja não tenha prejuízo?",
        answer: "100",
        hint: "Iguale a função de lucro a zero: 25x - (10x + 1500) = 0."
    },
    {
        question: "Um investimento inicial de R$ 1.000,00 rende R$ 50,00 por mês. Qual é a função que representa o montante acumulado em função do tempo em meses?",
        answer: "f(x) = 50x + 1000",
        hint: "O montante inicial é R$ 1.000,00 e o rendimento mensal é R$ 50,00."
    },
    {
        question: "Uma empresa cobra R$ 80,00 para assinatura de um serviço mais R$ 5,00 por hora de uso. Se um cliente pagou R$ 150,00, quantas horas ele usou o serviço?",
        answer: "14",
        hint: "Resolva a equação 5x + 80 = 150."
    },
    {
        question: "Um tanque com 1000 litros de água está sendo esvaziado a uma taxa de 25 litros por minuto. Qual é a função que representa o volume de água no tanque em função do tempo?",
        answer: "f(x) = -25x + 1000",
        hint: "O volume inicial é 1000 litros e a taxa de variação é -25 litros por minuto."
    }
];

// Renderizar problemas
const problemsContainer = document.getElementById('problems-container');

problems.forEach((problem, index) => {
    const problemElement = document.createElement('div');
    problemElement.className = 'problem';
    problemElement.innerHTML = `
        <h4>Problema ${index + 1}</h4>
        <p>${problem.question}</p>
        <div class="problem-input">
            <input type="text" id="answer-${index}" placeholder="Sua resposta">
            <button class="check-answer" data-index="${index}">Verificar</button>
        </div>
        <div class="problem-result" id="result-${index}"></div>
    `;
    problemsContainer.appendChild(problemElement);
});

// Verificar respostas dos problemas
document.querySelectorAll('.check-answer').forEach(button => {
    button.addEventListener('click', function() {
        const index = this.getAttribute('data-index');
        const answerInput = document.getElementById(`answer-${index}`);
        const resultDiv = document.getElementById(`result-${index}`);
        const userAnswer = answerInput.value.trim();
        const correctAnswer = problems[index].answer;
        
        if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
            resultDiv.innerHTML = '<p style="color: #10b981;">✓ Resposta correta!</p>';
        } else {
            resultDiv.innerHTML = `<p style="color: #ef4444;">✗ Resposta incorreta. Tente novamente!</p><p style="color: #FFA500; font-size: 0.9rem;">Dica: ${problems[index].hint}</p>`;
        }
        
        resultDiv.style.display = 'block';
    });
});