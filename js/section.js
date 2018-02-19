$(document).ready(function() {
  var provider = new firebase.auth.GoogleAuthProvider();

  $('#btn-hola').on('click', function() {
    // alert('hola');
    firebase.auth().signInWithPopup(provider).then(function(result) {
      /* var token = result.credential.accessToken;
            var user = result.user;*/
      /* console.log(result);
            console.log(result.user.email);
            console.log(result.user.displayName);
            console.log(result.user.photoURL);
            console.log(result.user.uid);
            console.log(result.additionalUserInfo.profile.gender);*/
      saveData(result.user);
    });
  });
  function saveData(user) {
    var userToSave = {
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      photo: user.photoURL,
      preference: ['ninguno']
    };
    console.log(userToSave);
    firebase.database().ref('users/' + user.uid).set(userToSave);
  };
  // --------------- estrenos ---------------
  firebase.database().ref('estrenos').on('value', function(snapshot) {
    // console.log(snapshot.val()[0].Title);
    var keysOscars = Object.keys(snapshot.val());
    var oscarsLength = keysOscars.length;
  

    for (i = 0;i < 3;i++) {
      var random = Math.floor(Math.random() * (20 - 0 + 1) + 0);
      var posterOscar = snapshot.val()[random]['Poster'];
      $('#estrenos').append('<div data-toggle="modal" data-target="#myModal1"> <img class="img-autoplay" src="' + posterOscar + '" alt="' + snapshot.val()[random]['Title'] + '"></div>');
    }
      
    $('.img-autoplay').on('click', function() {
      console.log();
      $('#modal-data').empty();
      $('#modal-data').append('<img class="img-autoplay" src="' + $(this).attr('src') + '" alt="' + snapshot.val()[random]['Title'] + '">');
      $('#modal').modal('show');
    });
  });    


  // ----------- imagenes oscars -----------
  
  firebase.database().ref('oscar').on('value', function(snapshot) {
  // console.log(snapshot.val()[0].Title);
    var keys = Object.keys(snapshot.val());
    var oscar = keys.length;
  

    for (i = 0;i < 3;i++) {
      var random = Math.floor(Math.random() * (20 - 0 + 1) + 0);
      var poster = snapshot.val()[random]['Poster'];
      $('#autoplay').append('<div data-toggle="modal" data-target="#myModal2"> <img class="img-autoplay" src="' + poster + '" alt="' + snapshot.val()[random]['Title'] + '"></div>');
    }
      
    $('.img-autoplay').on('click', function() {
      // console.log();
      $('#modal-data').empty();
      $('#modal-title').empty();
      $('#modal-title').html($(this).attr('alt'));
      $('#modal-data').append('<div class="modal-body"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><img class="img-autoplay" src="' + $(this).attr('src') + '" alt="' + snapshot.val()[random]['Title'] + '">');
      

      $('#modal').modal('show').addClass('imagenes-movies');
    });
  });    
   
  // --------- imagenes las mas premiadas ----------
  firebase.database().ref('estrenos').on('value', function(snapshot) {
    // console.log(snapshot.val()[0].Title);
    var keysOscars = Object.keys(snapshot.val());
    var oscarsLength = keysOscars.length;
    var random = Math.floor(Math.random() * (20 - 0 + 1) + 0);
    var posterOscar = snapshot.val()[random]['Poster'];
    var title = snapshot.val()[random]['Title'];
    console.log(title);
    $('#recomendadas').append('<div data-toggle="modal" data-target="#myModal" data-title="titulo"> <img class="img-autoplay column" alt="' + snapshot.val()[random]['Title'] + '" src="' + posterOscar + '"></div><div></div>');
    var random = Math.floor(Math.random() * (20 - 0 + 1) + 0);
    var posterOscar = snapshot.val()[random]['Poster'];
    $('#recomendadas').append('<div data-toggle="modal" data-target="#myModal"> <img class="img-autoplay" src="' + posterOscar + '" alt="' + snapshot.val()[random]['Title'] + '"></div>');
    var random = Math.floor(Math.random() * (20 - 0 + 1) + 0);
    var posterOscar = snapshot.val()[random]['Poster'];
    $('#recomendadas').append('<div data-toggle="modal" data-target="#myModal"> <img class="img-autoplay" alt="' + snapshot.val()[random]['Title'] + '"src="' + posterOscar + '"</div>');
  });  
  // ------- imagenes para mis colecciones--------
  /*
  firebase.database().ref('estrenos').on('value', function(snapshot) {
    console.log(snapshot.val()[0].Title);
    var keysOscars = Object.keys(snapshot.val());
    var oscarsLength = keysOscars.length;
    var random = Math.floor(Math.random() * (20 - 0 + 1) + 0);
    var posterOscar = snapshot.val()[random]['Poster'];
    $('#colecciones').append('<div data-toggle="modal" data-target="#myModal"> <img class="img-autoplay" src="' + posterOscar + '" alt=""> </div>');
    var random = Math.floor(Math.random() * (20 - 0 + 1) + 0);
    var posterOscar = snapshot.val()[random]['Poster'];
    $('#colecciones').append('<div data-toggle="modal" data-target="#myModal"> <img class="img-autoplay" src="' + posterOscar + '" alt=""> </div>');
    var random = Math.floor(Math.random() * (20 - 0 + 1) + 0);
    var posterOscar = snapshot.val()[random]['Poster'];
    $('#colecciones').append('<div data-toggle="modal" data-target="#myModal"> <img class="img-autoplay" src="' + posterOscar + '" alt=""> </div>');
  });*/
  // ------------------------------------
  $('.autoplay').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  });
  // -------------------------------------
  firebase.database().ref('perfil').on('value', function(snapshot) {
    /* console.log(snapshot.val()['06afMdYxxPPg7DKm3t6o1gwPhxI2'].preferences);
    console.log(snapshot.val()['06afMdYxxPPg7DKm3t6o1gwPhxI2'].preferences[0]);
    console.log(snapshot.val()['06afMdYxxPPg7DKm3t6o1gwPhxI2'].preferences[1]);
    console.log(snapshot.val()['06afMdYxxPPg7DKm3t6o1gwPhxI2'].preferences[2]);*/
    var suspense = snapshot.val()['06afMdYxxPPg7DKm3t6o1gwPhxI2'].preferences[0];
    var drama = snapshot.val()['06afMdYxxPPg7DKm3t6o1gwPhxI2'].preferences[1];
    var action = snapshot.val()['06afMdYxxPPg7DKm3t6o1gwPhxI2'].preferences[2];
  });
  // mis colecciones !!!!!!!!
  firebase.database().ref('estrenos').on('value', function(snapshot) {
    // console.log(snapshot.val()[0].Title);
    var keysOscars = Object.keys(snapshot.val());
    var oscarsLength = keysOscars.length;
  

    for (i = 0;i < 3;i++) {
      var random = Math.floor(Math.random() * (20 - 0 + 1) + 0);
      var posterOscar = snapshot.val()[random]['Poster'];
      $('#colecciones').append('<div data-toggle="modal" data-target="#myModal1"> <img class="img-autoplay" src="' + posterOscar + '" alt="' + snapshot.val()[random]['Title'] + '"></div>');
    }
      
    $('.img-autoplay').on('click', function() {
      console.log();
      $('#modal-data').empty();
      $('#modal-data').append('<img class="img-autoplay" src="' + $(this).attr('src') + '" alt="' + snapshot.val()[random]['Title'] + '">');
      $('#modal').modal('show');
    });
  });    
});
