

/* =========================================================
DONNEES
========================================================== */


/* =========================================================
   OPTIONS
========================================================== */

function verifierInformationsGenerales() {

    const semaine =
        document.getElementById("semaine").value;

    const annee =
        document.getElementById("annee").value;

    const site =
        document.getElementById("site").value;

    const collaborateur =
        document.getElementById("nom").value;

    const formulaire =
        document.getElementById("formulaireComplet");

    const complet =
        semaine &&
        annee &&
        site &&
        collaborateur;

    const message =
        document.getElementById("messageDemarrage");

    if (complet) {

        formulaire.style.display = "block";
        message.style.display = "none";

    } else {

        formulaire.style.display = "none";
        message.style.display = "block";

    }


}



/* =========================================================
   GENERATION DES JOURS
========================================================== */

function createDayRow(
    start,
    end,
    motif = "AUTO",
    type = ""
) {

    return `
    <tr>

        <td>
            <input
                type="time"
                class="form-control"
                value="${start}"
            >
        </td>

        <td>
            <input
                type="time"
                class="form-control"
                value="${end}"
            >
        </td>

        <td>
            <select
              class="form-select motif-select"
              onchange="toggleMotifLibre(this)"
            >
              ${motifOptions(motif)}
            </select>

            <input
              type="text"
              class="form-control mt-1 motif-libre"
              placeholder="Saisir un code personnalisé"
              style="display:none;"
            >
        </td>

        <td>
            <select class="form-select">
                ${typeOptions(type)}
            </select>

            <input
              type="text"
              class="form-control mt-1 motif-libre"
              placeholder="Saisir un code personnalisé"
              style="display:none;"
            >
        </td>

        <td class="text-center">

            <button
                type="button"
                class="btn btn-outline-danger btn-sm"
                onclick="deleteRow(this)"
            >
                ×
            </button>

        </td>

    </tr>
    `;

}


function createDayTable(jour) {

    const isWeekend =
        jour === "Samedi" ||
        jour === "Dimanche";


    const rows = isWeekend

        ? createDayRow("", "", "", "")

        : jour === "Vendredi"

            ? `
    ${createDayRow("08:00", "12:00")}
    ${createDayRow("13:30", "16:30")}
    `

            : `
    ${createDayRow("08:00", "12:00")}
    ${createDayRow("13:30", "17:00")}
    `;


    return `

    <div class="day-table">

        <div class="day-table-header">

            <div>

                <h5>
                    ${jour}
                </h5>

                <div class="day-work-time">
                    <span class="day-work-label">
                        Temps travaillé
                    </span>

                    <strong
                        class="day-work-value"
                        data-day="${jour}"
                    >
                        0 h
                    </strong>
                </div>

            </div>

            ${isWeekend

            ? `
        <span class="day-badge">
          Facultatif
        </span>
      `

            : `
        <span class="day-badge">
          Semaine normale
        </span>
      `
        }

        </div>



        <div class="table-responsive">

            <table class="table table-bordered align-middle">

                <thead>

                    <tr>

                        <th>
                            Heure début
                        </th>

                        <th>
                            Heure fin
                        </th>

                        <th>
                            Alias ou Motif
                        </th>

                        <th>
                            Type
                        </th>

                        <th>
                            Sup.
                        </th>

                    </tr>

                </thead>


                <tbody>

                    ${rows}

                </tbody>

            </table>

        </div>

        <div
            class="daily-overtime-zone"
            style="display:none;"
        >
            <label class="form-label text-danger mt-3">
                Motif dépassement (> 10 h/jour) *
            </label>

            <select class="form-select daily-overtime-reason">
                ${motifsDepassementJour.map(m =>
            `<option value="${m}">${m || "Sélectionner un motif"}</option>`
        ).join("")}
            </select>
        </div>

        <div class="d-flex gap-2 flex-wrap">

            <button
                type="button"
                class="btn btn-sm btn-outline-secondary"
                onclick="addRowAtStart(this)"
            >
                + Matin
            </button>


            <button
                type="button"
                class="btn btn-sm btn-outline-secondary"
                onclick="addHSupp(this)"
            >
                + Midi
            </button>


            <button
                type="button"
                class="btn btn-sm btn-outline-secondary"
                onclick="addRowAtEnd(this)"
            >
                + Soir
            </button>

        </div>

    </div>

    `;

}


function generateDays() {

    const container =
        document.getElementById("daysContainer");

    container.innerHTML =
        jours
            .map(jour => createDayTable(jour))
            .join("");

}




/* =========================================================
   GESTION DES LIGNES
========================================================== */

function deleteRow(button) {

    if (button.closest("tbody").rows.length === 1) {
        return;
    }

    const row =
        button.closest("tr");

    row.remove();
    calculateWeekHours();

}


function addRowAtStart(button) {

    const tbody =
        button
            .closest(".day-table")
            .querySelector("tbody");


    tbody.insertAdjacentHTML(
        "afterbegin",
        createDayRow(
            "06:30",
            "08:00"
        )
    );

    calculateWeekHours();

}


function addHSupp(button) {

    const tbody =
        button
            .closest(".day-table")
            .querySelector("tbody");


    const newRow =
        createDayRow(
            "12:00",
            "13:30"
        );


    const rows =
        Array.from(
            tbody.querySelectorAll("tr")
        );


    const targetRow =
        rows.find(row => {

            const inputs =
                row.querySelectorAll(
                    'input[type="time"]'
                );

            return (
                inputs.length >= 2 &&
                inputs[0].value === "08:00" &&
                inputs[1].value === "12:00"
            );

        });


    if (targetRow) {

        targetRow.insertAdjacentHTML(
            "afterend",
            newRow
        );

    }

    else {

        tbody.insertAdjacentHTML(
            "beforeend",
            newRow
        );

    }
    calculateWeekHours();

}


function addRowAtEnd(button) {

    const tbody =
        button
            .closest(".day-table")
            .querySelector("tbody");


    tbody.insertAdjacentHTML(
        "beforeend",
        createDayRow(
            "17:30",
            "19:00"
        )
    );
    calculateWeekHours();

}


/* =========================================================
   AFFICHAGE DETAIL SEMAINE
========================================================== */

function toggleSemaine() {

    const bloc =
        document.getElementById(
            "displaySemaineDeTravail"
        );

    const bouton =
        document.getElementById(
            "btnSemaine"
        );


    if (
        bloc.style.display === "none"
    ) {

        bloc.style.display = "block";

        bouton.textContent =
            "Masquer le détail";

    }

    else {

        bloc.style.display = "none";

        bouton.textContent =
            "Modifier le détail";

    }

}


/* =========================================================
   ASTREINTE
========================================================== */

function toggleAstreinte(btn) {

    const zone =
        document.getElementById(
            "astreinteZone"
        );


    const isHidden =
        zone.style.display === "none";


    if (!isHidden) {

        zone.style.display = "none";

        btn.textContent =
            "+ Ajouter";

        return;

    }


    const lundiValue =
        document
            .getElementById("lundi")
            .value;


    const dimancheValue =
        document
            .getElementById("dimanche")
            .value;


    if (
        !lundiValue ||
        !dimancheValue
    ) {

        alert(
            "Merci de compléter le numéro de semaine avant d'ajouter une astreinte."
        );

        return;

    }


    zone.style.display =
        "block";


    const dateDebut =
        new Date(
            lundiValue +
            "T12:00:00"
        );

    dateDebut.setDate(
        dateDebut.getDate() - 3
    );


    const dateFin =
        new Date(
            dimancheValue +
            "T12:00:00"
        );

    dateFin.setDate(
        dateFin.getDate() - 2
    );


    document
        .getElementById(
            "astreinteDateDebut"
        )
        .value =
        dateDebut
            .toISOString()
            .split("T")[0];


    document
        .getElementById(
            "astreinteDateFin"
        )
        .value =
        dateFin
            .toISOString()
            .split("T")[0];


    const heureDebut =
        document.getElementById(
            "astreinteHeureDebut"
        );


    const heureFin =
        document.getElementById(
            "astreinteHeureFin"
        );


    if (!heureDebut.value) {

        heureDebut.value =
            "16:30";

    }


    if (!heureFin.value) {

        heureFin.value =
            "16:30";

    }


    btn.textContent =
        "Masquer";

}


/* =========================================================
   INDEMNITES
========================================================== */

function toggleIndemniteRepas() {

    const zone =
        document.getElementById(
            "indemniteRepasZone"
        );


    const isHidden =
        zone.style.display === "none";


    zone.style.display =
        isHidden
            ? "block"
            : "none";


    if (
        isHidden &&
        !document
            .getElementById(
                "nbrTicketrestau"
            )
            .value
    ) {

        document
            .getElementById(
                "nbrTicketrestau"
            )
            .value = 5;

    }

}

function calculateCurrentWeekMinutes() {

    let totalMinutes = 0;

    document
        .querySelectorAll(".day-table")
        .forEach(dayTable => {

            totalMinutes +=
                calculateDayHours(dayTable);

        });

    return totalMinutes;

}


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

                Version: 'V31',

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
CALCUL DU TEMPS DE TRAVAIL
========================================================= */



function formatMinutes(minutes) {

    const hours =
        Math.floor(minutes / 60);

    const mins =
        minutes % 60;

    if (mins === 0) {
        return `${hours} h`;
    }

    return `${hours} h ${String(mins).padStart(2, "0")}`;
}

function updateWeekScheduleSummary() {

    const summary =
        document.getElementById(
            "weekScheduleSummary"
        );

    if (!summary) {
        return;
    }


    const horaires = {};


    document
        .querySelectorAll(".day-table")
        .forEach(dayTable => {

            const dayName =
                dayTable
                    .querySelector("h5")
                    ?.textContent
                    .trim();


            const rows =
                dayTable
                    .querySelectorAll("tbody tr");


            const plages = [];


            rows.forEach(row => {

                const inputs =
                    row.querySelectorAll(
                        'input[type="time"]'
                    );


                if (
                    inputs.length >= 2 &&
                    inputs[0].value &&
                    inputs[1].value
                ) {

                    plages.push(
                        `${inputs[0].value}–${inputs[1].value}`
                    );

                }

            });


            horaires[dayName] =
                plages.join(" / ");

        });


    const lundiJeudi =
        ["Lundi", "Mardi", "Mercredi", "Jeudi"];


    const horairesLundiJeudi =
        lundiJeudi.map(
            jour => horaires[jour]
        );


    const sameSchedule =
        horairesLundiJeudi.every(
            horaire =>
                horaire === horairesLundiJeudi[0]
        );


    let html = `
    <strong>Lundi à Jeudi</strong> : 08:00 à 12:00 et 13:30 à 17:00
    <br>
        <strong>Vendredi</strong> : 08:00 à 12:00 et 13:30 à 16:30
        `;


    summary.innerHTML = html;

}

/* =========================================================
   CALCUL DU TEMPS DE TRAVAIL DE LA SEMAINE
========================================================= */

function calculateWeekHours() {

    let totalMinutes = 0;

    const dayTables =
        document.querySelectorAll(
            ".day-table"
        );


    dayTables.forEach(dayTable => {

        /* Calcul de la journée */

        const dayMinutes =
            calculateDayHours(
                dayTable
            );

        const overtimeZone =
            dayTable.querySelector(
                ".daily-overtime-zone"
            );

        const overtimeSelect =
            dayTable.querySelector(
                ".daily-overtime-reason"
            );

        if (dayMinutes > 600) {

            overtimeZone.style.display =
                "block";

            overtimeSelect.required =
                true;

        }
        else {

            overtimeZone.style.display =
                "none";

            overtimeSelect.required =
                false;

            overtimeSelect.value = "";

        }

        /* Ajout au total semaine */

        totalMinutes +=
            dayMinutes;


        /* Mise à jour de l'affichage du jour */

        const dayName =
            dayTable
                .querySelector("h5")
                ?.textContent
                .trim();


        const dayDisplay =
            dayTable.querySelector(
                `.day-work-value[data-day="${dayName}"]`
            );


        if (dayDisplay) {

            dayDisplay.textContent =
                formatMinutes(
                    dayMinutes
                );

        }

    });


    /* Mise à jour du résumé semaine */

    updateWeekDisplay(
        totalMinutes
    );


    /* Mise à jour du résumé des horaires */

    updateWeekScheduleSummary();

}


/* =========================================================
CALCUL TEMPS D'UNE JOURNEE
========================================================= */

function calculateDayHours(dayTable) {

    let totalMinutes = 0;

    const rows =
        dayTable.querySelectorAll(
            "tbody tr"
        );


    rows.forEach(row => {

        const timeInputs =
            row.querySelectorAll(
                'input[type="time"]'
            );


        if (timeInputs.length < 2) {
            return;
        }


        const start =
            timeInputs[0].value;

        const end =
            timeInputs[1].value;


        if (!start || !end) {
            return;
        }


        const [startHours, startMinutes] =
            start.split(":").map(Number);

        const [endHours, endMinutes] =
            end.split(":").map(Number);


        const startTotal =
            startHours * 60 +
            startMinutes;


        let endTotal =
            endHours * 60 +
            endMinutes;


        /* Gestion si la plage passe minuit */

        if (endTotal < startTotal) {
            endTotal += 24 * 60;
        }


        totalMinutes +=
            endTotal - startTotal;

    });


    return totalMinutes;

}

/* =========================================================
   AFFICHAGE DYNAMIQUE DE LA SEMAINE
========================================================= */

function updateWeekDisplay(totalMinutes) {

    const targetMinutes = 37 * 60;

    const difference =
        totalMinutes -
        targetMinutes;


    const totalElement =
        document.getElementById(
            "weekTotalHours"
        );


    const statusElement =
        document.getElementById(
            "weekStatus"
        );


    const statusTextElement =
        document.getElementById(
            "weekStatusText"
        );


    const differenceElement =
        document.getElementById(
            "weekDifference"
        );


    const statusDot =
        document.getElementById(
            "weekStatusDot"
        );


    if (
        !totalElement ||
        !statusElement ||
        !statusTextElement ||
        !differenceElement
    ) {
        return;
    }


    /* Temps total */

    totalElement.textContent =
        formatMinutes(totalMinutes);


    /* Remise à zéro des styles */

    statusElement.classList.remove(
        "status-normal",
        "status-missing",
        "status-extra"
    );


    statusDot.classList.remove(
        "dot-normal",
        "dot-missing",
        "dot-extra"
    );


    /* SEMAINE NORMALE */

    if (difference === 0) {

        statusElement.classList.add(
            "status-normal"
        );

        statusDot.classList.add(
            "dot-normal"
        );


        statusTextElement.textContent =
            "Semaine normale";


        differenceElement.textContent =
            "Objectif atteint : 37 h";

    }


    /* IL MANQUE DES HEURES */

    else if (difference < 0) {

        const missing =
            Math.abs(difference);


        statusElement.classList.add(
            "status-missing"
        );

        statusDot.classList.add(
            "dot-missing"
        );


        statusTextElement.textContent =
            "Temps incomplet";


        differenceElement.textContent =
            `Il manque ${formatMinutes(missing)} sur 37 h`;

    }


    /* HEURES EN PLUS */

    else {

        statusElement.classList.add(
            "status-extra"
        );

        statusDot.classList.add(
            "dot-extra"
        );


        statusTextElement.textContent =
            "Temps supplémentaire";


        differenceElement.textContent =
            `+ ${formatMinutes(difference)} au-dessus de 37 h`;

    }


    const motifZone =
        document.getElementById("motifDepassementZone");

    const motifInput =
        document.getElementById("motifDepassement");

    if (totalMinutes > (48 * 60)) {

        motifZone.style.display = "block";

        motifInput.setAttribute(
            "required",
            "required"
        );

    } else {

        motifZone.style.display = "none";

        motifInput.removeAttribute(
            "required"
        );

        motifInput.value = "";

    }

}

/* =========================================================
ECOUTE DES MODIFICATIONS
========================================================= */

function initializeWeekHoursCalculation() {

    document.addEventListener(
        "input",
        function (event) {

            if (
                event.target.matches(
                    'input[type="time"]'
                )
            ) {

                calculateWeekHours();

            }

        }
    );


    document.addEventListener(
        "change",
        function (event) {

            if (
                event.target.matches(
                    'input[type="time"]'
                )
            ) {

                calculateWeekHours();

            }

        }
    );

}


/* =========================================================
   POWER AUTOMATE
========================================================== */

async function envoyerVersPowerAutomate(data) {

    const environnement = document.getElementById("environment").value;

    let url;

    if (environnement === "TEST") {
        url = "https://defaultf4a12867922d4b9dbb859ee7898512.a0.environment.api.powerplatform.com:443/powerautomate/automations/direct/cu/06/workflows/db4272c898ac4da78e5b58415adf4f02/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=TPUWRC8qIDl9T78yk8Mp1y9gBwIlO5psVO09wvXRrqw";
        url = "prout"
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




/* =========================================================
   INITIALISATION
========================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        generateDays();

        updateNomPrenom();

        initializeWeekHoursCalculation();

        calculateWeekHours();

        verifierInformationsGenerales();

    }
);
