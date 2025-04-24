document.getElementById('algoritmo-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const tipo = document.getElementById('tipo-attivita').value;
  const num = parseInt(document.getElementById('numero-veicoli').value);
  const risultati = document.getElementById('risultati');

  risultati.innerHTML = `<p>Attrezzature consigliate per <strong>${tipo}</strong> con circa <strong>${num}</strong> veicoli/mese.</p>`;
  // Logica semplificata da ampliare
});

const prodotti = [
  { nome: "Smontagomme Moto", categoria: "moto", img: "img/smontagomme-moto.jpg", descrizione: "Ideale per officine moto." },
  { nome: "Equilibratrice Auto", categoria: "auto", img: "img/equilibratrice-auto.jpg", descrizione: "Perfetta per auto e trasporto leggero." },
  // Aggiungi altri prodotti qui
];

function mostraProdotti(lista) {
  const container = document.getElementById('lista-prodotti');
  container.innerHTML = '';
  lista.forEach(prod => {
    const div = document.createElement('div');
    div.className = 'prodotto';
    div.innerHTML = `<img src=\"${prod.img}\" alt=\"${prod.nome}\" style=\"max-width:100%\"/><h3>${prod.nome}</h3><p>${prod.descrizione}</p>`;
    container.appendChild(div);
  });
}

document.getElementById('filtro-input').addEventListener('input', function (e) {
  const valore = e.target.value.toLowerCase();
  const filtrati = prodotti.filter(p => p.nome.toLowerCase().includes(valore) || p.categoria.toLowerCase().includes(valore));
  mostraProdotti(filtrati);
});

mostraProdotti(prodotti);
let listaCompleta = [];

fetch('data/prodotti.json')
  .then(response => response.json())
  .then(data => {
    listaCompleta = data;
    mostraProdotti(listaCompleta);
  });

// Funzione di filtro input
document.getElementById('filtro-input').addEventListener('input', function (e) {
  const valore = e.target.value.toLowerCase();
  const filtrati = listaCompleta.filter(p => p.nome.toLowerCase().includes(valore) || p.categoria.toLowerCase().includes(valore));
  mostraProdotti(filtrati);
});

// Listener modulo interno
document.getElementById('form-prodotti').addEventListener('submit', function (e) {
  e.preventDefault();
  const nome = document.getElementById('nome-prod').value;
  const categoria = document.getElementById('categoria-prod').value;
  const descrizione = document.getElementById('descrizione-prod').value;
  const img = document.getElementById('immagine-prod').value;

  const nuovaLista = caricaProdotti().filter(p => p.nome !== nome);
  nuovaLista.push({ nome, categoria, descrizione, img });
  salvaProdotti(nuovaLista);
  
  alert('Prodotto aggiunto o aggiornato!');
  this.reset();
});

// All'avvio, carica prodotti
mostraProdotti(caricaProdotti());
// Nascondi la sezione di gestione se non c'è ?admin=1 nell'URL
if (!window.location.search.includes('admin=1')) {
  const gestione = document.getElementById('modulo-gestione');
  if (gestione) {
    gestione.style.display = 'none';
  }
}
