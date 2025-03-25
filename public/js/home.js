const myModal = new bootstrap.Modal("#transaction-modal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");
let data = {
    transactions: []
};

document.getElementById("button-logout").addEventListener("click", logout);
document.getElementById("button-all-transactions").addEventListener("click", function() {
    window.location.href = "transactions.html";
});

//Executa a função ao carregar a página:
checkLogged();
getTotalTransactions();
getcCashIn();
getcCashOut();

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

    getTotalTransactions();
    getcCashIn();
    getcCashOut();
})

function getcCashIn() {
    const transactions = data.transactions;
    const cashIn = transactions.filter((item) => (item.type === "1")); //pega todas as transações e filtra só as que forem do tipo 1 (entrada);

    if(cashIn.length) {
        let cashInHtml = ``;
        let limit = 0;

        //Verifica se o array tem mais de 5 itens e limita para 5:
        if(cashIn.length > 5) {
            limit = 5;

        // Verifica se o array tem menos de 5 itens e limita para o tamanho do array:
        } else {
            limit = cashIn.length;
        }

        for (let index = 0; index < limit; index++) {
            cashInHtml += `
               <div class="row mb-4">
                    <div class="col-12">
                        <h3 class="fs-2">R$${cashIn[index].value.toFixed(2)}</h3>
                        <div class="container p-0">
                            <div class="row">
                              <div class="col-12 col-md-8">
                                <p class="fs-4">${cashIn[index].description}</p>
                              </div>
                              <div class="col-12 col-md-3 d-flex justify-content-end">
                                ${cashIn[index].date}
                              </div>
                            </div>
                        </div>
                    </div>
                </div>
            `            
        }

        // mostrar renderiização no HTML:
        document.getElementById("cash-in-list").innerHTML = cashInHtml;
    }
}


function getcCashOut() {
    const transactions = data.transactions;
    const cashOut = transactions.filter((item) => (item.type === "2")); //pega todas as transações e filtra só as que forem do tipo 2 (saídas);

    if(cashOut.length) {
        let cashOutHtml = ``;
        let limit = 0;

        //Verifica se o array tem mais de 5 itens e limita para 5:
        if(cashOut.length > 5) {
            limit = 5;

        // Verifica se o array tem menos de 5 itens e limita para o tamanho do array:
        } else {
            limit = cashOut.length;
        }

        for (let index = 0; index < limit; index++) {
            cashOutHtml += `
               <div class="row mb-4">
                    <div class="col-12">
                        <h3 class="fs-2">R$${cashOut[index].value.toFixed(2)}</h3>
                        <div class="container p-0">
                            <div class="row">
                              <div class="col-12 col-md-8">
                                <p class="fs-4">${cashOut[index].description}</p>
                              </div>
                              <div class="col-12 col-md-3 d-flex justify-content-end">
                                ${cashOut[index].date}
                              </div>
                            </div>
                        </div>
                    </div>
                </div>
            `            
        }

        // mostrar renderiização no HTML:
        document.getElementById("cash-out-list").innerHTML = cashOutHtml;
    }
}


function getTotalTransactions() {
    let totalTransactions = 0;
    const transactions = data.transactions;
    
    transactions.forEach((item) => {
        if (item.type === "1") {
            totalTransactions += item.value;
        } else {
            totalTransactions -= item.value;
        }
});

    document.getElementById("total-transactions").innerHTML = `R$${totalTransactions.toFixed(2)}`;
}


// Função para salvar uma transação no localstorage:
function saveTransaction(data) {
    localStorage.setItem(data.email, JSON.stringify(data));
}   

function logout() {
    sessionStorage.removeItem("logged");
    localStorage.removeItem("session");
    window.location.href = "index.html";
}