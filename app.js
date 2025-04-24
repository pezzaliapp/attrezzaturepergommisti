// Carica da localStorage o crea lista vuota
let listaCompleta = JSON.parse(localStorage.getItem('prodotti')) || [];

// Mostra prodotti nel catalogo
function mostraProdotti(lista) {
  const container = document.getElementById('lista-prodotti');
  container.innerHTML = '';
  lista.forEach(prod => {
    const div = document.createElement('div');
    div.className = 'prodotto';
    div.innerHTML = `
      <img src="${prod.img}" alt="${prod.nome}" style="max-width:100%; max-height:150px; object-fit:contain;" />
      <h3>${prod.nome}</h3>
      <p>${prod.descrizione}</p>
    `;
    container.appendChild(div);
  });
}

// Filtro live
document.getElementById('filtro-input').addEventListener('input', function (e) {
  const valore = e.target.value.toLowerCase();
  const filtrati = listaCompleta.filter(p =>
    p.nome.toLowerCase().includes(valore) ||
    p.categoria.toLowerCase().includes(valore)
  );
  mostraProdotti(filtrati);
});

// Aggiunta/Aggiornamento prodotto
document.getElementById('form-prodotti').addEventListener('submit', function (e) {
  e.preventDefault();
  const nome = document.getElementById('nome-prod').value;
  const categoria = document.getElementById('categoria-prod').value;
  const descrizione = document.getElementById('descrizione-prod').value;
  const img = document.getElementById('immagine-prod').value;

  listaCompleta = listaCompleta.filter(p => p.nome !== nome);
  listaCompleta.push({ nome, categoria, descrizione, img });

  localStorage.setItem('prodotti', JSON.stringify(listaCompleta));
  mostraProdotti(listaCompleta);

  alert('✅ Prodotto aggiunto o aggiornato!');
  this.reset();
});

// Esporta in JSON
function esportaProdotti() {
  const dati = localStorage.getItem('prodotti');
  const blob = new Blob([dati], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = 'prodotti.json';
  link.click();

  URL.revokeObjectURL(url);
}

// Importa da JSON
document.getElementById('file-import').addEventListener('change', function (e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (event) {
    try {
      const nuoviProdotti = JSON.parse(event.target.result);
      if (Array.isArray(nuoviProdotti)) {
        localStorage.setItem('prodotti', JSON.stringify(nuoviProdotti));
        listaCompleta = nuoviProdotti;
        mostraProdotti(listaCompleta);
        alert('✅ Prodotti importati con successo!');
      } else {
        alert('❌ Formato JSON non valido.');
      }
    } catch (err) {
      alert('❌ Errore nel file JSON.');
    }
  };
  reader.readAsText(file);
});

// Algoritmo base di suggerimento
document.getElementById('algoritmo-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const tipo = document.getElementById('tipo-attivita').value;
  const num = parseInt(document.getElementById('numero-veicoli').value);
  const risultati = document.getElementById('risultati');

  risultati.innerHTML = `<p>Attrezzature consigliate per <strong>${tipo}</strong> con circa <strong>${num}</strong> veicoli/mese.</p>`;
});

// Nascondi modulo interno se non ?admin=1
if (!window.location.search.includes('admin=1')) {
  const gestione = document.getElementById('modulo-gestione');
  const tools = document.getElementById('tools-prodotti');
  if (gestione) gestione.style.display = 'none';
  if (tools) tools.style.display = 'none';
}

// Mostra prodotti iniziali
mostraProdotti(listaCompleta);
