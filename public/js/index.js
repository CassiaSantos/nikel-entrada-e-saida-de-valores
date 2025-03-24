const myModal = new bootstrap.Modal("#register-modal")

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

//Função para salvar informações da conta no localstorage do navegador
function saveAccount(data) {
    localStorage.setItem(data.email, JSON.stringify(data));
}