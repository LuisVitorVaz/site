// Faz a ligação com o HTML
var dadosList = document.getElementById("dados-list");
var cont = 0;
var database = firebase.database();
var dadosRef = database.ref("data");
let blockElementsActive = false;

dadosRef.once("value")
  .then(function(snapshot) {
    if (!snapshot.exists()) {
      console.log("Nenhum dado encontrado.");
    } else {
      snapshot.forEach(function(childSnapshot) {
        // Acessa o valor da temperatura
        var temperature = childSnapshot.child("temperature").val();
        console.log(temperature);
        var dia = childSnapshot.child("data").val();
        console.log(temperature);
        var hora = childSnapshot.child("hora").val();
        console.log(temperature);

        // Chama a função para inserir os dados na tabela
        inserir_dados(dia, hora, temperature);

        const evento = new CustomEvent('atualizarDataHora', { detail: { dia, hora } });
        document.dispatchEvent(evento);
      });
    }
  })
  .catch(function(error) {
    console.error("Erro ao recuperar dados: " + error.message);
  });

// Escuta alterações contínuas no banco de dados
dadosRef.on("value", function(snapshot) {
  // Limpa a tabela antes de adicionar os novos dados
  dadosList.innerHTML = "";

  snapshot.forEach(function(childSnapshot) {
    // Acessa o valor da temperatura
    var temperature = childSnapshot.child("temperature").val();

    // Valores fictícios para dia e hora
    var dia = "01/01/2023";
    var hora = "12:00";

    // Chama a função para inserir os dados na tabela
    inserir_dados(dia, hora, temperature);
  });
});

function inserir_dados(dia, hora, temperature) {
  var newRow = dadosList.insertRow();
  // Adiciona células com os valores correspondentes
  newRow.insertCell(0).textContent = ++cont; // ID
  newRow.insertCell(1).textContent = dia;
  newRow.insertCell(2).textContent = hora;
  newRow.insertCell(3).textContent = temperature;
}
