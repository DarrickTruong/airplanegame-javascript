
console.log("saved");
let hero = {
    x: 25,
    y: 25
};

let enemies = [
    { x: 75, y: 50 },
    { x: 275, y: 50 },
    { x: 475, y: 50 },
    { x: 675, y: 50 },
    { x: 875, y: 50 }
];

let missiles = [];

let points = 0;

function displayHero() {
    document.getElementById("hero").style.left = hero.x * 20 + "px";
    document.getElementById("hero").style.top = hero.y * 20 + "px";
}

function displayPoints() {
    document.getElementById("score").innerHTML = points;
}

function displayEnemies() {
    let output = "";
    for (enemy of enemies) {
        output +=
            "<div class='enemy1' style='top:" +
            enemy.y +
            "px; left:" +
            enemy.x +
            "px;'></div>";
    }
    document.getElementById("enemies").innerHTML = output;
}

function moveEnemies() {
    for (enemy of enemies) {
        enemy.y += 5;

        if (enemy.y > 500) {
            enemy.y = 0;
        }
    }
}

function displayMissiles() {
    let output = "";
    for (missile of missiles) {
        output +=
            "<div class='missile' style='top:" +
            missile.y +
            "px; left:" +
            missile.x +
            "px;'></div>";
    }
    document.getElementById("missiles").innerHTML = output;
}

function moveMissiles() {
    for (let i = 0; i < missiles.length; i++) {
        missiles[i].y -= 10;
        if (missiles[i].y < 0) {
            missiles[i] = missiles[missiles.length - 1];
            missiles[missiles.length - 1] = missiles[i];
            missiles.pop();
        }
    }
}

function missilesLoop() {
    displayMissiles();
    moveMissiles();
}

function collisionDetection() {
    for (let i = 0; i < enemies.length; i++) {
        for (let j = 0; j < missiles.length; j++) {
            if (
                Math.abs(enemies[i].x - missiles[j].x) < 12 &&
                Math.abs(enemies[i].y - missiles[j].y) < 5
            ) {
                console.log("kaboom");
                points += 1000;
            }
        }
    }
}

function gameLoop() {
    displayHero();
    moveEnemies();
    displayEnemies();
    missilesLoop();
    collisionDetection();
    displayPoints();
}

document.onkeydown = function (e) {
    console.log(e.keyCode);
    if (e.keyCode == 13) {
        g = setInterval(gameLoop, 100);
    } else if (e.keyCode == 37) {
        hero.x--;
    } else if (e.keyCode == 39) {
        hero.x++;
    } else if (e.keyCode == 38) {
        hero.y--;
    } else if (e.keyCode == 40) {
        hero.y++;
    } else if (e.keyCode == 27) {
        clearInterval(g);
    } else if (e.keyCode == 32) {
        missiles.push({ x: 5 + hero.x * 20, y: -11 + hero.y * 20 });
    }
    displayHero();
};
