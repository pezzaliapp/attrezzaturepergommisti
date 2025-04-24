let listaCompleta = JSON.parse(localStorage.getItem('prodotti')) || [];

// Funzione per mostrare i prodotti a schermo
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

// Gestione invio modulo prodotti
document.getElementById('form-prodotti').addEventListener('submit', function (e) {
  e.preventDefault();
  const nome = document.getElementById('nome-prod').value;
  const categoria = document.getElementById('categoria-prod').value;
  const descrizione = document.getElementById('descrizione-prod').value;
  const img = document.getElementById('immagine-prod').value;

  // Rimuove se già esistente, poi aggiunge
  listaCompleta = listaCompleta.filter(p => p.nome !== nome);
  listaCompleta.push({ nome, categoria, descrizione, img });

  localStorage.setItem('prodotti', JSON.stringify(listaCompleta));
  mostraProdotti(listaCompleta);

  alert('✅ Prodotto aggiunto o aggiornato!');
  this.reset();
});

// Carica al primo avvio
mostraProdotti(listaCompleta);

// Nascondi gestione se URL non contiene ?admin=1
if (!window.location.search.includes('admin=1')) {
  const gestione = document.getElementById('modulo-gestione');
  if (gestione) gestione.style.display = 'none';
}
