
var link = document.querySelector(".write-us-link");

var popup = document.querySelector(".modal-login");
var close = popup.querySelector(".modal-close");

var form = popup.querySelector("form");
var username = popup.querySelector("[name=name]");
var email = popup.querySelector("[name=e-mail]");
var letter = popup.querySelector("[name=letter]");

var isStorageSupport = true;
var storage = "";

try {
  storage = localStorage.getItem("username"); // Только одно значение. Для емейла нужен дополнительный код
} catch (err) {
  isStorageSupport = false;
}

link.addEventListener("click", function (evt) {
  evt.preventDefault();
  popup.classList.add("modal-show");

  if (storage) {   // Если значение существует, записываем логин в соответствующее поле ввода при открытии модального окна. из localStorage соответственно
    username.value = storage;
    // email.value = storage;
    letter.focus(); // странная фигня какая-то
  } else {
    username.focus(); //при открытии формы фокус автоматически устанавливался в поле ввода логина.
  }
});

close.addEventListener("click", function (evt) {
  evt.preventDefault();
  popup.classList.remove("modal-show");
  popup.classList.remove("modal-error");
});

form.addEventListener("submit", function (evt) {
  if (!username.value || !email.value) {
    evt.preventDefault();   // отменяем стандартное поведение формы
    popup.classList.remove("modal-error");
    popup.offsetWidth = popup.offsetWidth; // Хак. чтобы анимация ошибки отрабатывала несколько раз, если форма не валидна.
    popup.classList.add("modal-error");
  } else {
    if (isStorageSupport) {
      localStorage.setItem("username", username.value);
    //   localStorage.setItem("email", email.value);
    }
  }
});

window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    if (popup.classList.contains("modal-show")) {
      popup.classList.remove("modal-show");
      popup.classList.add("modal-error");
    }
  }
});