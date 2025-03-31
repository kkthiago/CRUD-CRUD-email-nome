const login = document.getElementById("cadastroNE");

fetch("https://crudcrud.com/api/c250e0a678a2492699882e29b6ed0226/cadastro")
    .then(resposta => resposta.json())
    .then((cadastroNE) => {
        cadastroNE.forEach(cadastro => {
            const listItem = document.createElement("li");
            listItem.id = cadastro._id; 
            listItem.innerHTML = `${cadastro.nome}, ${cadastro.email} <button class="deletarUsuario">X</button>`;
            login.appendChild(listItem);
        });
    })
    .catch(erro => console.error("Erro ao buscar cadastro:", erro));

document.getElementById("cadastrar").addEventListener("click", () => {
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;

    fetch("https://crudcrud.com/api/c250e0a678a2492699882e29b6ed0226/cadastro", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ nome: nome, email: email })
    })
    .then(resposta => resposta.json())
    .then((cadastro) => {
        const listItem = document.createElement("li");
        listItem.id = cadastro._id; 
        listItem.innerHTML = `${cadastro.nome}, ${cadastro.email} <button class="deletarUsuario">X</button>`;
        login.appendChild(listItem);
    })
    .catch(erro => console.error("Erro ao cadastrar usuário:", erro));
});

// Deletar usuário
document.addEventListener("click", (event) => {
    if (event.target.classList.contains("deletarUsuario")) {
        const item = event.target.parentElement;
        const _id = item.id;

        fetch(`https://crudcrud.com/api/c250e0a678a2492699882e29b6ed0226/cadastro/${_id}`, {
            method: "DELETE"
        })
        .then(() => {
            item.remove(); // Remove o item da lista
        })
        .catch(erro => console.error("Erro ao deletar usuário:", erro));
    }
});
