$(function() {
    // add jquery ui radio buttons
    $('.wrapper__radio').checkboxradio();


    var apiResponse = null;
    //function for make api call
    function requestApi(){
        var data = {'data':''};
        var url = 'http://api.qa.imumk.ru/api/mobilev1/update/';
        
        $.ajax({
            type: "POST",
            url: url,
            data: data,
            success: success,
            dataType: 'json'
        });
    
        function success(response){
            if(response.errorMessage){
                alert(response.errorMessage);
            } else {
                apiResponse = response.items;
                //if get response call render function which will render elements
                render();
            }
        }
    };

    requestApi();


    $( ".wrapper__form" ).submit(function( e ) {
        e.preventDefault();
        render();
    });
    
    var radios = document.getElementsByClassName('wrapper__fieldset')[0];
    var sub = document.getElementById('subject');
    var gen = document.getElementById('genre');
    var gra = document.getElementById('grade');
    var search = document.getElementById('search');

    // if any input was changed make new render
    radios.addEventListener('click', render);
    sub.addEventListener('change', render);
    gen.addEventListener('change', render);
    gra.addEventListener('change', render);
    search.addEventListener('input', render);


    // function for render elements with api data
    function render(){

        // delete old elements
        var apiItems = document.getElementsByClassName("api-items")[0];
        if(apiItems){
            apiItems.parentNode.removeChild(apiItems);    
        }

        //get values from inputs
        var subjectVal = sub.value;
        var genreVal = gen.value;
        var gradeVal = gra.value;
        var searchVal = document.getElementById('search').value;
        var priceRub = document.getElementById('radio-1').checked;

        searchVal = searchVal.toLowerCase();
        searchVal = searchVal.replace(/\s/g, '');

        //make wrapper for elements
        flexContainer = document.createElement('div');
        flexContainer.classList += ' flex-container api-items';
        document.getElementsByClassName('wrapper')[0].appendChild(flexContainer);

        // go through apiResponse arr and render elements dependence of inputs values
        for(var i=0; i<apiResponse.length; i++){
            var item = apiResponse[i];
            if(subjectVal === 'Все предметы' || item.subject.indexOf(subjectVal)  > -1 ){
                if(genreVal === 'Все жанры' || item.genre.indexOf(genreVal)  > -1 ){
                    if(gradeVal === 'Все классы' || item.grade.indexOf(gradeVal)  > -1 ){
                        item.title = item.title.toLowerCase();
                        item.title = item.title.replace(/\s/g, '');
                        if(searchVal === '' || item.title.indexOf(searchVal) > -1 ){

                            // create elements
                            var flex__content = document.createElement('div');
                            var figure = document.createElement('div');
                            var info = document.createElement('div');
                            var cover = document.createElement('img');
                            var figure__modal = document.createElement('div');
                            var subject = document.createElement('p');
                            var grade = document.createElement('p');
                            var genre = document.createElement('p');
                            var more = document.createElement('p');
                            var buy = document.createElement('p');
                            var a1 = document.createElement('a');
                            var a2 = document.createElement('a');
                            var a3 = document.createElement('a');

                            //add classes for elements
                            flex__content.classList += " flex__content";
                            figure.classList += " figure";
                            info.classList += " info";
                            cover.classList += " cover";
                            figure__modal.classList += " figure__modal";
                            subject.classList += " subject";
                            grade.classList += " grade";
                            genre.classList += " genre";
                            more.classList += " more";
                            buy.classList += " buy";

                            //insert data from api arr in elements
                            cover.src = 'https://www.imumk.ru/covers/' +item.courseId+ '.png';
                            a1.href = '#';
                            a1.innerHTML = 'Попробовать';
                            a2.href = item.shopUrl || '#';
                            a2.innerHTML = 'Подробнее';                        
                            a3.href = '#';
                            a3.innerHTML = 'Купить за ' + (priceRub ? item.price + ' руб.' : item.priceBonus + ' бон.');
                            a3.setAttribute("data-price", item.price);
                            a3.setAttribute("data-pricebonus", item.priceBonus);
                            subject.innerHTML = item.subject;                        
                            grade.innerHTML = item.grade + ' класс';                        
                            genre.innerHTML = item.genre;                        
                            
                            
                            flex__content.appendChild(figure);
                            flex__content.appendChild(info);
                            figure.appendChild(cover);                        
                            figure.appendChild(figure__modal);
                            figure__modal.appendChild(a1);
                            info.appendChild(subject);
                            info.appendChild(grade);
                            info.appendChild(genre);
                            info.appendChild(more);
                            info.appendChild(buy);
                            more.appendChild(a2);
                            buy.appendChild(a3);
                            flexContainer.appendChild(flex__content);
                        }    
                    } 
                }
            }
        }
    };

 
})
