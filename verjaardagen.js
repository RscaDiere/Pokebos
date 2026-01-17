<script>
let huidigeDatum = new Date();

function tekenKalender() {
  const dagenEl = document.getElementById("dagen");
  dagenEl.innerHTML = "";

  const jaar = huidigeDatum.getFullYear();
  const maand = huidigeDatum.getMonth();

  document.getElementById("maandJaar").textContent =
    huidigeDatum.toLocaleDateString("nl-NL", { month: "long", year: "numeric" });

  const eersteDag = new Date(jaar, maand, 1).getDay();
  const start = (eersteDag + 6) % 7; // maandag = 0
  const dagenInMaand = new Date(jaar, maand + 1, 0).getDate();

  for (let i = 0; i < start; i++) {
    dagenEl.appendChild(document.createElement("div"));
  }

  for (let dag = 1; dag <= dagenInMaand; dag++) {
    const div = document.createElement("div");
    div.className = "dag";
    div.innerHTML = `<strong>${dag}</strong>`;

    const vandaag = new Date();
    if (
      dag === vandaag.getDate() &&
      maand === vandaag.getMonth() &&
      jaar === vandaag.getFullYear()
    ) {
      div.classList.add("vandaag");
    }

    verjaardagen.forEach(v => {
      if (v.dag === dag && v.maand === maand + 1) {
        const span = document.createElement("div");
        span.className = "verjaardag";
        span.textContent = "🎂 " + v.naam;
        div.appendChild(span);
      }
    });

    dagenEl.appendChild(div);
  }
}

function vorigeMaand() {
  huidigeDatum.setMonth(huidigeDatum.getMonth() - 1);
  tekenKalender();
}

function volgendeMaand() {
  huidigeDatum.setMonth(huidigeDatum.getMonth() + 1);
  tekenKalender();
}

tekenKalender();
</script>
