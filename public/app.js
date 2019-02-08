//Inicializador del elemento Slider
var saveResult = (data) => {
    from = data.from;
    to = data.to;
};

$("#rangoPrecio").ionRangeSlider({
  type: "double",
  grid: false,
  min: 0,
  max: 100000,
  from: 1000,
  to: 20000,
  prefix: "$",
  onStart: function (data) {
       saveResult(data);
   },
  onChange: saveResult,
   onFinish: saveResult
})


$(document).ready(function(){
 cargarCiudad()
  x =0;
  y=0;
setSearch()
});
function setSearch() {

  let busqueda = $('#checkPersonalizada')
  busqueda.on('change', (e) => {
    if (this.customSearch == false) {
      x = 0;
      this.customSearch = true
    } else {
      x = 1;
      this.customSearch = false
    }
    $('#personalizada').toggleClass('invisible')
  })
}


function  cargarCiudad(){
  $.ajax({
    url: "data.json",
    type : 'GET',
     dataType : 'json',
    success: function(datos){
      insertarCiudad(datos)
      insertarTipo(datos)
    }
  });
}



function insertarCiudad(ciudades){
  var listaciudades = []
  listaciudades.push("Escoge una ciudad")
  $.each(ciudades,function(indice,elemento){
    if(listaciudades.indexOf(elemento.Ciudad)===-1){
    listaciudades.push(elemento.Ciudad);
}
  });
  for (var i = 0; i < listaciudades.length; i++) {
    if (i == 0) {
  $('#ciudad').append(`<option value="">${listaciudades[i]}</option>`)
}else {
  $('#ciudad').append($('<option>', {
        value: listaciudades[i],
        text : listaciudades[i]
    }));
}
  }
  $('select').formSelect();
};



function insertarTipo(tipo){
  var listaTipo = []
  listaTipo.push("Escoge un tipo")
  $.each(tipo,function(indice,elemento){
    if(listaTipo.indexOf(elemento.Tipo)===-1){
    listaTipo.push(elemento.Tipo);
}
  });
  for (var i = 0; i < listaTipo.length; i++) {

    if (i == 0) {
  $('#tipo').append(`<option value="">${listaTipo[i]}</option>`)
}else {
  $('#tipo').append($('<option>', {
        value: listaTipo[i],
        text : listaTipo[i]
    }));
}
  }
  $('select').formSelect();
}

function getlista(total) {
    lista = []
    $.each(total,function(indice,elemento){
      lista.push(elemento);
  });
return lista
}



var getDatas =(lista,Ciudad,Tipo,precio1,precio2) =>{
  var listafiltradas = []
   var data = lista
if (Ciudad != "" && Tipo != "") {
  var filtrardata = data.filter((lista) =>
  lista.Ciudad === Ciudad &&
  lista.Tipo === Tipo &&
  precio1 <= parseInt(lista.Precio.replace('$','').replace( ',' ,''))&&
  precio2 >= parseInt(lista.Precio.replace('$','').replace( ',' ,''))
);
}else if (Ciudad != "" && Tipo == "") {
  var filtrardata = data.filter((lista) =>
  lista.Ciudad === Ciudad &&
  precio1 <= parseInt(lista.Precio.replace('$','').replace( ',' ,''))&&
  precio2 >= parseInt(lista.Precio.replace('$','').replace( ',' ,''))
);
}else if (Ciudad == "" && Tipo != "") {
  var filtrardata = data.filter((lista) =>
  lista.Tipo === Tipo &&
  precio1 <= parseInt(lista.Precio.replace('$','').replace( ',' ,''))&&
  precio2 >= parseInt(lista.Precio.replace('$','').replace( ',' ,''))
);
}else if (Ciudad == "" && Tipo == "") {
  var filtrardata = data.filter((lista) =>
  precio1 <= parseInt(lista.Precio.replace('$','').replace( ',' ,''))&&
  precio2 >= parseInt(lista.Precio.replace('$','').replace( ',' ,''))
);
};
for (var i = 0; i < filtrardata.length; i++) {
  listafiltradas.push(filtrardata[i])
};
for (var i = 0; i < listafiltradas.length; i++) {
   buscadorL(listafiltradas,i)
}
}




$("#buscar").on("click",function valores () {

  $(".lista").empty()

  var ciudad = $("#ciudad").val()
  var tipo = $("#tipo").val()
    var rango1 = from;
    var rango2 = to;


  $.ajax({
     url: "data.json",
     type : 'GET',
      dataType : 'json',
     success: function (datos){
       if (x==0){
         for (var i = 0; i < datos.length; i++) {
           buscadorL(datos,i)
         }

       } else {
           getDatas(datos,ciudad,tipo,rango1,rango2)

       }

     }
   });

})

function buscadorL(valor,i) {
  var listado = $('.lista')
var opctionB = '<div class="card horizontal">'+
                '<div class="card-image">'+
                 '<img src="img/home.jpg" height="330px">'+
                 '</div>'+
                 '<div class="card-stacked">'+
                  '<div class="card-content">'+
                   '<div>'+
                    `<b>Direccion: </b><p>${valor[i].Direccion}</p>`+
                   '</div>'+
                   '<div>'+
                    `<b>Ciudad: </b><p>${valor[i].Ciudad}</p>`+
                   '</div>'+
                   '<div>'+
                    `<b>Telefono: </b><p>${valor[i].Telefono}</p>`+
                   '</div>'+
                   '<div>'+
                    `<b>Codigo postal: </b><p>${valor[i].Codigo_Postal}</p>`+
                   '</div>'+
                   '<div>'+
                    `<b>Precio: </b><p>${valor[i].Tipo}</p>`+
                   '</div>'+
                   '<div>'+
                    `<b>Tipo: </b><p>${valor[i].Precio}</p>`+
                   '</div>'+
                   '</div>';


    listado.append(opctionB)
    y=1;
}
