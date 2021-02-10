let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let cobra = [];
let direcao = "right";
let comida = {
	x: Math.floor(Math.random() * 15 + 1) * box,
	y: Math.floor(Math.random() * 15 + 1) * box
}

cobra[0] = {
	x: 8 * box,
	y: 8 * box
}

function criarBG(){
	context.fillStyle = "lightgreen";
	context.fillRect(0,0,16 * box, 16 * box);
}

function criarCobrinha(){
	for(i = 0; i < cobra.length; i++){
		context.fillStyle = "green";
		context.fillRect(cobra[i].x, cobra[i].y, box, box);
	}
}

function desenhaComida(){
	context.fillStyle = "red";
	context.fillRect(comida.x, comida.y, box, box);
}

document.addEventListener('keydown', update);

function update(event){
	if(event.keyCode == 37 && direcao != "right") direcao = "left";
	if(event.keyCode == 38 && direcao != "down") direcao = "up";
	if(event.keyCode == 39 && direcao != "left") direcao = "right";
	if(event.keyCode == 40 && direcao != "up") direcao = "down";
}

function iniciarJogo(){
	
	if(cobra[0].x > 15 * box && direcao == "right") cobra[0].x = 0;
	if(cobra[0].x < 0 && direcao == "left") cobra[0].x = 16 * box;
	if(cobra[0].y > 15 * box && direcao == "down") cobra[0].y = 0;
	if(cobra[0].y < 0 && direcao == "up") cobra[0].y = 16 * box;

	for(i = 1; i < cobra.length; i++){
		if(cobra[0].x == cobra[i].x && cobra[0].y == cobra[i].y){
			clearInterval(jogo);
			alert('Fim de jogo :( \nRecarregue a página para jogar novamente!');
		}
	}
	
	criarBG();
	criarCobrinha();
	desenhaComida();
	
	let posicaoX = cobra[0].x;
	let posicaoY = cobra[0].y;
	
	switch(direcao){
		case "right":
			posicaoX += box;
			break;
		case "left":
			posicaoX -= box;
			break;
		case "up":
			posicaoY -= box;
			break;
		case "down":
			posicaoY += box;
			break;
		
	}

	if(posicaoX != comida.x || posicaoY != comida.y){
		cobra.pop();
	}
	else{
		comida.x = Math.floor(Math.random() * 15 + 1) * box;
		comida.y = Math.floor(Math.random() * 15 + 1) * box;
	}
	
	let novaCabeca = {
		x: posicaoX,
		y: posicaoY
	}
	
	cobra.unshift(novaCabeca);
}

let jogo = setInterval(iniciarJogo, 100);