const myModal = new bootstrap.Modal("#register-modal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

//Executa a função ao carregar a página:
checkLogged();

//Função para criar conta
document.getElementById("create-user-form").addEventListener("submit", function(e) {
    e.preventDefault() //sem chamada a API ou back-end

    const email = document.getElementById("email-create-input").value;
    const password = document.getElementById("password-create-input").value;

    if (email.length < 5) {
        alert("Por favor, informe um e-mail valido");
        return;
    }

    if (password.length < 4) {
        alert("Por favor, informe uma senha com pelo menos 4 caracteres");
        return;
    }

    saveAccount ({
        email: email,
        password: password,
        transactions: []
});

    myModal.hide(); //oculta modal após inserção de dados válidos

    alert("Conta criada com sucesso!");
});


document.getElementById("login-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const email = document.getElementById("email-login-input").value;
    const password = document.getElementById("password-login-input").value;
    const checkSession = document.getElementById("session-check").checked;

    const account = getAccount(email);

    //Verifica se há usuário com o email informado:
    if(!account) {
        alert("Ooops, verifique o usuário ou senha e tente novamente");
        return;
    }

    //Verifica se a senha informada bate com a senha do usuário cadastrado
    if(account) {
        if(account.password !== password) {
            alert("Ooops, verifique o usuário ou senha e tente novamente");
            return;
        }

        //chama a função para salvar a sessão logada ou não:
        saveSession(email, checkSession);
    
        window.location.href = "home.html";
    }
});


function checkLogged() {
    //Mantém a sessão salva com os dados do usuário encontrados no localstorage:
    if(session) {
        sessionStorage.setItem("logged", session);
        logged = session;
    }

    //Se houver uma sessão salva, redireciona para home:
    if(logged) {
        saveSession(logged, session);
        window.location.href = "home.html";
    }
}


//Função para salvar informações da conta no localstorage do navegador
function saveAccount(data) {
    localStorage.setItem(data.email, JSON.stringify(data));
    //console.log(data);
}


function saveSession(email, saveSession) {
    //dados permanecem na memória do navegador, mesmo se o navegador/aba/guia for fechado:
    if(saveSession) {
        localStorage.setItem("session", email);        
    }

    //dados são apagados após a sessão ser encerrada:
    sessionStorage.setItem("logged", email);
}


function getAccount(key) {
    const account = localStorage.getItem(key);
    
    if(account) {
        return JSON.parse(account); //volta JSON de string para objeto
    }

    return "";
}