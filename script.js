const canv = document.getElementById("canvas");
const ctx = canv.getContext("2d");

var snakeX = 10; //Position initiale du serpent
var snakeY = 10;

var largeur = 20; // 20 x 20 = 400 width / heigth
var hauteur = 20;

var CarreVertX = 15;
var CarreVertY = 15;

var mechantX = 20;
var mechantY = 20;

var vitesseX = 0;
var vitesseY = 0;

var serpent = [];
var taille = 1; // taille du serpent

var score = 0;

function game() {
  //déplacer le serpent dans la position suivante
  snakeX += vitesseX;
  snakeY += vitesseY;

  planDuJeu();

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canv.width, canv.height);

  afficheSerpent();

  mangeCarreVert();

  mangeMechant();

  afficheCarre();

  gagner();
}

var play = setInterval(game, 100); // toutes les 10 ms exécute game()

// fonction d'événement keyDown. Les codes de touche représentent les touches fléchées
document.addEventListener("keydown", clavier);

function clavier(evt) {
   evt.preventDefault();
  switch (evt.keyCode) {
    case 37: //** à gauche */
      vitesseX = -1;
      vitesseY = 0;
      break;
    case 38: //** en haut */
      vitesseX = 0;
      vitesseY = -1;
      break;
    case 39: //** à droite */
      vitesseX = 1;
      vitesseY = 0;
      break;
    case 40: //** en bas */
      vitesseX = 0;
      vitesseY = 1;
      break;
  }
}
//vitesseX vitesseY représentent la direction du serpent
//si nous allons à gauche, nous voulons que le Y soit le même, mais le X devrait être la position actuelle - 1

function planDuJeu() {
  //si la position de snakeX, snakeY sort hors du jeu
  if (snakeX < 0) {
    snakeX = largeur - 1;
  }
  if (snakeX > largeur - 1) {
    snakeX = 0;
  }
  if (snakeY < 0) {
    snakeY = hauteur - 1;
  }
  if (snakeY > hauteur - 1) {
    snakeY = 0;
  }
}

function afficheSerpent() {
  ctx.fillStyle = "lime";
  //on affiche le contenu du tableau qui contient la tête du serpent
  for (var i = 0; i < serpent.length; i++) {
    ctx.fillRect(serpent[i].x * largeur, serpent[i].y * hauteur, largeur, hauteur);

    if (serpent[i].x == snakeX && serpent[i].y == snakeY) {
      taille = 1;
      score = 0;
      showScore(score);
    }
  }
  serpent.push({ x: snakeX, y: snakeY }); // On insére la valeur de x et y dans le tableau
  // tant que le tableau depasse la taille maximum
  while (serpent.length > taille) {
    serpent.shift(); // alors on enlève un élément
  }
}

function mangeMechant() {
  if (mechantX == snakeX && mechantY == snakeY) {
    document.location.reload(game);
  }
}

function mangeCarreVert() {
  if (CarreVertX == snakeX && CarreVertY == snakeY) {
    taille++;

    // affiche le prochain carre vert
    CarreVertX = Math.floor(Math.random() * largeur); //renvoie un entier aléatoire de 0 à 19
    CarreVertY = Math.floor(Math.random() * hauteur);
    // affiche le mechant
    mechantX = Math.floor(Math.random() * largeur);
    mechantY = Math.floor(Math.random() * hauteur);

    score++;
    showScore(score);
  }
}

function afficheCarre() {
  // dessine carre vert
  ctx.fillStyle = "green";
  ctx.fillRect(CarreVertX * largeur, CarreVertY * hauteur, largeur - 1, hauteur - 1);
  // dessine mechant (carre rouge)
  ctx.fillStyle = "red";
  ctx.fillRect(mechantX * largeur, mechantY * hauteur, largeur - 1, hauteur - 1);
}

function showScore(score) {
  document.getElementById("score").innerHTML = score; // pour afficher le score ++
}

function recommencer() {
  document.addEventListener("keydown", (e) => {
    if (e.keyCode === 13) {
      document.location.reload(game); //** recharge la page avec la touche entrée */
    }
  });
}
recommencer();

function gagner() {
  var div = document.getElementById("cache");

  if (score == 20) {
    clearInterval(play);
    div.style.visibility = "visible";
  } else {
    div.style.visibility = "hidden";
  }
}
