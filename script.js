document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttonsContainer = document.getElementById('buttons');
    const enemyHealthEl = document.getElementById('enemyHealth');
    const saveGameButton = document.getElementById('saveGame');
    let enemyHealth = 100;
    let unlockedButtons = ['7', '8', '9', '+'];
    let expression = '';

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
            unlockedButtons: unlockedButtons
        };
        alert('Save Code: ' + btoa(JSON.stringify(saveData)));
    }

    function loadGame(saveCode) {
        const saveData = JSON.parse(atob(saveCode));
        enemyHealth = saveData.enemyHealth;
        unlockedButtons = saveData.unlockedButtons;
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

    function onButtonClick(button) {
        if (button === '=') {
            try {
                const result = eval(expression);
                updateDisplay(result);
                updateEnemyHealth(result);
                expression = '';
            } catch {
                updateDisplay('Error');
                expression = '';
            }
        } else if (button === 'C') {
            expression = '';
            updateDisplay('');
        } else {
            expression += button;
            updateDisplay(expression);
        }
    }

    saveGameButton.addEventListener('click', saveGame);

    renderButtons();
});
