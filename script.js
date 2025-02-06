// ========== CÓDIGO DO MENU ==========
document.addEventListener("DOMContentLoaded", function() {
    const menuIcon = document.getElementById("menuIcon");
    const menu = document.getElementById("menu");

    // Abrir/Fechar menu
    menuIcon.addEventListener("click", function(e) {
        e.stopPropagation();
        menu.classList.toggle("active");
        menuIcon.classList.toggle("active");
    });

    // Fechar menu ao clicar fora
    document.addEventListener("click", function(e) {
        if (!menu.contains(e.target) && !menuIcon.contains(e.target)) {
            menu.classList.remove("active");
            menuIcon.classList.remove("active");
        }
    });

    // Animar itens do menu
    document.querySelectorAll(".menu-item").forEach(item => {
        item.addEventListener("mouseenter", function() {
            this.style.transform = "translateY(-3px)";
        });
        
        item.addEventListener("mouseleave", function() {
            this.style.transform = "translateY(0)";
        });
    });
});

class KabbalahGame {
    constructor() {
        this.questions = [
            { letter: 'א', number: 1, sefirah: 'keter', meaning: 'Aleph - O Espírito Divino' },
            { letter: 'ב', number: 2, sefirah: 'chokhmah', meaning: 'Bet - Sabedoria Primordial' },
            { letter: 'ג', number: 3, sefirah: 'binah', meaning: 'Gimel - Entendimento Divino' },
            { letter: 'ד', number: 4, sefirah: 'chesed', meaning: 'Dalet - Amor e Misericórdia' },
            { letter: 'ה', number: 5, sefirah: 'gevurah', meaning: 'Hei - Julgamento e Restrição' },
            { letter: 'ו', number: 6, sefirah: 'tiferet', meaning: 'Vav - Beleza e Harmonia' },
            { letter: 'ז', number: 7, sefirah: 'netzach', meaning: 'Zayin - Vitória Eterna' },
            { letter: 'ח', number: 8, sefirah: 'hod', meaning: 'Chet - Esplendor Divino' },
            { letter: 'ט', number: 9, sefirah: 'yesod', meaning: 'Tet - Fundação do Mundo' },
            { letter: 'י', number: 10, sefirah: 'malkuth', meaning: 'Yod - Reino Material' }
        ];

        this.currentQuestionIndex = 0;
        this.score = 0;
        this.shuffleQuestions();
        this.init();
    }

    shuffleQuestions() {
        this.questions = this.questions.sort(() => Math.random() - 0.5);
    }

    init() {
        this.setupEventListeners();
        this.resetGame();
    }

    setupEventListeners() {
        document.getElementById('start-btn').addEventListener('click', () => this.startGame());
        document.getElementById('restart-btn').addEventListener('click', () => this.resetGame());

        document.querySelectorAll('.sefirah').forEach(element => {
            element.addEventListener('click', (e) => this.checkAnswer(e.target));
        });
    }

    startGame() {
        document.getElementById('start-btn').classList.add('hidden');
        document.getElementById('question-panel').classList.remove('hidden');
        this.showQuestion();
    }

    showQuestion() {
        const question = this.questions[this.currentQuestionIndex];
        document.getElementById('current-question').textContent = 
            `Associe a letra ${question.letter} ao seu conceito correspondente:`;
        document.getElementById('current-symbol').textContent = question.letter;
    }

    checkAnswer(target) {
        const question = this.questions[this.currentQuestionIndex];
        const isCorrect = target.id === question.sefirah;

        target.classList.add(isCorrect ? 'correct' : 'incorrect');

        if (isCorrect) {
            this.score += 100;
            document.querySelector('#score span').textContent = this.score;

            if (this.currentQuestionIndex < this.questions.length - 1) {
                this.currentQuestionIndex++;
                setTimeout(() => {
                    target.classList.remove('correct', 'incorrect');
                    this.showQuestion();
                }, 1000);
            } else {
                setTimeout(() => this.endGame(), 1000);
            }
        } else {
            this.score = Math.max(0, this.score - 50);
            document.querySelector('#score span').textContent = this.score;

            setTimeout(() => target.classList.remove('incorrect'), 1000);
        }
    }

    endGame() {
        alert(`Parabéns! Completaste a Árvore da Vida!\nPontuação Final: ${this.score}`);
        this.resetGame();
    }

    resetGame() {
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.shuffleQuestions();
        document.querySelector('#score span').textContent = '0';
        document.getElementById('start-btn').classList.remove('hidden');
        document.getElementById('question-panel').classList.add('hidden');
        this.showQuestion();
    }
}

document.addEventListener('DOMContentLoaded', () => new KabbalahGame());
