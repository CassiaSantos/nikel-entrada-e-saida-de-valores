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

    console.log(data);
}