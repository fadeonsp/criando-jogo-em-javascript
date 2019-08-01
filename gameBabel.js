// cria canvas
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

// colocando imagem de fundo
let bgReady = false;
const bgImage = new Image();
bgImage.onload = function (){
    bgReady = true;
};
bgImage.src = 'images/background.png';

// imagem do heroi
let heroReady = false;
const heroImage = new Image();
heroImage.onload = function (){
    heroReady = true;
};
heroImage.src = 'images/hero.png';

// imagem do mosntro
let monsterReady = false;
const monsterImage = new Image();
monsterImage.onload = function (){
    monsterReady = true;
};
monsterImage.src = 'images/monster.png';

// criar os objetos do jogo
const hero = {
    speed: 256 //movimento em pixels  por segundo
};
const monster = {};
let monsterCaught = 0;

// controle do teclado
const keysDown ={};

window.addEventListener('keyDown', function (e) { 
    keysDown[e.keyCode] = true;
}, false);

window.addEventListener('keyUp', function (e) { 
   delete keysDown[e.keyCode];
}, false);

// reseta o jogo quando o jogador pega monstro
const reset = function (){
    hero.x = canvas.width / 2;
    hero.y = canvas.height / 2;

    //posiciona o monstro  randomicamente na tela
    monster.x = 32 + (Math.random() * (canvas.width - 64));
    monster.y = 32 + (Math.random() * (canvas.width - 64));
};

// atualiza os objetos do jogo
const update = function (modifier) {
    if(38 in keysDown){ // pressionando a seta  pra cima
        hero.y -= hero.speed * modifier;
    }
    if (40 in keysDown) { // pressionando  a seta pra baixo
        hero.y += hero.speed * modifier;
    }
    if (37 in keysDown) { // pressionando  a seta pra esquerda
        hero.x -= hero.speed * modifier;
    }
    if (37 in keysDown) { // pressionando  a seta pra direita
        hero.x += hero.speed * modifier;
    }

    // os personagens se enconstaram ?
    if (
        hero.x <= (monster.x + 32)
        && monster.x <= (hero.x + 32)
        && hero.y <= (monster.y + 32)
        && monster.y <= (hero.y + 32)
    ) {
        ++monsterCaught; // aumentando 
        reset(); // caso se baterem
    }
};

// fazendo a renderização
const render = function () {
    if (bgReady) {
        ctx.drawImage(bgImage, 0, 0);
    }

    if(heroReady){
        ctx.drawImage(heroImage, hero.x, hero.y);
    }

    if (monsterReady) {
        ctx.drawImage(monsterImage, monster.x, monster.y);
    }

    // pontuação
    ctx.fillStyle = 'rgb(250, 250, 250)';
    ctx.font = '24px helvetica';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText('Monstros pegos: ' + monsterCaught, 32, 32);
};

// controle  do loop
const main = function () {
    const now = Date.now();  // 3200
    const delta = now - then; // 2000

    update(delta / 1000); // 2000 / 1000 = 2
    render();

    then = now; // 3200
    
    // executa o mais breve possível
    requestAnimationFrame(main); 
};

//  suporte cross-browser para requestAnimationFrame
const w = window;
const requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFame || w.mozRequestAnimationFrame;

let then = Date.now();
reset();
main();