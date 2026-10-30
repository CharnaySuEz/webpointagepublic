

/* =========================================================
   COLLABORATEUR
========================================================== */

function updateCollaborateurs() {

    const site =
        document.getElementById("site").value;

    const selectCollaborateur =
        document.getElementById("nom");

    selectCollaborateur.innerHTML =
        '<option value="">Sélectionner</option>';

    if (!site || !collaborateursParSite[site]) {
        return;
    }

    Object.keys(collaborateursParSite[site])
        .forEach(collab => {

            const option =
                document.createElement("option");

            option.value = collab;
            option.textContent = collab;

            selectCollaborateur.appendChild(option);

        });

    updateNomPrenom();
}

function updateNomPrenom() {

    const site =
        document.getElementById("site").value;

    const collaborateur =
        document.getElementById("nom").value;

    const matriculeField =
        document.getElementById("matricule");

    const nomFamilleField =
        document.getElementById("nomFamille");

    const mailField =
        document.getElementById("mail");

    if (
        site &&
        collaborateur &&
        collaborateursParSite[site] &&
        collaborateursParSite[site][collaborateur]
    ) {

        const data =
            collaborateursParSite[site][collaborateur];

        matriculeField.value =
            data.matricule;

        nomFamilleField.value =
            data.nom;

        mailField.value =
            data.mail;

    } else {

        matriculeField.value = "";
        nomFamilleField.value = "";

    }

}

