const app = {};

app.userSelection = function () {
  $("select").on("change", function () {
    const selection = $("option:selected").val();
    app.getInfo(selection);
  });
};

app.getInfo = function (characterSelection) {
  $.ajax({
    url: `https://finalspaceapi.com/api/v0/character/${characterSelection}`,
    method: "GET",
    dataType: "JSON",
  })
    .then(function (data) {
      $(".characterContainer").empty();
      app.displayData(data), app.displayAlias(data), app.displayAbilities(data);
    })
    .fail(function (error) {
      console.log(error);
    });
};

app.displayData = function (data) {
  const appendHtml = `
      <div class="characterCard">
        <h2 class="characterTitle">${data.name}</h2>
        <div class="image-container">
                <img class="characterImage" src=${data.img_url} alt=${data.name}/>
        </div>
        <ul class="cardList">
          <li><span>Status:</span> ${data.status}</li>
          <li><span>Origin:</span> ${data.origin}</li>
          <li><span>Species:</span> ${data.species}</li>
          <li>
            <span>Alias:</span>
            <ul class="aliasList"></ul>
          </li>
          <li>
            <span>Abilities:</span>
            <ul class="abilitiesList"></ul>
          </li>
        </ul>
      </div>
      `;
  $(".characterContainer").append(appendHtml);
};

app.displayAlias = function (data) {
  data.alias.forEach((ali) => {
    $(".aliasList").append(`<li>${ali}</li>`);
  });
};

app.displayAbilities = function (data) {
  data.abilities.forEach((abil) => {
    $(".abilitiesList").append(`<li>${abil}</li>`);
  });
};

app.init = function () {
  app.getInfo(1);
  app.userSelection();
};

$(document).ready(function () {
  app.init();
});
