const cards = {
    fire_ancestral: { 
        name: "Fogo Ancestral", 
        element: "fire",
        synergies: ["warrior_ebony", "lightning_fast", "flaming_sword"]
    },
    warrior_ebony: { 
        name: "Guerreiro de Ébano", 
        element: "earth",
        synergies: ["fire_ancestral", "flaming_sword", "ice_lance", "armor_mystic"]
    },
    armor_mystic: { 
        name: "Armadura Mística", 
        element: "earth",
        synergies: ["spirit_forest", "divine_shield", "stone_golem", "warrior_ebony"]
    },
    spirit_forest: { 
        name: "Espírito da Floresta", 
        element: "nature",
        synergies: ["armor_mystic", "healing_potion", "elf_archer", "nature_spell", "night_vampire"]
    },
    lightning_fast: { 
        name: "Relâmpago Veloz", 
        element: "electric",
        synergies: ["fire_ancestral", "storm", "fire_dragon", "phoenix", "electric_archer"]
    },
    healing_potion: { 
        name: "Poção Curativa", 
        element: "water",
        synergies: ["spirit_forest", "priest", "life_crystal", "nature_spell"]
    },
    flaming_sword: { 
        name: "Espada Flamejante", 
        element: "fire",
        synergies: ["warrior_ebony", "fire_dragon", "light_knight", "griffin", "hidden_shadow", "electric_archer"]
    },
    fire_dragon: { 
        name: "Dragão de Fogo", 
        element: "fire",
        synergies: ["flaming_sword", "lightning_fast", "ice_dragon"]
    },
    divine_shield: { 
        name: "Escudo Divino", 
        element: "light",
        synergies: ["armor_mystic", "celestial_guardian", "stone_golem", "protection_circle"]
    },
    celestial_guardian: { 
        name: "Guardião Celestial", 
        element: "light",
        synergies: ["divine_shield", "armor_mystic", "light_knight", "protection_circle"]
    },
    storm: { 
        name: "Tempestade", 
        element: "water",
        synergies: ["lightning_fast", "fire_ancestral", "ice_dragon", "energy_ray"]
    },
    priest: { 
        name: "Sacerdote", 
        element: "light",
        synergies: ["healing_potion", "spirit_forest", "night_vampire"]
    },
    stone_golem: { 
        name: "Golem de Pedra", 
        element: "earth",
        synergies: ["armor_mystic", "divine_shield", "stone_wall"]
    },
    phoenix: { 
        name: "Fênix", 
        element: "fire",
        synergies: ["storm", "lightning_fast"]
    },
    elf_archer: { 
        name: "Elfo Arqueiro", 
        element: "nature",
        synergies: ["spirit_forest", "flaming_sword", "griffin"]
    },
    arcane_mage: { 
        name: "Mago Arcano", 
        element: "arcane",
        synergies: ["fire_ancestral", "storm", "ice_lance", "energy_ray", "live_flame"]
    },
    ice_lance: { 
        name: "Lança de Gelo", 
        element: "ice",
        synergies: ["arcane_mage", "warrior_ebony", "ice_dragon"]
    },
    light_knight: { 
        name: "Cavaleiro da Luz", 
        element: "light",
        synergies: ["flaming_sword", "celestial_guardian", "griffin"]
    },
    live_flame: { 
        name: "Chama Viva", 
        element: "fire",
        synergies: ["arcane_mage", "fire_ancestral", "flame_guardian"]
    },
    ice_dragon: { 
        name: "Dragão de Gelo", 
        element: "ice",
        synergies: ["ice_lance", "storm", "fire_dragon"]
    },
    hidden_shadow: { 
        name: "Sombra Oculta", 
        element: "dark",
        synergies: ["warrior_ebony", "flaming_sword"]
    },
    life_crystal: { 
        name: "Cristal da Vida", 
        element: "light",
        synergies: ["healing_potion", "spirit_forest"]
    },
    night_vampire: { 
        name: "Vampiro Noturno", 
        element: "dark",
        synergies: ["priest", "spirit_forest"]
    },
    stone_wall: { 
        name: "Muralha de Pedra", 
        element: "earth",
        synergies: ["stone_golem", "armor_mystic"]
    },
    energy_ray: { 
        name: "Raio de Energia", 
        element: "electric",
        synergies: ["arcane_mage", "storm"]
    },
    protection_circle: { 
        name: "Círculo de Proteção", 
        element: "light",
        synergies: ["celestial_guardian", "divine_shield"]
    },
    griffin: { 
        name: "Grifo", 
        element: "wind",
        synergies: ["elf_archer", "flaming_sword", "light_knight"]
    },
    nature_spell: { 
        name: "Feitiço da Natureza", 
        element: "nature",
        synergies: ["spirit_forest", "healing_potion"]
    },
    flame_guardian: { 
        name: "Guardião das Chamas", 
        element: "fire",
        synergies: ["fire_ancestral", "live_flame"]
    },
    electric_archer: { 
        name: "Arqueiro Elétrico", 
        element: "electric",
        synergies: ["lightning_fast", "flaming_sword"]
    }
};

function populateSelectOptions(selectElement, selectedValues) {
    for (const key in cards) {
        if (!selectedValues.includes(key)) {
            const option = document.createElement('option');
            option.value = key;
            option.textContent = `${cards[key].name} (${cards[key].element})`;
            selectElement.appendChild(option);
        }
    }
}

function generateCardFields() {
    const numCards = document.getElementById('numCards').value;
    const cardFields = document.getElementById('cardFields');
    const cardImagesContainer = document.getElementById('cardImages'); 
    cardFields.innerHTML = '';
    cardImagesContainer.innerHTML = '';

    document.getElementById('result').textContent = '';
    document.getElementById('additionalCombos').innerHTML = '';
    document.getElementById('totalCombinations').textContent = '';

    const selectedValues = [];

    for (let i = 1; i <= numCards; i++) {
        const label = document.createElement('label');
        label.htmlFor = `card${i}`;
        label.textContent = `Carta ${i}:`;

        const select = document.createElement('select');
        select.id = `card${i}`;
        select.name = `card${i}`;
        select.onchange = ensureUniqueSelection;

        populateSelectOptions(select, selectedValues);

        selectedValues.push(select.value);

        cardFields.appendChild(label);
        cardFields.appendChild(select);
    }

    const findComboButton = document.getElementById('findComboButton');
    findComboButton.style.display = 'none'; // Hide initially

    const selects = document.querySelectorAll('select');
    let allSelected = true;
    selects.forEach(select => {
        if (select.value === '') {
            allSelected = false;
        }
    });
    if (allSelected) {
        findComboButton.style.display = 'block';
    }
}

function ensureUniqueSelection() {
    const selects = document.querySelectorAll('select');
    const selectedValues = Array.from(selects).map(select => select.value);

    selects.forEach(select => {
        const options = select.querySelectorAll('option');
        options.forEach(option => {
            if (selectedValues.includes(option.value) && option.value !== select.value) {
                option.disabled = true;
            } else {
                option.disabled = false;
            }
        });
    });

    const findComboButton = document.getElementById('findComboButton');
    let allSelected = true;
    selects.forEach(select => {
        if (select.value === '') {
            allSelected = false;
        }
    });
    findComboButton.style.display = allSelected ? 'block' : 'none';
}

function findBestCombo() {
    const selectedCards = [];
    const numCards = document.getElementById('numCards').value;
    for (let i = 1; i <= numCards; i++) {
        const selectedCard = document.getElementById(`card${i}`).value;
        selectedCards.push(selectedCard);
    }

    const maxSynergy = 6;
    const allCards = Object.keys(cards);
    const remainingCards = allCards.filter(card => !selectedCards.includes(card));

    const bestCombo = [];
    const requiredCards = maxSynergy - selectedCards.length;

    for (const card of remainingCards) {
        let synergyCount = 0;
        for (const selectedCard of selectedCards) {
            if (cards[selectedCard].synergies.includes(card)) {
                synergyCount++;
            }
        }

        bestCombo.push({ card, synergyCount });
    }

    bestCombo.sort((a, b) => b.synergyCount - a.synergyCount);

    const bestCards = bestCombo.slice(0, requiredCards).map(c => cards[c.card]);

    const additionalCombos = [];
    for (let i = 1; i <= 10; i++) {
        const combo = bestCombo.slice(i * requiredCards, (i + 1) * requiredCards).map(c => cards[c.card]);
        if (combo.length === requiredCards) {
            additionalCombos.push(combo.map(card => card.name).join(', '));
        }
    }

    const resultElement = document.getElementById('result');
    resultElement.innerHTML = `<strong>Melhor combinação de cartas: </strong><br>${bestCards.map(card => card.name).join(', ')}`;

    const additionalCombosElement = document.getElementById('additionalCombos');
    additionalCombosElement.innerHTML = `<strong>Outras combinações possíveis:</strong><br>${additionalCombos.join('<br>')}`;

    const totalCombinations = calculateCombinations(remainingCards.length, requiredCards);
    const totalCombinationsElement = document.getElementById('totalCombinations');
    totalCombinationsElement.innerHTML = `<strong>Total de combinações possíveis:</strong><br>${totalCombinations}`;

    const cardImagesContainer = document.getElementById('cardImages');
    cardImagesContainer.innerHTML = '';

    bestCards.forEach(card => {
        const cardImage = document.createElement('img');
        const imageName = `${card.name}.jpeg`;
        cardImage.src = `drawable/${imageName}`;
        cardImage.alt = card.name;
        cardImage.title = card.name;
        cardImage.className = 'card-image';
        cardImagesContainer.appendChild(cardImage);
    });

    const findComboButton = document.getElementById('findComboButton');
    findComboButton.style.display = 'none';
}

function calculateCombinations(n, k) {
    return Math.round(factorial(n) / (factorial(k) * factorial(n - k)));
}

function factorial(num) {
    if (num <= 1) return 1;
    let result = 1;
    for (let i = 2; i <= num; i++) {
        result *= i;
    }
    return result;
}