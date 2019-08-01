'use strict';

// cria canvas
var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

// colocando imagem de fundo
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
    bgReady = true;
};
bgImage.src = 'images/background.png';

// imagem do heroi
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
    heroReady = true;
};
heroImage.src = 'images/hero.png';

// imagem do mosntro
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
    monsterReady = true;
};
monsterImage.src = 'images/monster.png';

// criar os objetos do jogo
var hero = {
    speed: 256 //movimento em pixels  por segundo
};
var monster = {};
var monsterCaught = 0;

// controle do teclado
var keysDown = {};

window.addEventListener('keyDown', function (e) {
    keysDown[e.keyCode] = true;
}, false);

window.addEventListener('keyUp', function (e) {
    delete keysDown[e.keyCode];
}, false);

// reseta o jogo quando o jogador pega monstro
var reset = function reset() {
    hero.x = canvas.width / 2;
    hero.y = canvas.height / 2;

    //posiciona o monstro  randomicamente na tela
    monster.x = 32 + Math.random() * (canvas.width - 64);
    monster.y = 32 + Math.random() * (canvas.width - 64);
};

// atualiza os objetos do jogo
var update = function update(modifier) {
    if (38 in keysDown) {
        // pressionando a seta  pra cima
        hero.y -= hero.speed * modifier;
    }
    if (40 in keysDown) {
        // pressionando  a seta pra baixo
        hero.y += hero.speed * modifier;
    }
    if (37 in keysDown) {
        // pressionando  a seta pra esquerda
        hero.x -= hero.speed * modifier;
    }
    if (37 in keysDown) {
        // pressionando  a seta pra direita
        hero.x += hero.speed * modifier;
    }

    // os personagens se enconstaram ?
    if (hero.x <= monster.x + 32 && monster.x <= hero.x + 32 && hero.y <= monster.y + 32 && monster.y <= hero.y + 32) {
        ++monsterCaught; // aumentando 
        reset(); // caso se baterem
    }
};

// fazendo a renderização
var render = function render() {
    if (bgReady) {
        ctx.drawImage(bgImage, 0, 0);
    }

    if (heroReady) {
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
var main = function main() {
    var now = Date.now(); // 3200
    var delta = now - then; // 2000

    update(delta / 1000); // 2000 / 1000 = 2
    render();

    then = now; // 3200

    // executa o mais breve possível
    requestAnimationFrame(main);
};

//  suporte cross-browser para requestAnimationFrame
var w = window;
var requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFame || w.mozRequestAnimationFrame;

var then = Date.now();
reset();
main();
