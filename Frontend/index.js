const caminhoApi = 'http://localhost:3000/filmes';
const lista = document.getElementById('lista');
let edicao = false;
let idEdicao = 0;

//----Requisição GET para receber os filmes cadastrados--------
const getFilmes = async () => {
    const response = await fetch(caminhoApi);

    const data = await response.json();
    console.log(data);
    
    data.map((filme)=>{
        lista.insertAdjacentHTML('beforeend', `
            <h2 >Filme: <span class="movieName">${filme.name}</span></h2>
            <img class="igmUrl"src="${filme.image}" alt="Imagem do Filme">
            <p>Gênero: <span class="movieGenre">${filme.genre}</span></p>
            <p>Nota: <span class="rate">${filme.rate}</span></p>
            <button type="button" class="button" onclick="putVaga(${filme.id})">Editar</button>
            <button type="button" class="button" onclick="deleteVaga(${filme.id})">Excluir</button>
        `)
    })

}
getFilmes();



const submitForm = async (evento) => {
    evento.preventDefault();

    let name = document.getElementById('name');
    let image = document.getElementById('image');
    let genre = document.getElementById('genre');
    let rate = document.getElementById('rate');

    const filme = {
        name : name.value,
        image : image.value,
        genre : genre.value,
        rate : rate.value
    }
    
    if(!edicao) {
        const request = new Request(`${caminhoApi}/add`, {
            method: 'POST',
            body: JSON.stringify(filme),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })

        const response = await fetch(request);
        const result = await response.json();

        if(result) {
            getFilmes();
        }

    } else {
        const request = new Request(`${caminhoApi}/${idEdicao}`, {
            method: 'PUT',
            body: JSON.stringify(filme),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })

        const response = await fetch(request);
        const result = await response.json();

        if(result){
            getFilmes();
        }
    }


    name.value = '';
    image.value = '';
    genre.value = '';
    rate.value = '';

    lista.innerHTML = '';

}


const getFilmeById = async (id) => {
    const response = await fetch(`${caminhoApi}/${id}`);
    return filme = response.json();
}

const putFilme = async (id) => {
    edicao = true;
    idEdicao = id;

    const filme = await getFilmeById(id);

    let nameElement = document.getElementById('name');
    let imageElement = document.getElementById('image');
    let genreElement = document.getElementById('genre');
    let rateElement = document.getElementById('rate');

    nameElement.value = filme.name;
    imageElement.value = filme.image;
    genreElement.value = filme.genre;
    rateElement.value = filme.rate;


}

const deleteFilme = async (id) => {
    const request = new Request(`${caminhoApi}/${id}`, {
        method: 'DELETE',
    })
    const response = await fetch(request);
    const data = await response.json();
    console.log(data.message);

    lista.innerHTML = '';
    getFilmes();
}