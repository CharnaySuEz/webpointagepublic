



/* =========================================================
   DATES ISO
========================================================== */

function getMondayOfWeek(week, year) {

    const jan4 =
        new Date(year, 0, 4);

    const day =
        jan4.getDay() || 7;

    const mondayWeek1 =
        new Date(jan4);

    mondayWeek1.setDate(
        jan4.getDate() - day + 1
    );

    const monday =
        new Date(mondayWeek1);

    monday.setDate(
        mondayWeek1.getDate() +
        (week - 1) * 7
    );

    const yyyy =
        monday.getFullYear();

    const mm =
        String(
            monday.getMonth() + 1
        ).padStart(2, "0");

    const dd =
        String(
            monday.getDate()
        ).padStart(2, "0");

    return `${yyyy}-${mm}-${dd}`;

}


function getSundayOfWeek(week, year) {

    const mondayString =
        getMondayOfWeek(
            week,
            year
        );

    const sunday =
        new Date(
            mondayString +
            "T12:00:00"
        );

    sunday.setDate(
        sunday.getDate() + 6
    );

    const yyyy =
        sunday.getFullYear();

    const mm =
        String(
            sunday.getMonth() + 1
        ).padStart(2, "0");

    const dd =
        String(
            sunday.getDate()
        ).padStart(2, "0");

    return `${yyyy}-${mm}-${dd}`;

}


function updateDates() {

    const week =
        parseInt(
            document
                .getElementById("semaine")
                .value
        );

    const year =
        parseInt(
            document
                .getElementById("annee")
                .value
        );


    if (
        !year ||
        !week
    ) {
        return;
    }


    document
        .getElementById("lundi")
        .value =
        getMondayOfWeek(
            week,
            year
        );


    document
        .getElementById("dimanche")
        .value =
        getSundayOfWeek(
            week,
            year
        );

}

function getDateForDay(jour) {

    const lundi = new Date(
        document.getElementById("lundi").value +
        "T12:00:00"
    );

    const offsets = {
        lundi: 0,
        mardi: 1,
        mercredi: 2,
        jeudi: 3,
        vendredi: 4,
        samedi: 5,
        dimanche: 6
    };

    const offset =
        offsets[jour.toLowerCase().trim()];

    if (offset === undefined) {
        return null;
    }

    lundi.setDate(
        lundi.getDate() + offset
    );

    return lundi.toISOString().split("T")[0];
}