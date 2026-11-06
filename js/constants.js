
const VERSION = "5.2"

const jours = [
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
    "Dimanche"
];

const motifsDepassementJour = [
    "",
    "Intervention urgente",
    "Astreinte",
    "Panne majeure",
    "Travaux programmés",
    "Renfort équipe",
    "Formation",
    "Autre"
];

const horairesParDefaut = {
    Lundi: { matinDebut: "08:00", matinFin: "12:00", apremDebut: "13:30", apremFin: "17:00" },
    Mardi: { matinDebut: "08:00", matinFin: "12:00", apremDebut: "13:30", apremFin: "17:00" },
    Mercredi: { matinDebut: "08:00", matinFin: "12:00", apremDebut: "13:30", apremFin: "17:00" },
    Jeudi: { matinDebut: "08:00", matinFin: "12:00", apremDebut: "13:30", apremFin: "17:00" },
    Vendredi: { matinDebut: "08:00", matinFin: "12:00", apremDebut: "13:30", apremFin: "16:30" }
};

const horairesPause45mn = {
    Lundi: { matinDebut: "08:00", matinFin: "12:00", apremDebut: "12:45", apremFin: "16:15" },
    Mardi: { matinDebut: "08:00", matinFin: "12:00", apremDebut: "12:45", apremFin: "16:15" },
    Mercredi: { matinDebut: "08:00", matinFin: "12:00", apremDebut: "12:45", apremFin: "16:15" },
    Jeudi: { matinDebut: "08:00", matinFin: "12:00", apremDebut: "12:45", apremFin: "16:15" },
    Vendredi: { matinDebut: "08:00", matinFin: "12:00", apremDebut: "12:45", apremFin: "15:45" }
};

const horaires4Jours = {
    Lundi: { matinDebut: "07:30", matinFin: "12:00", apremDebut: "13:15", apremFin: "18:00" },
    Mardi: { matinDebut: "07:30", matinFin: "12:00", apremDebut: "13:15", apremFin: "18:00" },
    Mercredi: { matinDebut: "07:30", matinFin: "12:00", apremDebut: "13:15", apremFin: "18:00" },
    Jeudi: { matinDebut: "07:30", matinFin: "12:00", apremDebut: "13:15", apremFin: "18:00" },
    Vendredi: { matinDebut: "", matinFin: "", apremDebut: "", apremFin: "" }
};

const modelesHoraires = {
    standard: horairesParDefaut,
    pause45: horairesPause45mn,
    quatreJours: horaires4Jours
};

