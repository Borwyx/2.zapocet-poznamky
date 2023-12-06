//volanie funkcie getImages() prebehne az po uspesnom nacitani DOMcontentu zo stranky
//pridam samotnemu dokumentu listener, ktory reaguje na nacitanie DOM 
document.addEventListener('DOMContentLoaded', function () {
    getImages();
});

//do premennej sme nahrali idecko divka v html a teraz s nim mozme dynamicky pracovat, napr pridat listener
var divElement =  document.getElementById("get-div-element");
divElement.addEventListener('click', (event) => {
    //vypisanie hodnoty 
    console.log(event.target);
});


//-----------NACITANIE SUBOROV (JSON, XML, URL)-----------
function getImages(){
    //API fetch vrati objekt typu PROMISE, ktory infromuje o tom, ci boli udaje uspesne nacitane
    return fetch('photos.json')

    //vyhodnotenie vrateneho objektu
    .then(response => {
        if (response.ok) {
            //.json spracuje reponse do js objetku
            return response.json(); 
        }else{
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
    })

    //spracovanie dat
    .then(data => {

        //cyklus, ktory prechadza cez vsetky elementy (v nasom pripade fotky) 
        data.sizes.forEach(size => {
            //-----------PRIDAVANIE ELEMENTU DO ELEMENTOV-----------
                //vytvorim element, pre kazdu fotku
                let lilDiv = document.createElement('div');
                //pridam element do listu
                lilDiv.classList.add('lilDiv');
                //ak chceme pridat funkciu na listener BEZ parametru: lilDiv.addEventListener('click', nothing);
                //ak by sme pridali nothing(), tak funkcia by sa volala hned co nechceme 
                lilDiv.addEventListener('click', () => nothing(lilDiv)); 

                //-----------DYNAMICKE MENENIE SIRKY A VYSKY VNUTORNEHO DIVU-----------
                    lilDiv.style.width = size.width + 'px';
                    lilDiv.style.height = size.height + 'px';

                let bigDiv = document.createElement('div');
                //ked pridam do listu, tak potom to mozem v css upravovat
                bigDiv.classList.add('bigDiv');
                //pridal som potomka do rodica: <rodic> <potomok></potomok> </rodic>
                bigDiv.appendChild(lilDiv);

                divElement.appendChild(bigDiv);
        })

        console.log(data);
    })

    //spracovanie chyby
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}

function nothing(lilDiv) {
    console.log(lilDiv);
}
