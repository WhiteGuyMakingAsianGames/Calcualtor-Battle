body {
    font-family: Arial, sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f0f0f0;
    margin: 0;
}

#controls, #game {
    text-align: center;
}

#calculator {
    display: inline-block;
    margin-bottom: 20px;
}

#display {
    width: 200px;
    height: 50px;
    background-color: #fff;
    border: 1px solid #ccc;
    margin-bottom: 10px;
    text-align: right;
    padding: 10px;
    font-size: 24px;
}

#buttons {
    display: grid;
    grid-template-columns: repeat(4, 50px);
    gap: 5px;
}

button {
    width: 50px;
    height: 50px;
    font-size: 18px;
    cursor: pointer;
}

#enemy {
    margin-top: 20px;
    font-size: 18px;
}
