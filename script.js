const questions = [
  {
    scenario: "A major e-commerce platform detected a DDoS attack on their website. The homepage was defaced with a message: 'Stop the injustice — JusticeForAll'. No data was stolen and no ransom was demanded.",
    options: ["Cybercriminal", "Nation-State", "Hacktivist", "Insider Threat", "Script Kiddie"],
    correct: 2,
    explanation: "Hacktivists use DDoS + defacement to spread political messages. They don't seek money — they seek attention for a cause."
  },
  {
    scenario: "An attacker remained undetected in a bank's network for 8 months. They stole proprietary supplier pricing data and expansion plans. All logs were carefully erased. No ransom note was left.",
    options: ["Cybercriminal", "Nation-State", "Hacktivist", "Insider Threat", "Script Kiddie"],
    correct: 1,
    explanation: "Nation-State actors (APTs) stay silent for months, steal strategic intelligence, and cover their tracks. They don't want money — they want secrets."
  },
  {
    scenario: "A company's customer database was encrypted. The attackers demanded $500,000 in Bitcoin. The stolen credit card data later appeared for sale on the dark web.",
    options: ["Cybercriminal", "Nation-State", "Hacktivist", "Insider Threat", "Script Kiddie"],
    correct: 0,
    explanation: "Cybercriminals are motivated by profit. Ransomware + selling data on dark web = classic cybercriminal behavior."
  },
  {
    scenario: "A recently fired employee from the IT department leaked 50,000 customer records to a competitor for $10,000 before leaving the company.",
    options: ["Cybercriminal", "Nation-State", "Hacktivist", "Insider Threat", "Script Kiddie"],
    correct: 3,
    explanation: "Insider Threats have legitimate access, know the systems internally, and often act out of revenge or financial gain."
  },
  {
    scenario: "A teenager used a ready-made tool (Metasploit) to hack a website and left a signature: 'I was here — DarkShadow'. Nothing was stolen and the site was back online after a reboot.",
    options: ["Cybercriminal", "Nation-State", "Hacktivist", "Insider Threat", "Script Kiddie"],
    correct: 4,
    explanation: "Script Kiddies use pre-built tools, seek fame, and lack sophisticated skills. They leave signatures but cause minimal real damage."
  }
];

let current = 0;
let score = 0;

function loadQuestion() {
  const q = questions[current];
  document.getElementById('question').textContent = q.scenario;
  
  const optionsDiv = document.getElementById('options');
  optionsDiv.innerHTML = '';
  
  q.options.forEach((opt, index) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.textContent = opt;
    btn.onclick = () => checkAnswer(index, btn);
    optionsDiv.appendChild(btn);
  });
  
  document.getElementById('feedback').className = '';
  document.getElementById('feedback').style.display = 'none';
  document.getElementById('next-btn').classList.remove('show');
}

function checkAnswer(selected, btn) {
  const q = questions[current];
  const feedback = document.getElementById('feedback');
  const buttons = document.querySelectorAll('.option-btn');
  
  buttons.forEach(b => b.disabled = true);
  
  if (selected === q.correct) {
    btn.classList.add('correct');
    feedback.className = 'show correct-feedback';
    feedback.innerHTML = `<strong>✅ Correct!</strong><br>${q.explanation}`;
    score++;
  } else {
    btn.classList.add('wrong');
    buttons[q.correct].classList.add('correct');
    feedback.className = 'show wrong-feedback';
    feedback.innerHTML = `<strong>❌ Wrong!</strong><br>${q.explanation}`;
  }
  
  document.getElementById('next-btn').classList.add('show');
}

function nextQuestion() {
  current++;
  if (current < questions.length) {
    loadQuestion();
  } else {
    showScore();
  }
}

function showScore() {
  document.getElementById('quiz-box').classList.add('hidden');
  document.getElementById('score-box').classList.remove('hidden');
  document.getElementById('final-score').textContent = 
    `You scored ${score} out of ${questions.length}!`;
}

function restartQuiz() {
  current = 0;
  score = 0;
  document.getElementById('quiz-box').classList.remove('hidden');
  document.getElementById('score-box').classList.add('hidden');
  loadQuestion();
}

// Start
loadQuestion();