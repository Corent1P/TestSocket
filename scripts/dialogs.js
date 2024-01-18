const dialogs = [
    [
        "Bienvenue dans l'aventure palpitante du tandem à travers la magnifique Route des Vins d'Alsace !",
        "Préparez-vous à rouler sur des chemins pittoresques, à éviter des tonneaux, et à récolter un maximum de raisins sur votre chemin.",
        "Vous êtes actuellement à Mulhouse et votre destination ultime est la charmante ville de Strasbourg. Prêt à rouler ?",
        "Mais tout d'abord, laissez-moi vous expliquer la spécifité du bar à vin Le Tandem !",
        "Ce bar à vin est spécialisé dans la consommation de vin nature.",
        "Les vins natures sont des vins qui sont produits selon certaines règles garantissant le respect du raisin et des sols.",
        "C'est tout d'abord une nouvelle manière de faire du vin mais aussi de le déguster !",
        "Alors pourquoi ne pas venir tester l'expérience du vin nature dans le bar Le Tandem ?"
    ],
    [
        "Vous êtes arrivés à Guebwiller !",
        "Guebwiller est nichée au pied du Grand Ballon, la plus haute montagne des Vosges. Elle offre un cadre pittoresque avec ses collines et ses vignobles.",
        "Son cépage le plus connu est le Gewurztraminer, qui produit un vin très parfumé et doux."
    ],
    [
        "Vous êtes arrivés à Husseren-Les-Chateaux !",
        "Cette petite commune est entourée de vignobles et est réputée pour son château, qui offre une vue panoramique sur la région.",
        "Son cépage le plus connu est le Pinot Gris, qui produit un vin corsé et parfumé."
    ],
    [
        "Vous êtes arrivés à Colmar !",
        "Colmar est une ville pittoresque, connue pour ses maisons à colombages, ses canaux, et son ambiance romantique.",
        "Son cépage le plus connu est le Muscat, qui a un goût très fruité."
    ],
    [
        "Vous êtes arrivés à Kaysersberg !",
        "Kaysersberg est un village médiéval entouré de collines verdoyantes, avec un château en ruine offrant une vue panoramique.",
        "Son cépage le plus connu est le Gewurztraminer, qui produit un vin très parfumé et doux."
    ],
    [
        "Vous êtes arrivés à Ribeauvillé !",
        "Ribeauvillé est une cité médiévale avec des rues pavées, des maisons à colombages, et plusieurs châteaux.",
        "Son cépage le plus connu est le Pinot Noir, le seul cépage d'Alsace qui produit du vin rouge."
    ],
    [
        "Vous êtes arrivés à Kintzheim !",
        "Kintzheim est un village charmant avec un château, offrant une vue panoramique sur les vignobles et les montagnes.",
        "Son cépage le plus connu est le Riesling, il produit un vin assez léger avec un goût légérement épicé."
    ],
    [
        "Vous êtes arrivés à Sélestat !",
        "Sélestat est une ville historique avec un patrimoine architectural varié, dont la célèbre Bibliothèque Humaniste.",
        "Son cépage le plus connu est le Sylvaner, qui produit un vin sec souvent pétillant."
    ],
    [
        "Vous êtes arrivés à Dambach-La-Ville !",
        "Dambach-La-Ville est un village médiéval entouré de remparts, avec des maisons à colombages et des rues pittoresques.",
        "Son cépage le plus connu est le Pinot Blanc, qui produit un vin minéral plutôt sec."
    ],
    [
        "Vous êtes arrivés à Obernai !",
        "Obernai est une ville médiévale entourée de vignobles, avec des rues pavées et une atmosphère charmante. Elle allie l'histoire, la tradition et la gastronomie alsacienne.",
        "Son cépage le plus connu est le Riesling, il produit un vin assez léger avec un goût légérement épicé."
    ],
    [
        "Vous êtes arrivés à Strasbourg !",
        "Strasbourg, la capitale de l'Alsace, est une ville dynamique, riche en histoire et en architecture. Elle est connue pour sa magnifique cathédrale et son quartier de La Petite France.",
        "Son cépage le plus connu est le Pinot Gris, qui produit un vin corsé et très parfumé."
    ]
];

let indexDialog = 0;
let indexStep = 0;
let dialogBox;

document.addEventListener('DOMContentLoaded', function() {
    dialogBox = document.querySelector('.dialogBox');
});

document.addEventListener('click', function(event) {
    if (event.target == dialogBox)
        nextStep();
});

function nextStep() {
    if (indexStep < dialogs[indexDialog].length - 1) {
        indexStep++;
        dialogBox.innerText = dialogs[indexDialog][indexStep];
    } else {
        dialogBox.classList.remove('visible');
        setTimeout(() => {
            dialogBox.classList.add('hidden');
            makeAction(indexDialog);
            indexStep = 0;
            indexDialog++;
        }, 500);
    }
}

function showDialog() {
    if (indexDialog > 0) {
        gamePaused = true;
        hideGame();
        setTimeout(() => {
            showPauseMenu();
        }, 500);
    }
    dialogBox.classList.remove('hidden');
    setTimeout(() => {
        dialogBox.classList.add('visible')
    }, 50);
    dialogBox.innerText = dialogs[indexDialog][0];
}

function makeAction() {
    if (indexDialog == 0) {
        showGame();
        launchGame();
    } else {
        showGame();
    }
}

function hideGame() {
    let gameContent = document.querySelectorAll('.game');

    gameContent.forEach(element => {
        element.classList.remove('visible');
        setTimeout(() => {
            element.classList.add('hidden');
        }, 400);
    });
}

function showGame() {
    let gameContent = document.querySelectorAll('.game');

    gameContent.forEach(element => {
        element.classList.remove('hidden');
        setTimeout(() => {
            element.classList.add('visible')
        }, 50);
    });
}