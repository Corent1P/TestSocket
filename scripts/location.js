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

function updateScore() {
    if (score % 10 == 0 && score < locations.length * 10)
        document.getElementById('location').innerText = locations[score / 10];
    score++;
}

function launchGame()
{
    setInterval(updateScore, 1000);
}
