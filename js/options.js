
function motifOptions(selected = "") {

    const options = [
        "",
        "AUTO",
        "CPAY",
        "MEMO",
        "RTTQ",
        "RTTA",
        "RTTJ",
        "AMAL",
        "AUTRE..."
    ];

    return options
        .map(option => `
    <option
        value="${option}"
        ${option === selected ? "selected" : ""}
    >
        ${option}
    </option>
    `)
        .join("");
}

    function toggleMotifLibre(select) {

      const inputLibre =
        select.parentElement.querySelector(".motif-libre");

      if (select.value === "AUTRE...") {

        inputLibre.style.display = "block";
        inputLibre.focus();

      } else {

        inputLibre.style.display = "none";
        inputLibre.value = "";

      }

    }


function typeOptions(selected = "") {

    const options = [
        "",
        "X",
        "HIA"
    ];

    return options
        .map(option => `
    <option
        value="${option}"
        ${option === selected ? "selected" : ""}
    >
        ${option}
    </option>
    `)
        .join("");

}