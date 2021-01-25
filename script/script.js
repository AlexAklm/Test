//Объявление необходимых переменных
const form = document.querySelector("form").elements;
const table = document.querySelector("table");
const btn = document.querySelector(".create-btn");



//Массив содержащий объекты класса пользователей
users = [];

//Переменная для хранения id редактируемого пользователя
id = 0;


//Функция проверки заполнения полей, если хоть одно не заполнено, возвращает false
function check() {
    if(form.login.value !== "" && form.password.value !== "" && form.mail.value !== "") return true;
    else return false; 
}

//Вешаем событие на кнопку "Создать" при клике на неё
btn.addEventListener('click', (e) => {
    e.preventDefault();                         //Отменяет действие бразуера по-умолчанию - обновление страницы

    if(check()){                                //Поля проходят проверку на заполнение
        if(btn.textContent === "Создать"){             
            users.push({                            
                "login": form.login.value,
                "password": form.password.value,
                "email": form.mail.value,
                "gender": form.gender.value,
                "active": form.active.value
            })

            let newRow = table.insertRow();        
            let _login = newRow.insertCell(), 
                _mail = newRow.insertCell(), 
                _edit = newRow.insertCell();

            _login.innerHTML = form.login.value;
            _mail.innerHTML = form.mail.value;
            _edit.innerHTML = `<a href='#' id='${users.length - 1}' onclick='edit(this)'>Edit</a>`;

            form.login.value = "";
            form.password.value = "";
            form.mail.value = "";
        } else if(btn.textContent === "Сохранить"){
            users[id] = {                            
                "login": form.login.value,
                "password": form.password.value,
                "email": form.mail.value,
                "gender": form.gender.value,
                "active": form.active.value
            }
    

            table.rows[id+1].querySelectorAll("td")[0].innerHTML = users[id].login;
            table.rows[id+1].querySelectorAll("td")[1].innerHTML = users[id].email;
            
            form.login.value = "";
            form.password.value = "";
            form.mail.value = "";
            btn.textContent = "Создать"
        }
    } else {
        alert("Заполните все поля!");
    }
})


//Функция для начала редактирования пользователя
function edit(el) {
    id = Number(el.id); 
    form.login.value = users[id].login;
    form.password.value = users[id].password;
    form.mail.value = users[id].email;
    form.active.value = users[id].active;
    form.gender.value = users[id].gender;

    btn.textContent = "Сохранить";
}

