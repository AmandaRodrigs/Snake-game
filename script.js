let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];
snake[0]={ /* determinando o tamanho da cobra */
    x: 8 * box,
    y: 8 * box
}

let direction = "right"; /* direção da cobra */
/* math.random retorna sempre um número aleatório até 1; Math.flor retira a parte do toent(?) pra comida não passar fora do canvas */
let food ={
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

function criarBG(){
    context.fillStyle = "#D8EDFF";
    context.fillRect (0, 0, 16 * box, 16 * box);
}

function criarCobra(){
    for(i=0; i<snake.length; i++){
        context.fillStyle = "#204C71";
        context.fillRect(snake[i].x, snake[i].y, box, box); /* o tamnho de x e y será o tamanho que passamos em cima e o box */
    }
}

function drawFood (){
    context.fillStyle = "purple";
    context.fillRect(food.x, food.y, box, box);
}

document.addEventListener('keydown', update); /* vai pegar o evento de clique dos botões do teclado e vai chamar a função update */

function update (event){
    if(event.keyCode == 37  && direction != "right") direction = "left"; /* a nossa direção não pode ser diferente da que está sendo usada agora */
    if(event.keyCode == 38 && direction != "down") direction = "up";
    if(event.keyCode == 39 && direction != "left") direction = "right";
    if(event.keyCode == 40 && direction != "up") direction = "down";
}

function iniciarJogo(){
    if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0; /* determinando o limite de campo de passagem da cobrinha */
    if(snake[0].x < 0 && direction == "left") snake[0].x = 16 * box; 
    if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0; 
    if(snake[0].y < 0 && direction == "up") snake[0].y = 16 * box; 
    
    for(i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
            alert ('Game Over! Try again!');
        }
    }

    criarBG();
    criarCobra();
    drawFood();

    let snakeX = snake[0].x; /* posição da cobrinha */
    let snakeY = snake[0].y;

    /* as coordenadas da cobrinha */
    if(direction == "right") snakeX += box; /* pra direita aumenta */
    if(direction == "left") snakeX -= box; /* pra esquerda diminui */
    if(direction == "up") snakeY -= box;
    if(direction == "down")snakeY += box;

    if(snakeX != food.x || snakeY != food.y){
        snake.pop();
    }
    else{
        food.x = Math.floor(Math.random() * 15 + 1) * box,
        food.y = Math.floor(Math.random() * 15 + 1) * box
    }

    let newHead ={
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);

}

let jogo = setInterval(iniciarJogo, 100); /* intervalo de 10miliseg, vai dar continuidade no jogo sem ele travar */

