const apiUrlPlato =
  "http://www.themealdb.com/api/json/v1/1/search.php?s=";
const apiUrlIngrediente =
  "http://www.themealdb.com/api/json/v1/1/filter.php?i=";
const apiUrlCategoria =
  "http://www.themealdb.com/api/json/v1/1/filter.php?c=";
const apiUrlNacionalidad =
  "http://www.themealdb.com/api/json/v1/1/filter.php?a=";
async function consultarApiComida(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(`fallo la consulta a la api: ${error}`);
  }
}

async function obtenerDatosComida(url) {
    const datos = await consultarApiComida(url);

    let nombreComida = document.querySelector(".trial");
    try{
    nombreComida.innerHTML = datos.meals[0].strArea;
    }catch (error){
        console.error('ingrese otro dato');
        nombreComida.innerHTML="ingrese otro dato"
    }
  }
async function obtenerDatosCategoria(url) {
    const datos = await consultarApiComida(url);

    let nombreComida = document.querySelector(".trial");
    try{
    nombreComida.innerHTML = datos.meals[0].strMeal;
    }catch (error){
        console.error('ingrese otro dato');
        nombreComida.innerHTML="ingrese otro dato"
    }
  }
async function obtenerDatosIngrediente(url) {
    const datos = await consultarApiComida(url);

    let nombreComida = document.querySelector(".trial");
    try{
    nombreComida.innerHTML = datos.meals[0].strMeal;
    }catch (error){
        console.error('ingrese otro dato');
        nombreComida.innerHTML="ingrese otro dato"
    }
  }
async function obtenerDatosNacionalidad(url) {
    const datos = await consultarApiComida(url);

    let nombreComida = document.querySelector(".trial");
    try{
    nombreComida.innerHTML = datos.meals[0].strMeal;
    }catch (error){
        console.error('ingrese otro dato');
        nombreComida.innerHTML="ingrese otro dato"
    }
  }
const searchButton = document.querySelector(".Busqueda button");
const searchInput = document.querySelector(".Busqueda input");


searchButton.addEventListener("click", () => {
    const selectElement = document.querySelector(".Expandible");
    const selectedOption = selectElement.options[selectElement.selectedIndex];
    const selectedValue = selectedOption.value;
    const selectedText = selectedOption.textContent;
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
        obtenerDatosCategoria(url3);
      break;
    case "opcion4":
      apiUrl = apiUrlNacionalidad; 
      const nombreNacionalidad = searchInput.value;
      console.log(selectedValue);
      console.log(nombreNacionalidad);
      console.log(apiUrl)
      const url4 = `${apiUrl}${nombreNacionalidad}`;
      console.log(url4);
      obtenerDatosNacionalidad(url4);
      break;

    default:
      apiUrl = apiUrlPlato;
    }
    
  });