// Affichage dynamique de détail du membre de l'équipage

// Récupération de l'ID du membre de l'équipage via l'URL
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

// Récupérer l'API avec fetch
fetch(`https://jasonquest-back.vercel.app/api/Argonautes/${id}`)
    .then((response) => response.json())
    .then((data) => {
        console.table(data);
        displayArgonaute(data);
    }
    )
    .catch((error) => {
        document.getElementById("argonaute-detail").innerHTML = "Erreur de chargement des données";
        console.log("erreur 404, sur ressource api:" + error);
    }
    );

// Afficher les détails du membre de l'équipage
function displayArgonaute(argonaute) {
    const argonauteDisplay = document.getElementById("argonaute-details");
    argonauteDisplay.innerHTML = "";
    argonauteDisplay.insertAdjacentHTML("afterbegin",
        `<div class="member-card">
        <h3>${argonaute.name}</h3>
        <p>${argonaute.age} ans</p>
        <p>originaire de ${argonaute.country}</p>
        <p>${argonaute.description}</p>
      </div>
      <button type="submit" class="delete-member">Supprimer</button>`);
      document.querySelector("title").innerHTML = `${argonaute.name}`;
        document.querySelector(".delete-member").addEventListener("click", () => {
            deleteArgonaute(argonaute._id);
        });
}

const deleteArgonaute = (id) => {
    fetch(`https://jasonquest-back.vercel.app/api/Argonautes/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => response.json())
        .then((res) => {
            window.location.href = "./index.html";
        })
}