document.addEventListener("DOMContentLoaded", function () {
    // Обработка формы RSVP
    document.getElementById("rsvpForm").addEventListener("submit", function(event) {
        event.preventDefault(); // Предотвращаем перезагрузку страницы

        let formData = new FormData(this); // Получаем все данные формы

        fetch("send_rsvp.php", {
            method: "POST",
            body: formData
        })
        .then(response => response.text()) // Ожидаем текстовый ответ от сервера
        .then(data => {
            // Показываем уведомление об успешной отправке
            document.getElementById("rsvpResponseMessage").style.display = "block";
            document.getElementById("rsvpResponseMessage").textContent = "✅ Ответ отправлен!";
            setTimeout(() => {
                document.getElementById("rsvpResponseMessage").style.display = "none";
            }, 3000); // Прячем уведомление через 3 секунды
            this.reset(); // Очищаем форму
        })
        .catch(error => {
            // Если произошла ошибка
            document.getElementById("rsvpResponseMessage").style.display = "block";
            document.getElementById("rsvpResponseMessage").textContent = "⚠ Ошибка отправки!";
        });
    });

    // Обработка формы гостевой книги
   // Обработка формы гостевой книги
    document.getElementById("guestbookForm").addEventListener("submit", function(event) {
        event.preventDefault(); // Предотвращаем перезагрузку страницы

        let formData = new FormData(this); // Получаем все данные формы

        fetch("send_guestbook.php", {
            method: "POST",
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Ошибка на сервере');
            }
            return response.text(); // Ожидаем текстовый ответ от сервера
        })
        .then(data => {
            // Показываем уведомление об успешной отправке
            let responseMessage = document.getElementById("guestbookResponseMessage");
            responseMessage.style.display = "block";
            responseMessage.textContent = "✅ Ваше сообщение отправлено!";

            setTimeout(() => {
                responseMessage.style.display = "none"; // Прячем уведомление через 3 секунды
            }, 3000);

            // Добавляем сообщение в гостевую книгу (не перезагружая страницу)
            let guestbookMessages = document.getElementById('guestbookMessages');
            guestbookMessages.innerHTML += `<p><strong>${formData.get("name")}</strong>: ${formData.get("message")}</p>`;

            this.reset(); // Очищаем форму
        })
        .catch(error => {
            // Если произошла ошибка
            let responseMessage = document.getElementById("guestbookResponseMessage");
            responseMessage.style.display = "block";
            responseMessage.textContent = "⚠ Ошибка отправки!";
            
            // Прячем уведомление через 3 секунды
            setTimeout(() => {
                responseMessage.style.display = "none";
            }, 3000);
        });
    });


    // Кнопка "Наверх"
    const backToTopButton = document.getElementById('backToTop');

    // Когда прокручиваем страницу
    window.onscroll = function() {
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            backToTopButton.style.display = "block"; // Показываем кнопку
        } else {
            backToTopButton.style.display = "none"; // Прячем кнопку
        }
    };

    // Когда нажимает на кнопку
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Плавная прокрутка наверх
    });

    // Обратный отсчет до свадьбы
    function updateCountdown() {
        const weddingDate = new Date("July 15, 2025 00:00:00").getTime(); // Дата свадьбы

        // Текущая дата
        const now = new Date().getTime();

        // Расстояние между датами
        const distance = weddingDate - now;

        // Вычисляем дни, часы, минуты и секунды
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Отображаем результат
        document.getElementById("countdown").innerHTML =
            days + "д " + hours + "ч " + minutes + "м " + seconds + "с ";

        // Если свадьба наступила
        if (distance < 0) {
            clearInterval(x);
            document.getElementById("countdown").innerHTML = "Свадьба уже прошла!";
        }
    }

    // Обновляем счетчик каждую секунду
    const x = setInterval(updateCountdown, 1000);

    // Вызываем функцию один раз для мгновенного отображения
    updateCountdown();

    // Получаем все изображения слайдера
    const slides = document.querySelectorAll('.photo-slider img');
    let currentSlide = 0;

    // Функция для показа следующего слайда
    function showNextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    // Функция для показа предыдущего слайда
    function showPrevSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    // Автоматическое переключение слайдов
    setInterval(showNextSlide, 5000); // Переключение каждые 5 секунд

    // Обработчики событий для кнопок
    document.querySelector('.next').addEventListener('click', showNextSlide);
    document.querySelector('.prev').addEventListener('click', showPrevSlide);

    // Закрытие модального окна
    document.getElementById("closeModal").addEventListener("click", function() {
        document.getElementById("thankYouModal").style.display = "none";
    });
});