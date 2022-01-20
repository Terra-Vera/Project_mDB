/* Задания на урок:

1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.

2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки

3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)

4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
"Добавляем любимый фильм"

5) Фильмы должны быть отсортированы по алфавиту */

'use strict';



document.addEventListener('DOMContentLoaded', () => {
    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    };
    let promoAdv = document.querySelectorAll('.promo__adv img'), // вытащили рекламные картинки//
        poster = document.querySelector('.promo__bg'), // вытащили заднюю картинку//
        promoGenre = poster.querySelector('.promo__genre'), // вытащиили строчку из вёрстки с жанрами//
        films = document.querySelector('.promo__interactive-list'), // вытащили список фильмов//
        addForm = document.querySelector('form.add'), //формы //
        addBtn = addForm.querySelector('button'), //кнопку "потдвердить" //
        checkbox = addForm.querySelector('[type="checkbox"]'), //галочку " добавить в любимые" //
        addInput = addForm.querySelector('.adding__input'); //форму "новый фильм" //
        

    addForm.addEventListener('submit', (event) => {
        event.preventDefault(); // обнулили браузер//
        let newFilm = addInput.value; //сюда запишется значение формы //        
        let favorite = checkbox.checked; //проверка галочки //
        if (newFilm) {
            if (newFilm.length > 21) {
                newFilm = `${ newFilm.substring(0, 22)}...`;
            }

            if (favorite) {
                console.log('Добавляем любимый фильм');
            }


            movieDB.movies.push(newFilm); // новый фильм добавиться в массив//
            movieDB.movies.sort();    // весь массив поменяет порядок на алфавитный//
            creatMovieList(movieDB.movies, films);  // //

        } else {
            console.log('ERROR!');
        }
        event.target.reset(); // сбросили форму
    });
    
    const deleteAdv = (arr) => {
        arr.forEach(item => {
            item.remove();
        }); // функция которая удаляет все айтемы из массива//
    };

    const arrSort = arr => {
        arr.sort();
    };

    const makeChanges = () => {
        promoGenre.textContent = 'драма';
        poster.style.backgroundImage = 'url("img/bg.jpg")';
    }; 



    function creatMovieList(film, parent) { // аргументы - массив куда пойдут фильмы и батька куда толкать элементы//
        parent.innerHTML = ''; // обнулили батьку в вёрстке//
        film.forEach((film, i) => { //цикл добавляющий фильм с его порядковым номером //
            parent.innerHTML += `   
            <li class="promo__interactive-item"> ${i + 1}. ${film}
                <div class="delete"></div>
            </li>
            `; // вставили вёртву обратно. каждый фильм элемент списка//
            arrSort(movieDB.movies);
        });

        document.querySelectorAll('.delete').forEach((btn, i) => {
            btn.addEventListener('click', () => {
                btn.parentElement.remove();
                movieDB.movies.splice(i, 1);
                creatMovieList(movieDB.movies, films); 
            });
        });

    } 
    creatMovieList(movieDB.movies, films); // //
    deleteAdv(promoAdv); // удалили рекламные картинки//
    makeChanges(); // //
 
});