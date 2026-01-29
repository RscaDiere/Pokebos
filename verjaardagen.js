// Huidige maand en jaar
let vandaag = new Date();
let huidigeMaand = vandaag.getMonth(); // 0-11
let huidigJaar = vandaag.getFullYear();

// Kalender-elementen
const maandJaarEl = document.getElementById("maandJaar");
const dagenEl = document.getElementById("dagen");

// Functie om de kalender te tonen
function toonKalender(maand, jaar) {
  dagenEl.innerHTML = "";

  // Toon maand en jaar
  const opties = { month: 'long', year: 'numeric' };
  maandJaarEl.textContent = new Date(jaar, maand).toLocaleDateString('nl-NL', opties);

  // Eerste dag van de maand
  const eersteDag = new Date(jaar, maand, 1);
  const laatsteDag = new Date(jaar, maand + 1, 0); // laatste dag van maand
  const aantalDagen = laatsteDag.getDate();

  // Bepaal op welke weekdag de maand start (Ma = 1 t/m Zo = 7)
  let startWeekdag = eersteDag.getDay(); // 0 (zo) - 6 (za)
  startWeekdag = startWeekdag === 0 ? 7 : startWeekdag; // Zondag = 7

  // Voeg lege vakjes toe voor de eerste week
  for (let i = 1; i < startWeekdag; i++) {
    const leeg = document.createElement("div");
    dagenEl.appendChild(leeg);
  }

  // Voeg dagen toe
  for (let dag = 1; dag <= aantalDagen; dag++) {
    const dagEl = document.createElement("div");
    dagEl.classList.add("dag");
    dagEl.innerHTML = `<strong>${dag}</strong>`;

    // Check of het vandaag is
    if (dag === vandaag.getDate() && maand === vandaag.getMonth() && jaar === vandaag.getFullYear()) {
      dagEl.classList.add("vandaag");
    }

    // Check of er een verjaardag is
    verjaardagen.forEach(v => {
      if (v.dag === dag && v.maand - 1 === maand) {
        const badge = document.createElement("div");
        badge.classList.add("verjaardag");
        badge.textContent = v.naam;
        dagEl.appendChild(badge);
      }
    });

    dagenEl.appendChild(dagEl);
  }
}

// Navigatiefuncties
function vorigeMaand() {
  huidigeMaand--;
  if (huidigeMaand < 0) {
    huidigeMaand = 11;
    huidigJaar--;
  }
  toonKalender(huidigeMaand, huidigJaar);
}

function volgendeMaand() {
  huidigeMaand++;
  if (huidigeMaand > 11) {
    huidigeMaand = 0;
    huidigJaar++;
  }
  toonKalender(huidigeMaand, huidigJaar);
}

// Init
toonKalender(huidigeMaand, huidigJaar);

// Toon komende verjaardagen (functie uit verjaardagen.js)
toonKomendeVerjaardagen();
