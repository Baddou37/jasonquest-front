// Gérer l'affichage des cartes

// Récupérer l'API avec fetch
fetch("https://jasonquest-back.vercel.app/api/Argonautes")
    .then((response) => response.json())
    .then((data) => {console.table(data),
    displayArgonautes(data)
})
    .catch((error) => {
    document.getElementById("argonautes-list").innerHTML = "Erreur de chargement des données";
    console.log("erreur 404, sur ressource api:" + error);
    });

// Afficher les cartes des Argonautes
function displayArgonautes(argonautes) {
    const argonautesDisplay = document.getElementById("argonautes-list");
    argonautesDisplay.innerHTML = "";
    for (let argonaute of argonautes) {
        argonautesDisplay.innerHTML += `<div class="card"><a href="./argonaute.html?id=${argonaute._id}" class="member-card">
        <h3>${argonaute.name}</h3>
        <p>${argonaute.age} ans</p>
        <p>originaire de ${argonaute.country}</p>
        <p>${argonaute.description}</p>
        </a>
        <button type="submit" class="delete-card">X</button>
        </div>`;
    }
    displayArgonautesCount(argonautes);
    const deleteCard = document.querySelectorAll(".delete-card");
    for (let i = 0; i < deleteCard.length; i++) {
        deleteCard[i].addEventListener("click", () => {
            console.log(argonautes[i].name,argonautes[i]._id);
            deleteArgonaute(argonautes[i]._id);
        });
    }
}

// Afficher le nombre d'Argonautes
function displayArgonautesCount(argonautes) {
    const displayArgonautesCount = document.querySelector(".argonautes-number");
    displayArgonautesCount.insertAdjacentHTML("afterbegin", `<p>Nombre d'Argonautes : ${argonautes.length}</p>`);
}

// Supprimer un Argonaute
const deleteArgonaute = (id) => {
    fetch(`https://jasonquest-back.vercel.app/api/Argonautes/${id}`, {
        method: "DELETE",
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        window.location.reload();
    })
    .catch((error) => {
        console.log("erreur 404, sur ressource api:" + error);
    });
};

// Vérifier les données du formulaire
// initialisation de l'object argonaute
let argonaute = {
    name: "",
    age: "",
    country: "",
    description: ""
};

// Stock si les inputs sont valides
let isValidInputs = {
    name: false,
    age: false,
    country: false,
    description: false
};

// Définition des RegExp pour les inputs
const regExpList = {
    name: /^[a-zA-ZÀ-ÿ\s]{2,20}$/,
    age: /^[0-9]{1,3}$/,
    country: /^[a-zA-ZÀ-ÿ\s]{2,20}$/,
    description: /^[a-zA-ZÀ-ÿ\s]{2,100}$/
};

// Vérification des inputs
function checkInputs (input, regex, id) {
    if (regex.test(input.value)) {
        input.style.border = "2px solid Green";
        document.getElementById(`${id}ErrorMsg`).innerText = "";
        argonaute[id] = input.value;
        isValidInputs[id] = true;
    } else {
        input.style.border = "2px solid Red";
        isValidInputs[id] = false;
        if (id == "name") {
            document.getElementById(`${id}ErrorMsg`).innerText =
                'Le format renseignée n\'est pas valide (ex : "Alexios")';
        } else if (id == "age") {
            document.getElementById(`${id}ErrorMsg`).innerText =
                'Saisissez un nombre (ex : "25")';
        } else if (id == "country") {
            document.getElementById(`${id}ErrorMsg`).innerText =
                'Le format renseignée n\'est pas valide (ex : "Grèce")';
        } else if (id == "description") {
            document.getElementById(`${id}ErrorMsg`).innerText =
                'Le format renseignée n\'est pas valide (ex : "Alexios est un Argonaute")';
        }
    }
}

// Vérifier les inputs au moment de la saisie à l'aide d'une boucle
for(let input of document.querySelectorAll(".new-member-form")) {
    input.addEventListener("input", (e) => {
        checkInputs(e.target, regExpList[e.target.id], e.target.id);
    });
}



// Récupérer les données du formulaire
const form = document.querySelector(".new-member-form");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const name = formData.get("name");
    const age = formData.get("age");
    const country = formData.get("country");
    const description = formData.get("description");
    const argonaute = {
        name,
        age,
        country,
        description,
    };
    console.log("New Argonaute", argonaute);
    form.reset();
    postArgonaute(argonaute);
});

// Envoyer les données du formulaire
const postArgonaute = (argonaute) => {
    fetch("https://jasonquest-back.vercel.app/api/Argonautes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(argonaute),
    })
    .then((response) => response.json())
    .then((res) => {
        window.location.reload();
    })
    .catch((error) => {
        console.log("erreur 404, sur ressource api:" + error);
    });
};

