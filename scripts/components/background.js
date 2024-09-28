export class Background {
    constructor() {
        setInterval(this.getBackground.bind(this), 1000);
    }

    getBackground() {
        const theTime = new Date();
        const theHour = theTime.getHours();
        if (theHour >= 0 && theHour < 6){
            document.body.setAttribute("style", 'background-image: url("../../images/bgNight.jpg")');
        }
        else if (theHour >= 6 && theHour < 12){
            document.body.setAttribute("style", 'background-image: url("../../images/bgMorning.jpg")');
        }
        else if (theHour >= 12 && theHour < 18){
            document.body.setAttribute("style", 'background-image: url("../../images/bgDay.jpg")');
        }
        else if (theHour >= 18 && theHour <= 23){
            document.body.setAttribute("style", 'background-image: url("../../images/bgEvening.jpg")');
        }
    }
}