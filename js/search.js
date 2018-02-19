$(document).ready(function() {
  firebase.database().ref('sagas').on('value', function(snap) {
    var arrLength = snap.val().length;


    // Cargamos la data del usuario 

    
    for (i = 0;i < arrLength;i++) {
      var $option = $('<option value="' + snap.val()[i]['Title'] + '"></option>');  
      $('#list-movies').append($option);
    }
  });

  $('#btn-search').on('click', function() {
    $('#results').children().remove();
    var filterSearch = $('#list-movies').val();
    for (var i = 0; i < restaurants.length; i++) {
      if (restaurants[i]['kind'] == filterSearch) {
        var image = restaurants[i]['image'];
        

        var $newImg = ('<div class="container-img"><p class="overlay-title">' + restaurants[i]['name'] + '</p> <img class="img-food margin-top" src="../assets/images/' + restaurants[i]['image'] + '" alt="' + restaurants[i]['name'] + '"></div></div>');

        $('#results').append($newImg);
      }
    };

});