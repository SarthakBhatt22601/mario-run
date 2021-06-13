score = 0;
cross = true;

gameMusic = new Audio('../music/gameMusic.mp3');
marioDie = new Audio('../music/marioDie.mp3');

document.onkeydown= function(event){

    gameMusic.play();

    if(event.keyCode == 32 || event.keyCode == 38){
        mario = document.querySelector('.mario');
        mario.classList.add('animateMario');
        setTimeout(() => {
            mario.classList.remove('animateMario');
        },700);
    }

    else if(event.keyCode == 39){
        mario = document.querySelector('.mario');
        mx = parseInt(getComputedStyle(mario, null).getPropertyValue('left'));
        mario.style.left = mx + 110 + "px";
    }

    else if(event.keyCode == 37){
        mario = document.querySelector('.mario');
        mx = parseInt(getComputedStyle(mario, null).getPropertyValue('left'));
        mario.style.left = mx - 110 + "px";
    }
}

setInterval(() => {
    mario = document.querySelector('.mario');
    enemy = document.querySelector('.enemy');
    gameOver = document.querySelector('.gameOver');
    restart = document.querySelector('.button');

    mx = parseInt(getComputedStyle(mario, null).getPropertyValue('left'));
    my = parseInt(getComputedStyle(mario, null).getPropertyValue('bottom'));

    ex = parseInt(getComputedStyle(enemy, null).getPropertyValue('left'));
    ey = parseInt(getComputedStyle(enemy, null).getPropertyValue('bottom'));

    diffx = Math.abs(mx-ex);
    diffy = Math.abs(my-ey);

    if(diffx<100 && diffy<90){
        gameMusic.pause();
        marioDie.play();
        enemy.classList.remove('animateEnemy');
        gameOver.style.visibility = 'visible';
        restart.style.visibility = 'visible';

        setTimeout(() => {
            marioDie.pause();
        }, 2000);

        mario.classList.add('animateMarioDie');
    }

    else if(diffx<100 && cross){
        score += 1;
        document.getElementById("scoreCount").innerHTML = "Your Score : " + score;
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1000);

        setTimeout(() => {
        aniDur = parseFloat(getComputedStyle(enemy, null).getPropertyValue('animation-duration'));    
        newDur = aniDur - 0.1;
        if(aniDur > 3){
            enemy.style.animationDuration = newDur + 's';
        }
        }, 1000);
    }

}, 10);