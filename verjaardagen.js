// { naam: "Naam", dag: DD, maand: MM }
// Voeg hier nieuwe verjaardagen toe
const verjaardagen = [
  { naam: "Jan", dag: 3, maand: 3 },
  { naam: "Piet", dag: 17, maand: 6 },
  { naam: "Lisa", dag: 22, maand: 10 },
  { naam: "Alex", dag: 5, maand: 1 },
  { naam: "Sofie", dag: 14, maand: 8 }
];

function toonKomendeVerjaardagen() {
  const lijstEl = document.getElementById("komendeLijst");
  lijstEl.innerHTML = "";

  const vandaag = new Date();
  const ditJaar = vandaag.getFullYear();

  // Voeg datum object toe en corrigeer naar volgend jaar als al geweest
  const verjaardagenMetDatum = verjaardagen.map(v => {
    let datum = new Date(ditJaar, v.maand - 1, v.dag);
    if (datum < vandaag) {
      datum.setFullYear(ditJaar + 1);
    }
    return { ...v, datum };
  });

  // Sorteer op datum
  verjaardagenMetDatum.sort((a, b) => a.datum - b.datum);

  // Toon de eerstvolgende 7
  verjaardagenMetDatum.slice(0,7).forEach(v => {
    const li = document.createElement("li");
    const opties = { day: 'numeric', month: 'long' };
    li.textContent = `${v.naam} – ${v.datum.toLocaleDateString('nl-NL', opties)}`;
    lijstEl.appendChild(li);
  });
}

// roep deze functie aan bij init
toonKomendeVerjaardagen();
