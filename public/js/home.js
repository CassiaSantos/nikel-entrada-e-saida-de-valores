const myModal = new bootstrap.Modal("#transaction-modal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");
let data = {
    transactions: []
}

//Executa a função ao carregar a página:
checkLogged();


function checkLogged() {
    //Mantém a sessão salva com os dados do usuário encontrados no localstorage:
    if(session) {
        sessionStorage.setItem("logged", session);
        logged = session;
    }

    //Se usuário não estiver logado, o redireciona para index.html para que seja feito o cadastro/login:
    if(!logged) {
        window.location.href = "index.html";
        return;
    }

    const dataUser = localStorage.getItem(logged);
    if(dataUser) {
        data = JSON.parse(dataUser);
    }
}

//Adiciona um lancamento na tabela:
document.getElementById("transaction-form").addEventListener("submit", function(e) {
    e.preventDefault(); //previnir comportamento padrão do form de redirecionar para outra página;

    const descriptionTransaction = document.getElementById("description-transaction-input").value;
    const valueTransaction = parseFloat(document.getElementById("value-transaction-input").value); //pega o valor do input e transforma em float para que seja possível fazer somas;
    const dateTransaction = document.getElementById("date-transaction-input").value;
    const typeTransaction = document.querySelector('input[name="type-input"]:checked').value; //pega o valor de um input que está com nome "type-input" que estiver marcado com o checked;

    data.transactions.unshift({ //uso de unshift para adicionar um item no inicio da lista; push adiciona no fim da lista;
        description: descriptionTransaction,
        value: valueTransaction,
        date: dateTransaction,
        type: typeTransaction
    });

    saveTransaction(data);
    alert("Lançamento adicionado com sucesso!");
    e.target.reset(); //limpa o formulário;
    myModal.hide(); //fecha o modal;
})


// Função para salvar uma transação no localstorage:
function saveTransaction(data) {
    localStorage.setItem(data.email, JSON.stringify(data));
}   

document.getElementById("button-logout").addEventListener("click", logout);

function logout() {
    sessionStorage.removeItem("logged");
    localStorage.removeItem("session");

    window.location.href = "index.html";
}