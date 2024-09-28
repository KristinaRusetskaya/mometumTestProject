export class Clock {
    constructor() {
        this.timer = document.getElementById('momentum-clock-time');
        this.dateElement = document.getElementById('momentum-clock-date');

        this.time();
        this.date();
    }

    time() {
        function getTime() {
            return (new Date()).toLocaleTimeString();
        }

        function renderTime(timer){
            timer.textContent = getTime();
            setTimeout(renderTime, 1000, timer);
        }
        renderTime(this.timer);
    }

    date() {
        function convertDate() {
            const date = new Date();
            const weekday = new Intl.DateTimeFormat('ru', {
                weekday: "long"
            }).format(date);
            const today = new Intl.DateTimeFormat('ru', {
                month: "long",
                day: "numeric",
            }).format(date);
            return today + ', ' + weekday;
        }

        function renderDate(date){
            date.textContent = convertDate();
            setTimeout(renderDate, 1000, date);
        }
        renderDate(this.dateElement);
    }
}