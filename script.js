const apiUrlPlato =
  "http://www.themealdb.com/api/json/v1/1/search.php?s=";
const apiUrlIngrediente =
  "http://www.themealdb.com/api/json/v1/1/filter.php?i=";
const apiUrlCategoria =
  "http://www.themealdb.com/api/json/v1/1/filter.php?c=";
const apiUrlNacionalidad =
  "http://www.themealdb.com/api/json/v1/1/filter.php?a=";
let params = new URLSearchParams(window.location.search);
let texto = params.get('texto');
console.log(texto);
const url10 = `${apiUrlPlato}${texto}`;
try{
  obtenerDatoFinales(url10);
}catch{
  console.log("pagina origen");
}
async function consultarApiComida(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(`fallo la consulta a la api: ${error}`);
  }
}
let comida;
async function obtenerDatoFinales(url) {
  try{
    const datos = await consultarApiComida(url);
    const nombre_plat = document.querySelector(".nombre_plato");
    nombre_plat.innerHTML=datos.meals[0].strMeal;
    const ingredientes= document.querySelector(".ingrediente_t")
    const ref_img =document.querySelector(".imagen_referencia");
    ref_img.src = datos.meals[0].strMealThumb;
    console.log(ref_img.src)
    let meals = datos.meals[0];
    ingredientes.innerHTML += "Ingredientes:"+"<br>"+"<br>";
    for(let i = 1;; i++) {
    let ingredient = meals["strIngredient" + i];
    if(ingredient === "") {
        break;
    }
    ingredientes.innerHTML += ingredient +'<br>';
    }
    const receta= document.querySelector(".receta_t");
    let instructions = datos.meals[0].strInstructions.split('\r\n');
    let numberedInstructions = '';

    for(let i = 1; i < instructions.length; i++) {
        if(instructions[i] !== '') {
            numberedInstructions += instructions[i] + '<br> <br>';
        }
    }
receta.innerHTML += "Pasos:"+"<br><br>"
receta.innerHTML += numberedInstructions;

  }catch{
    console.log("pagina origen");
  }
}

async function obtenerDatosComida(url) {
    const datos = await consultarApiComida(url);
    const info= document.querySelector(".t_validacion");
    const contError = document.querySelector(".error_validacion");
    const b_conf =document.querySelector(".boton_seleccion");
    const infor =document.querySelector(".informacion");
    const c_img =document.querySelector(".imagen_comida");
    
    let nombreComida = document.querySelector(".trial");
    try{
    console.log(datos.meals[0].strArea);
    contError.style.display= "none";
    info.style.display="block";
    info.innerHTML ="Usted a seleccionado: "+ datos.meals[0].strMeal;
    comida=datos.meals[0].strMeal;
    console.log(comida);
    c_img.src = datos.meals[0].strMealThumb;
    c_img.style.display="block";
    b_conf.style.display="block";
    infor.style.display="none";
    }catch (error){
        c_img.style.display="none";
        info.style.display="none";
        b_conf.style.display="none";
        infor.style.display="none";
        console.error('ingrese otro dato');
        console.log(contError.value);
        contError.style.display= "block";
    }
  }

async function obtenerDatosIngrediente(url) {
    const datos = await consultarApiComida(url);
    const info= document.querySelector(".t_validacion");
    const b_conf =document.querySelector(".boton_seleccion");
    const infor =document.querySelector(".informacion");
    const c_img =document.querySelector(".imagen_comida");
    const contError = document.querySelector(".error_validacion");
    let opcionesDiv = document.querySelector('.Opciones');
    while(opcionesDiv.firstChild) {
      opcionesDiv.removeChild(opcionesDiv.firstChild);
    } 
    try{
      console.log(datos.meals[0].strArea);
      contError.style.display= "none";
 

      let imgSeleccionada;

      try {
          infor.style.display="block";
          for(let i = 0; i <= 17; i++) {
              let plate = datos.meals[i].strMeal;

              let words = plate.split(' ');

              if (words.length > 3) {
                  plate = words.slice(0, 3).join(' ');
              }

              let imagen = datos.meals[i].strMealThumb;
              console.log(plate);
      
              let plateDiv = document.createElement('div');
              let pElement = document.createElement('p');
              let imgElement = document.createElement('img');
      
              imgElement.src = imagen;
              pElement.textContent = plate;
      
              imgElement.addEventListener('click', function() {
                  if(imgSeleccionada) {
                      imgSeleccionada.style.border = '';
                  }
      
                  this.style.border = '3px solid red';
                  
                  b_conf.style.display="block";
                  
                  imgSeleccionada = this;
      
                  comida = plate;
              });
      
              plateDiv.appendChild(pElement);
              plateDiv.appendChild(imgElement);
      
              opcionesDiv.appendChild(plateDiv);
          }
      } catch {}

    
    }catch (error){
      c_img.style.display="none";
        info.style.display="none";
        infor.style.display="none";
        b_conf.style.display="none";
        console.error('ingrese otro dato');
        console.log(contError.value);
        contError.style.display= "block";
    }
  }
const searchButton = document.querySelector(".Busqueda button");
const searchInput = document.querySelector(".Busqueda input");

try{
const searchVolver= document.querySelector(".volver");
searchVolver.addEventListener("click", () => {window.location.href = '/index.html'});
}catch{
}
try{
  const searchSeleccionSi = document.querySelector(".b_si");
  const searchSeleccionNo = document.querySelector(".b_no");
  const ListTry= document.querySelector(".Expandible");

ListTry.addEventListener("click", () => {
    const contError = document.querySelector(".error_validacion");
    contError.style.display= "none";
  });

searchSeleccionSi.addEventListener("click", () => {window.location.href = '/resultado.html?texto=' + encodeURIComponent(comida);});

searchSeleccionNo.addEventListener("click", () => {
  const info= document.querySelector(".t_validacion");
  const c_img =document.querySelector(".imagen_comida");
  c_img.style.display="none";
  const b_conf =document.querySelector(".boton_seleccion");
  const infor =document.querySelector(".informacion");
  info.style.display="none";
  b_conf.style.display="none";
  infor.style.display="none";
  searchInput.value = "";
  let opcionesDiv = document.querySelector('.Opciones');
    while(opcionesDiv.firstChild) {
      opcionesDiv.removeChild(opcionesDiv.firstChild);
    } 
});

searchButton.addEventListener("click", () => {
    const selectElement = document.querySelector(".Expandible");
    const info= document.querySelector(".t_validacion");
    const selectedOption = selectElement.options[selectElement.selectedIndex];
    const selectedValue = selectedOption.value;
    const selectedText = selectedOption.textContent;
    const infor =document.querySelector(".informacion");
    const b_conf =document.querySelector(".boton_seleccion");
    const c_img =document.querySelector(".imagen_comida");
    let opcionesDiv = document.querySelector('.Opciones');
    while(opcionesDiv.firstChild) {
      opcionesDiv.removeChild(opcionesDiv.firstChild);
    } 
    
    c_img.style.display="none";
    info.style.display="none";
    b_conf.style.display="none";
    infor.style.display="none";
    let apiUrl;

    switch (selectedValue) {
    case "opcion1":
        apiUrl = apiUrlPlato;
        const nombrePlato = searchInput.value;
        console.log(selectedValue);
        console.log(nombrePlato);
        console.log(apiUrl)
        const url1 = `${apiUrl}${nombrePlato}`;
        console.log(url1);
        obtenerDatosComida(url1);
      break;
    case "opcion2":
      apiUrl = apiUrlIngrediente;
      const nombreIngrediente = searchInput.value;
        console.log(selectedValue);
        console.log(nombreIngrediente);
        console.log(apiUrl)
        const url2 = `${apiUrl}${nombreIngrediente}`;
        console.log(url2);
        obtenerDatosIngrediente(url2);
      break;
    case "opcion3":
      apiUrl = apiUrlCategoria;
      const nombreCategoria = searchInput.value;
        console.log(selectedValue);
        console.log(nombreCategoria);
        console.log(apiUrl)
        const url3 = `${apiUrl}${nombreCategoria}`;
        console.log(url3);
        obtenerDatosIngrediente(url3);
      break;
    case "opcion4":
      apiUrl = apiUrlNacionalidad; 
      const nombreNacionalidad = searchInput.value;
      console.log(selectedValue);
      console.log(nombreNacionalidad);
      console.log(apiUrl)
      const url4 = `${apiUrl}${nombreNacionalidad}`;
      console.log(url4);
      obtenerDatosIngrediente(url4);
      break;

    default:
      apiUrl = apiUrlPlato;
    }
    
  });
}catch{
}
