$(document).ready(function () {
  ////////////////////////
  firebase.database().ref('sagas').on('value', function(snap) {
    var arrLength = snap.val().length;


    // Cargamos la data del usuario 

    
    for (i = 0;i < arrLength;i++) {
      var $option = $('<option value="' + snap.val()[i]['Title'] + '"></option>');  
      $('#list-movies').append($option);
    }
  });
  ////////////////

  var omdbUrl = 'http://www.omdbapi.com/';
  // http://www.omdbapi.com/?apikey=6cb21a7d&t=star&plot=full
  var apiKey = '6cb21a7d';

  var page = 1;

  // evento click par el boton search con la funcion de buscar movies y que como parametro de la pagina 1
  $('#shearch-btn').click(function () {
    // searchMoviesApi( page );
    searchMoviesApi();
  });

  // funcion busqueda movies parametro page
  function searchMoviesApi(page) {
    var str = $('#enter-title').val();

    if (str.length >= 1) {
      $('.navigatePagesButtons').removeClass('hide');
      var link = omdbUrl + '?apikey=' + apiKey + '&s=' + str + '&page=' + page;

      /* Metodo Ajax (es configurado a través de un objeto,) -- 3 principales parametros*/
      $.ajax({
        type: 'GET', // especifica si será una petición POST o GET
        url: link, // la URL para la petición
        success: function (res) {
          console.log(res);

          window.localStorage.setItem('jsonData', JSON.stringify(res.Search));
          console.log(window.localStorage.getItem('jsonData', JSON.stringify(res.Search)));

          var resultSearch = $('.results');
          resultSearch.html(''); // Limpio el contenedor de la tabla
          var counter = (page * 10 - 10) + 1;
          var codes = [];

          $.each(res.Search, function (key, p) { // 10
            // console.log('Indice es ' + key + ' y valor Poster: ' + p.Poster);
            // console.log('Indice es ' + key + ' y valor Title es: ' + p.Title);
            // console.log('Indice es ' + key + ' y valor Type es: ' + p.Type);
            // console.log('Indice es ' + key + ' y valor Year es: ' + p.Year);
            // console.log('Indice es ' + key + ' y valor ID es: ' + p.imdbID);

            codes.push(p.imdbID);
            // console.log(window.localStorage.setItem('imdbID', p.imdbID));

            if (p.Poster == 'N/A') {
              p.Poster = '../assets/images/download.png';
            }

            resultSearch.append(
              '<figure class="figure">' +
              // '<img src="..." class="figure-img img-fluid rounded" alt="A generic square placeholder image with rounded corners in a figure.">'
              '<img id="img-click" src="' + p.Poster + '" class="figure-img img-fluid rounded minImg" alt="A generic square placeholder image with rounded corners in a figure.">' +
              '<button type="button" class="btn btn-primary btn-data" data-toggle="modal" data-target="#exampleModal">' + p.Title + '</button>' +
              '</figure>' +

              '<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">' +
              '<div class="modal-dialog" role="document">' +
              '<div class="modal-content">' +
              '<div class="modal-header">' +
              '<h5 class="modal-title" id="exampleModalLabel">' + p.Title + '</h5>' +

              '</button>' +
              '</div>' +
              '<div class="modal-body">' +
              '<img id="img-click" src="' + p.Poster + '" class="figure-img img-fluid rounded minImg" alt="A generic square placeholder image with rounded corners in a figure.">' +
              '<ul class="text-left">' +
              '<li><b>Title: </b>' + p.Type + '</li>' +
              '<li><b>Year: </b>' + p.Year + '</li>' +
              '</ul>' +
              '</div>' +
              '<div class="modal-footer">' +
              '<button type="button" class="btn btn-primary">Guardar coleccion</button>' +
              '</div>' +
              '</div>' +
              '</div>' +
              '</div>'
            );

            $('.btn-data').click(function () {
              $('#myModal').modal('show');

            });

            counter++;
          });
          console.log(codes);
          // almacenamos y obtenemos el ID en el localStorage
          window.localStorage.setItem('ids', JSON.stringify(codes));

          var totalPages = Math.ceil(res.totalResults / 10); // 54 / Ceil = 6
          var pagesButtons = $('#pages');
          pagesButtons.html(''); // Limpio el contenedor

          for (var i = 0; i < totalPages; i++) {
            pagesButtons.append(
              '<button type="button" page="' + (i + 1) + '" class="btn btn-dark myButton">' + (i + 1) + '</button>'
            );
          };

          $('.myButton').click(function () {
            var page = $(this).attr('page');
            searchMoviesApi(page);
          });
        },
      });
    } else {
      $('.navigatePagesButtons').addClass('hide');
    };
  };

  function renderMovieDetails() {
    openDetails();
    // take id of table row user just clicked
    var id = this.getAttribute('data-id');

    var link = omdbUrl + '?apikey=' + apiKey + '&i=' + str;
    fetch(link)
      .then((response) => response.json())
      .then((data) => {
        if (data.Poster == 'N/A') {
          data.Poster = '../assets/images/download.png';
        };
        listenOnFigure();
      });
  }


  function searchSagasFirebase() {
    firebase.database().ref('sagas').on('value', function (snapshot) {
      var resultsBdSagas = snapshot.val();
      $.makeArray(resultsBdSagas);
      var codesf = [];
      var arrIDS = [];
      $.map(resultsBdSagas, function (value, key) {
        console.log(value);
        console.log('Indice es ' + key + ' y valor Poster es: ' + value.Poster);
        console.log('Indice es ' + key + ' y valor Title es: ' + value.Title);
        console.log('Indice es ' + key + ' y valor Type es: ' + value.Type);
        console.log('Indice es ' + key + ' y valor Year es: ' + value.Year);
        console.log('Indice es ' + key + ' y valor ID es: ' + value.imdbID);

        codesf.push(value.imdbID);
      });
      console.log(codesf);
      window.localStorage.setItem('ids', JSON.stringify(codesf));

      var apiMovieID = window.localStorage.getItem('ids', JSON.stringify(codes));
      console.log(window.localStorage.getItem('ids', JSON.stringify(codes)));

      var firebaseSagaID = window.localStorage.getItem('ids', JSON.stringify(codesf));
      console.log(window.localStorage.getItem('ids', JSON.stringify(codesf)));

      // for (var i = 0; i < apiMovieID; i++);
      var items = apiMovieID.filter(function (firebaseSagaID) {
        console.log(apiMovieID.includes(firebaseSagaID));
      });

      arrIDS.push(items);
      window.localStorage.setItem('ids', JSON.stringify(arrIDS));

      var arrayID = window.localStorage.getItem('ids', JSON.stringify(arrIDS));
      console.log(window.localStorage.getItem('ids', JSON.stringify(arrIDS)));
    });
  };

  function searchSagasApi(page) {
    var str = $('#enter-title').val();

    if (str.length >= 1) {
      $('.navigatePagesButtons').removeClass('hide');
      var link = omdbUrl + '?apikey=' + apiKey + '&t=' + str + '&page=' + page;

      /* Metodo Ajax (es configurado a través de un objeto,) -- 3 principales parametros*/
      $.ajax({
        type: 'GET', // especifica si será una petición POST o GET
        url: link, // la URL para la petición
        success: function (res) {
          console.log(res);

          var arrayID = window.localStorage.getItem('ids', JSON.stringify(arrIDS));
          console.log(window.localStorage.getItem('ids', JSON.stringify(arrIDS)));

          var resultSearch = $('.results');
          resultSearch.html(''); // Limpio el contenedor de la tabla
          var counter = (page * 10 - 10) + 1;
          var codes = [];

          $.each(res.Search, function (key, p) { // 10
            // console.log('Indice es ' + key + ' y valor Poster: ' + p.Poster);
            // console.log('Indice es ' + key + ' y valor Title es: ' + p.Title);
            // console.log('Indice es ' + key + ' y valor Type es: ' + p.Type);
            // console.log('Indice es ' + key + ' y valor Year es: ' + p.Year);
            console.log('Indice es ' + key + ' y valor ID es: ' + p.imdbID);

            codes.push(p.imdbID);

            for (var i = 0; i < arrayID; i++) {
              if (p.imdbID == arrayID) {
                if (p.Poster == 'N/A') {
                  p.Poster = '../assets/images/download.png';
                }

                resultSearch.append(
                  '<figure class="figure">' +
                  // '<img src="..." class="figure-img img-fluid rounded" alt="A generic square placeholder image with rounded corners in a figure.">'
                  '<img src="' + p.Poster + '" class="figure-img img-fluid rounded minImg" alt="A generic square placeholder image with rounded corners in a figure.">' +
                  '<figcaption class="figure-caption">' + p.Title + '</figcaption>' +
                  '</figure>'
                );

                function renderMovieDetails() {
                  openDetails();
                  // take id of table row user just clicked
                  let id = this.getAttribute("data-id");

                  let userUrl = "http://www.omdbapi.com/?apikey=" + myApiKey + "&i=" + id;

                  fetch(userUrl)
                    .then((response) => response.json())
                    .then((data) => {
                      let poster = data.Poster === "N/A" ? "assets/noImg.jpg" : data.Poster;
                      let movieDetails = `<button type="button" class="btn btn-dark myClose" onclick="closeDetails()">Close <span class="float-right" style="margin-right: 10px;">x</span></button>
                          <img class="card-img-top detailImg" src="${poster}" alt="Card image cap">
                          <div class="card-body">
                          <p class="card-text">
                          <ul>
                              <li><b>Title:</b> ${data.Title}</li>
                              <li><b>Year:</b> ${data.Year}</li>
                              <li><b>Genre:</b> ${data.Genre}</li>
                              <li><b>Director:</b> ${data.Director}</li>
                              <li><b>Actors:</b> ${data.Actors}</li>
                          </ul>
                          </p>
              
                          <button class="btn btn-dark btn-block myButton" type="button" data-toggle="collapse" data-target="#filmDetail" aria-expanded="false" aria-controls="filmDetail">
                          Review
                          </button>
                          <div class="collapse" id="filmDetail">
                          <div class="card card-body">
                          <p>${data.Plot}</p>
                          </div>
                          </div>
                          </div>
                        `;
                      document.querySelector('.myCard').innerHTML = movieDetails;
                    })
                }


                function openDetails() {
                  document.querySelector('.details').style.width = "100%";
                  document.querySelector('.details').style.display = "initial";

                  document.querySelector('.container').style.filter = "blur(5px)";
                }

                function closeDetails() {
                  document.querySelector('.details').style.width = "0vw";
                  document.querySelector('.details').style.display = "none";

                  document.querySelector('.container').style.filter = "blur(0px)";

                }
              } else {
                alert('no encontramos en nuestra bd');
              }
            }

            counter++;
          });
          console.log(codes);

          var totalPages = Math.ceil(res.totalResults / 10); // 54 / Ceil = 6
          var pagesButtons = $('#pages');
          pagesButtons.html(''); // Limpio el contenedor

          for (var i = 0; i < totalPages; i++) {
            pagesButtons.append(
              '<button type="button" page="' + (i + 1) + '" class="btn btn-dark myButton">' + (i + 1) + '</button>'
            );
          };

          $('.myButton').click(function () {
            var page = $(this).attr('page');
            searchMovies(page);
          });
        },
      });
    } else {
      $('.navigatePagesButtons').addClass('hide');
    };
  };


});