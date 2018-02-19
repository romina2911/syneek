$(document).ready(function() {
  var UID = window.localStorage.getItem('storageUID'); // Por cambiar a una variable

  firebase.database().ref('users/' + UID).on('value', function(snap) {
    // Cargamos la data del usuario 
    $('#txt-edit-name').attr('value', snap.val()['name']);
    $('#img-user').attr('src', snap.val()['photo']);
  });

  firebase.database().ref('perfil/' + UID).on('value', function(snap) {
    
    console.log(snap.val()['preferences']);
    // Cargamos la data del usuario 
    for(i=0;i<snap.val()['preferences'].length;i++) {
$('#generos').append('<li>-'+snap.val()['preferences'][i]+'</li>')
    }
    
    
  });

  // $('#condiciones:checked').val();

  $('#btn-save').click(function() {
    console.log('holi');
    var arrPreferences = [];
    
    // Actualizando el array preferencias
    if ($('#chk-terror').prop('checked')) {
      arrPreferences.push($('#chk-terror').val());
    }
    if ($('#chk-ficcion').prop('checked')) {
      arrPreferences.push($('#chk-ficcion').val());
    }
    if ($('#chk-romance').prop('checked')) {
      arrPreferences.push($('#chk-romance').val());
    }
    if ($('#chk-comedia').prop('checked')) {
      arrPreferences.push($('#chk-comedia').val());
    }
    if ($('#chk-musicales').prop('checked')) {
      arrPreferences.push($('#chk-musicales').val());
    }
    if ($('#chk-aventura').prop('checked')) {
      arrPreferences.push($('#chk-aventura').val());
    }
    if ($('#chk-suspenso').prop('checked')) {
      arrPreferences.push($('#chk-suspenso').val());
    }
    if ($('#chk-drama').prop('checked')) {
      arrPreferences.push($('#chk-drama').val());
    }
    if ($('#chk-accion').prop('checked')) {
      arrPreferences.push($('#chk-accion').val());
    }

    if ($('#chk-fantasia').prop('checked')) {
      arrPreferences.push($('#chk-fantasia').val());
    }

    if ($('#chk-erotica').prop('checked')) {
      arrPreferences.push($('#chk-erotica').val());
    }

    if ($('#chk-animacion').prop('checked')) {
      arrPreferences.push($('#chk-animacion').val());
    }
    // Guardando los datos
    if (arrPreferences.length < 1) {
      alert('Por favor actualice sus géneros favoritos');
    } else {
      firebase.database().ref('perfil/' + UID).set(
        UID = {
          uid: UID,
          preferences: arrPreferences                   
        });
      location.reload();

      alert('Datos guardados satisfactoriamente');
    }

    console.log(arrPreferences);
    

  });
});