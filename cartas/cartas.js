function generateHands() {
    const numPlayers = parseInt(document.getElementById('num-players').value);
    const suits = ['♠', '♥', '♦', '♣'];
    const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    
    if (isNaN(numPlayers) || numPlayers < 2 || numPlayers > 10) {
        alert('Por favor, insira um número de jogadores válido (entre 2 e 10).');
        return;
    }

    let deck = [];
    for (const suit of suits) {
        for (const rank of ranks) {
            deck.push(`${rank}${suit}`);
        }
    }
    deck = _.shuffle(deck);

    const hands = [];
    for (let i = 0; i < numPlayers; i++) {
        hands.push(deck.splice(0, 5));
    }

    const handsDiv = document.getElementById('hands');
    handsDiv.innerHTML = '';
    hands.forEach((hand, index) => {
        const handDiv = document.createElement('div');
        handDiv.className = 'hand';
        handDiv.innerHTML = `<strong>Jogador ${index + 1}:</strong> ${hand.map(card => `<span class="card">${card}</span>`).join('')}`;
        handsDiv.appendChild(handDiv);
    });
}
