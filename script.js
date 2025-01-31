document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttonsContainer = document.getElementById('buttons');
    const enemyHealthEl = document.getElementById('enemyHealth');
    const saveGameButton = document.getElementById('saveGame');
    const startGameButton = document.getElementById('startGame');
    let enemyHealth = 100;
    let unlockedButtons = ['1', 'C'];
    let expression = '';
    let currentBossIndex = 0;

    const bosses = [
        { name: '2 Boss', health: 100, unlock: ['4', '5', '6', '-'] },
        { name: '+- Boss', health: 150, unlock: ['1', '2', '3', '*'] },
        { name: 'Times Boss', health: 200, unlock: ['0', '.', '/', '='] },
        { name: 'Multiply Boss', health: 250, unlock: ['C'] },
        { name: 'Equals Boss', health: 300, unlock: [] }
    ];

    function updateDisplay(value) {
        display.textContent = value;
    }

    function updateEnemyHealth(damage) {
        enemyHealth -= damage;
        enemyHealthEl.textContent = enemyHealth;
    }

    function saveGame() {
        const saveData = {
            enemyHealth: enemyHealth,
            unlockedButtons: unlockedButtons,
            currentBossIndex: currentBossIndex
        };
        alert('Save Code: ' + btoa(JSON.stringify(saveData)));
    }

    function loadGame(saveCode) {
        const saveData = JSON.parse(atob(saveCode));
        enemyHealth = saveData.enemyHealth;
        unlockedButtons = saveData.unlockedButtons;
        currentBossIndex = saveData.currentBossIndex;
        enemyHealthEl.textContent = enemyHealth;
        renderButtons();
    }

    function renderButtons() {
        buttonsContainer.innerHTML = '';
        unlockedButtons.forEach(button => {
            const btn = document.createElement('button');
            btn.textContent = button;
            btn.addEventListener('click', () => onButtonClick(button));
            buttonsContainer.appendChild(btn);
        });
    }

    function unlockNextButtons() {
        const nextButtons = bosses[currentBossIndex].unlock;
        unlockedButtons = [...new Set([...unlockedButtons, ...nextButtons])];
        renderButtons();
    }

    function onButtonClick(button) {
        let damage = 0;
        if (button === '1') {
            damage = 1;
        } else if (button === 'C') {
            damage = 5;
        }

        if (button === '=') {
            try {
                const result = eval(expression);
                updateDisplay(result);
                damage = result;
                updateEnemyHealth(damage);
                if (enemyHealth <= 0) {
                    alert(`You defeated ${bosses[currentBossIndex].name}!`);
                    currentBossIndex++;
                    if (currentBossIndex < bosses.length) {
                        enemyHealth = bosses[currentBossIndex].health;
                        unlockNextButtons();
                    } else {
                        alert('You defeated all the bosses!');
                    }
                    enemyHealthEl.textContent = enemyHealth;
                }
                expression = '';
            } catch {
                updateDisplay('Error');
                expression = '';
            }
        } else if (button === 'C') {
            expression = '';
            updateDisplay('');
            updateEnemyHealth(damage);
        } else {
            expression += button;
            updateDisplay(expression);
            updateEnemyHealth(damage);
        }
    }

    startGameButton.addEventListener('click', () => {
        document.getElementById('controls').style.display = 'none';
        document.getElementById('game').style.display = 'block';
        renderButtons();
    });

    saveGameButton.addEventListener('click', saveGame);
});
