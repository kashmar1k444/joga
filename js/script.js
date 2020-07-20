window.addEventListener('DOMContentLoaded', () => {

    'use strict';

    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');

        function hideTabContent(a) {
            for( let i = a ; i < tabContent.length ; i++) {
                tabContent[i].classList.add('hide');
                tabContent[i].classList.remove('show');
            }
        }


        hideTabContent(1);


        function showTabContent(b) {
            if (tabContent[b].classList.contains('hide')) {
                tabContent[b].classList.remove('hide');
                tabContent[b].classList.add('show');
            }
        }

        info.addEventListener('click' , (event) => {
            let target = event.target;
            if( target && target.classList.contains('info-header-tab')) {
                for( let i = 0; i < tab.length; i++) {
                    if(target == tab[i]){
                        hideTabContent(0);
                        showTabContent(i);
                        break;
                    }
                }
            }
        });


// timer

let deadLine = '2020-08-06';

function getTimeRemaining(endtime) {
    let t = Date.parse( endtime ) - Date.parse(new Date()),
        seconds = Math.floor((t/1000)%60 ),
        minutes = Math.floor(((t/1000)/60)%60 ),
        hours = Math.floor((t/(1000*60*60)));

        return {
            'total' : t ,
            'second' : seconds ,
            'minutes' : minutes ,
            'hours' : hours 
        };
}

function setClock(id , endtime) {
    let timer = document.getElementById(id),
        hours = timer.querySelector('.hours'),
        minutes = timer.querySelector('.minutes'),
        seconds = timer.querySelector('.seconds'),
        timeInterval = setInterval(updateClock , 1000);


        function updateClock() {
            let t = getTimeRemaining(endtime);
                hours.textContent = t.hours;
                minutes.textContent = t.minutes;
                seconds.textContent = t.second;
            if(t.total <= 0){
                clearInterval(timeInterval);
            }

        }
};
setClock('timer' , deadLine);

//button

let more = document.querySelector('.more'),
    close = document.querySelector('.popup-close'),
    overlay = document.querySelector('.overlay');

    more.addEventListener('click' , function() {
        overlay.style.display = 'block';
        this.classList.add('more-splash');
        document.body.style.overflow = 'hidden';
    })
    close.addEventListener('click' , function() {
        overlay.style.display = 'none';
        more.classList.remove('more-splash');
        document.body.style.overflow = '';
    });

//


//form



     // Form

     let message = {
        loading: 'Загрузка...',
        success: 'Спасибо!!!',
        failure: 'Ошибка...'
    };

    let form = document.querySelector('.main-form'),
        input = form.getElementsByTagName('input'),
        statusMessage = document.createElement('div');

        statusMessage.classList.add('status');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        form.appendChild(statusMessage);

        let request = new XMLHttpRequest();
        request.open('POST', 'server.php');
        request.setRequestHeader('Content-type', 'application/json; charset=utf-8');

        let formData = new FormData(form);

        let obj = {};
        formData.forEach(function(value, key) {
            obj[key] = value;
        });
        let json = JSON.stringify(obj);

        request.send(json);

        request.addEventListener('readystatechange', function() {
            if (request.readyState < 4) {
                statusMessage.innerHTML = message.loading;
            } else if(request.readyState === 4 && request.status == 200) {
                statusMessage.innerHTML = message.success;
            } else {
                statusMessage.innerHTML = message.failure;
            }
        });

        for (let i = 0; i < input.length; i++) {
            input[i].value = '';
        }



        
    });

//slider

    let sliderIndex = 1 ,
        slides = document.querySelectorAll('.slider-item'),
        prev = document.querySelector('.prev'),
        next = document.querySelector('.next'),
        dotsWrap = document.querySelector('.slider-dots'),
        dots = document.querySelectorAll('.dot');

    function showSlides(n) {
        if(n > slides.length){
            sliderIndex = 1;
        } 
        if(n < 1){
            sliderIndex = slides.length;
        }
        slides.forEach((item) => item.style.display = 'none');

        dots.forEach((item) => item.classList.remove('dot-active'));

        slides[sliderIndex - 1].style.display = 'block';
        dots[sliderIndex - 1].classList.add('dot-active');


    }

    function plusSlides(n) {
        showSlides(sliderIndex += n);
    }


    function currentSlide(n){
        showSlides(sliderIndex = n);
    }

    prev.addEventListener('click' , function() {
        plusSlides(-1);
    });


    next.addEventListener('click' , function() {
        plusSlides(1);
    });

    dotsWrap.addEventListener('click' , function(event) {
        for(let i = 0 ; i < dots.length + 1; i++){
            if(event.target.classList.contains('dot') && event.target == dots[i-1]){
                currentSlide(i);
            }
        }
    })

    showSlides(sliderIndex);
});

// let valueOpt = document.querySelectorAll('option').getAttribute('value');
// console.log(valueOpt);
//form

function calc() {
    let amountPeople = document.querySelectorAll('.counter-block-input')[0],
        amountDays = document.querySelectorAll('.counter-block-input')[1],
        totalSum = document.getElementById('total'),
        people = 0 ,
        days = 0 ,
        total = 0 ;

    totalSum.innerHTML = 0;


    amountPeople.addEventListener('input' , function() {
        people = +this.value;
        total = (people + days) * 120 ;
        if(amountDays.value == ''){
            totalSum.innerHTML = 0;
            days = 0;
            people = 0;
        } else {
            totalSum.innerHTML = total;
        }
    });

    amountDays.addEventListener('input' , function() {
        days = +this.value;
        total = (people + days) * 120 ;
        if(amountPeople.value == ''){
            totalSum.innerHTML = 0;
            people = 0;
            days = 0;
        }  else {
            totalSum.innerHTML = total;
        }
    });

    let place = document.getElementById('select')

    place.addEventListener('change' , function() {
        if(amountPeople.value == '' || amountDays.value == ''){
            totalSum.innerHTML = 0;
            people = 0;
            days = 0;
        } else {
            let a = total;
            totalSum.innerHTML = a * this.options[this.selectedIndex].value;
        }

    });
}

calc();