const locations = [
    "Mulhouse",
    "Thann",
    "Guebwiller",
    "Rouffach",
    "Husseren-les-Chateaux",
    "Eguisheim",
    "Colmar",
    "Kaysersberg",
    "Riquewihr",
    "Ribeauvillé",
    "Bergheim",
    "Kintzheim",
    "Sélestat",
    "Dambach-La-Ville",
    "Barr",
    "Obernai",
    "Molsheim",
    "Strasbourg"
];

let score = 0;

setInterval(updateScore, 1000);

function updateScore() {
    if (score % 5 == 0 && score < locations.length * 5)
        document.getElementById('location').innerText = locations[score / 5];
    score++;
}
