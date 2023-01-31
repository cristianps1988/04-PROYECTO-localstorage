// variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];


// listeners
eventListeners();
function eventListeners(){
    formulario.addEventListener('submit', agregarTweet);

    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];
        crearHTML();
    })
}


// funciones

function agregarTweet(e){
    e.preventDefault();
    // text area
    const tweet = document.querySelector('#tweet').value;
    // validar
    if(tweet === ''){
        mostrarError('Un mensaje no puede ir vacio')
        return
    }
    // aniadir al arreglo de tweets
    const tweetsObj = {
        id: Date.now(),
        tweet // es igual a... tweet: tweet
    }
    tweets = [...tweets, tweetsObj];

    // crear html
    crearHTML();

    // reiniciar el formulario
    formulario.reset();
}

// mostrar mensaje de error
function mostrarError(error){
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    // elimina mensaje luego de 3 segundos
    setTimeout(() => {
        mensajeError.remove();
    }, 3000);
}

// muestra un listado de los tweets
function crearHTML(){
    limpiarHTML();
    if(tweets.length > 0){
        tweets.forEach( e => {
            // crear boton de eliminar
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.textContent = 'X';

            // agregar funcion de eliminar
            btnEliminar.onclick = () => {
                borrarTweet(e.id);
            }

            const li = document.createElement('li');
            li.textContent = e.tweet;
            listaTweets.appendChild(li);
            li.appendChild(btnEliminar);

        })
    }
    sincronizarStorage();
}

function sincronizarStorage(){
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

// limpiar el html
function limpiarHTML(){
    while(listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild)
    }
};

function borrarTweet(id){
    tweets = tweets.filter( e => e.id !== id )
    crearHTML();
}