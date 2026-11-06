
/* =========================================================
   GENERATION JSON
========================================================== */

function generateAndSendJSON(button) {

    // check le nombre de TR

    const nbTR = document.getElementById("nbrTicketrestau").value;

    if (Number(nbTR) !== 5) {
        const confirmation = confirm(
            `Attention : vous avez saisi ${nbTR} TR au lieu de 5.\n\nConfirmez-vous cette valeur ?`
        );

        if (!confirmation) {
            return; // Quitte la méthode
        }
    }

    // Suite du traitement
    console.log("Traitement poursuivi...");



    // Désactive le bouton immédiatement
    button.disabled = true;
    button.textContent = "Génération en cours...";

    const totalWeekMinutes =
        calculateCurrentWeekMinutes();

    const motifDepassement =
        document
            .getElementById("motifDepassement")
            ?.value
            ?.trim();

    /* Contrôle > 48 h semaine */

    if (
        totalWeekMinutes > (48 * 60) &&
        !motifDepassement
    ) {
        alert(
            "Le motif de dépassement est obligatoire au-delà de 48 h par semaine."
        );
        button.disabled = false;
        button.textContent = "Générer la feuille de temps";
        return;
    }

    /* Contrôle > 10 h jour */

    for (const dayTable of document.querySelectorAll(".day-table")) {

        const dayMinutes =
            calculateDayHours(dayTable);

        if (dayMinutes > 600) {

            const dayName =
                dayTable
                    .querySelector("h5")
                    ?.textContent
                    ?.trim();

            const motifJournalier =
                dayTable
                    .querySelector(".daily-overtime-reason")
                    ?.value
                    ?.trim();

            if (!motifJournalier) {

                alert(
                    `Le motif de dépassement est obligatoire pour ${dayName} (plus de 10 h travaillées).`
                );
                button.disabled = false;
                button.textContent = "Générer la feuille de temps";

                return;
            }
        }
    }


    const data = {

        FeuillePointage: {

            InfosGenerales: {

                Version: VERSION,

                Annee:
                    document
                        .getElementById("annee")
                        .value,

                Semaine:
                    document
                        .getElementById("semaine")
                        .value,

                Lundi:
                    document
                        .getElementById("lundi")
                        .value,

                Dimanche:
                    document
                        .getElementById("dimanche")
                        .value,
                Site:
                    document
                        .getElementById("site")
                        .value,

                Matricule:
                    document
                        .getElementById("matricule")
                        .value,

                Nom:
                    document
                        .getElementById("nomFamille")
                        .value,

                Prenom:
                    document
                        .getElementById("nom")
                        .value,

                Mail: document
                    .getElementById("mail")
                    .value,

                TotalHeuresSemaines: document.getElementById("weekTotalHours").textContent.trim() || null,

            },

            Jours: {}

        }

    };


    jours.forEach(jour => {

        const table =
            Array
                .from(
                    document.querySelectorAll(
                        ".day-table"
                    )
                )
                .find(
                    day =>
                        day
                            .querySelector("h5")
                            ?.textContent
                            .trim() === jour
                );


        if (!table) {
            return;
        }


        const rows =
            table.querySelectorAll(
                "tbody tr"
            );


        data
            .FeuillePointage
            .Jours[jour] = [];


        rows.forEach(row => {

            const start =
                row.cells[0]
                    .querySelector(
                        "input, select"
                    )
                    ?.value ||
                null;


            const end =
                row.cells[1]
                    .querySelector(
                        "input, select"
                    )
                    ?.value ||
                null;


            const selectMotif =
                row.cells[2]
                    .querySelector(".motif-select");

            const inputMotifLibre =
                row.cells[2]
                    .querySelector(".motif-libre");

            const motif =
                selectMotif?.value === "AUTRE..."
                    ? inputMotifLibre?.value || null
                    : selectMotif?.value || null;


            const type =
                row.cells[3]
                    .querySelector(
                        "input, select"
                    )
                    ?.value ||
                null;


            data
                .FeuillePointage
                .Jours[jour]
                .push({

                    HeureDebut: start,
                    HeureFin: end,
                    Motif: motif,
                    Type: type

                });

        });

    });


    /* -----------------------------------------------------
       ASTREINTE
    ----------------------------------------------------- */

    const astreinteZone =
        document.getElementById(
            "astreinteZone"
        );


    if (
        astreinteZone.style.display !==
        "none"
    ) {

        const astreinteRows =
            document
                .getElementById(
                    "astreinteTable"
                )
                .querySelectorAll(
                    "tbody tr"
                );


        const encadrement =
            astreinteRows[0]
                .querySelectorAll(
                    "input"
                );


        const intervention =
            astreinteRows[1]
                .querySelectorAll(
                    "input"
                );


        const labels = [
            "OET_JT",
            "OET_JNT",
            "TSM_JT",
            "TSM_JNT"
        ];


        data
            .FeuillePointage
            .Astreinte = {

            DateDebut:
                document
                    .getElementById(
                        "astreinteDateDebut"
                    )
                    .value,

            HeureDebut:
                document
                    .getElementById(
                        "astreinteHeureDebut"
                    )
                    .value,

            DateFin:
                document
                    .getElementById(
                        "astreinteDateFin"
                    )
                    .value,

            HeureFin:
                document
                    .getElementById(
                        "astreinteHeureFin"
                    )
                    .value,

            Encadrement: {},

            Intervention: {}

        };


        labels.forEach(
            (label, index) => {

                data
                    .FeuillePointage
                    .Astreinte
                    .Encadrement[label] =
                    encadrement[index]
                        .value ||
                    null;


                data
                    .FeuillePointage
                    .Astreinte
                    .Intervention[label] =
                    intervention[index]
                        .value ||
                    null;

            }
        );

    }


    /* -----------------------------------------------------
       INDEMNITES
    ----------------------------------------------------- */

    console.log(document
        .getElementById(
            "nbrTicketrestau"
        )
        .value)

    data
        .FeuillePointage
        .Indemnites = {

        IndemniteRepasChantier:
            document
                .getElementById(
                    "nbrRepasChantier"
                )
                .value ||
            null,


        IndemnitePanierJour:
            document
                .getElementById(
                    "nbrPaniersJours"
                )
                .value ||
            null,


        TicketsRestaurants:
            document
                .getElementById(
                    "nbrTicketrestau"
                )
                .value ||
            null,


        GrandDeplacement:
            document
                .getElementById(
                    "nbrGdDeplacement"
                )
                .value ||
            null

    };
    /* =========================================================
   Motid dépassement
========================================================= */

    data.FeuillePointage.Depassements = {
        Depassement48h: null,
        Depassement10h: {}
    };


    if (totalWeekMinutes > 48 * 60) {

        data.FeuillePointage.Depassements.Depassement48h =
            document.getElementById("motifDepassement")?.value || null;

    }

    jours.forEach(jour => {

        const table = [...document.querySelectorAll(".day-table")]
            .find(day =>
                day.querySelector("h5")?.textContent.trim() === jour
            );

        if (!table) {
            return;
        }

        const dayMinutes =
            calculateDayHours(table);

        if (dayMinutes > 600) {

            const motif =
                table.querySelector(
                    ".daily-overtime-reason"
                )?.value;

            data.FeuillePointage.Depassements.Depassement10h[jour] = {

                Date:
                    getDateForDay(jour),

                Motif:
                    motif || null

            };
        }

    });


    const jsonString =
        JSON.stringify(
            data,
            null,
            2
        );


    console.log(
        jsonString
    );


    envoyerVersPowerAutomate(
        jsonString
    );

    setTimeout(() => {
        button.disabled = false;
        button.textContent = "Générer la feuille de temps";
    }, 15000);

}


/* =========================================================
   POWER AUTOMATE
========================================================== */

async function envoyerVersPowerAutomate(data) {

    const environnement = document.getElementById("environment").value;


    let url;

    if (environnement === "TEST") {
        url = "https://defaultf4a12867922d4b9dbb859ee7898512.a0.environment.api.powerplatform.com:443/powerautomate/automations/direct/cu/06/workflows/db4272c898ac4da78e5b58415adf4f02/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=TPUWRC8qIDl9T78yk8Mp1y9gBwIlO5psVO09wvXRrqw"

    } else if (environnement === "PROD") {
        url = "https://defaultf4a12867922d4b9dbb859ee7898512.a0.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/e223bacb04b244d7849c8530a8fa85a5/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=UVNvMdv8A-wjtOX2JN4ZV2fFLAoeIqILvhUYNBReN9o";
    }

    console.log(url);

    try {

        const response =
            await fetch(
                url,
                {

                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: data

                }
            );


        if (!response.ok) {

            throw new Error(
                "Erreur HTTP : " +
                response.status
            );

        }


        const result =
            await response.text();


        console.log(
            "Succès :",
            result
        );


        alert(
            "Votre feuille a été transmise avec succès."
        );

    }


    catch (error) {

        console.error(
            "Erreur :",
            error
        );


        alert(
            "Erreur lors de la transmission de votre feuille."
        );

    }



}

