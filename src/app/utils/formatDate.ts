export class FormateDate {
    static getDayMonthYear(date) {
        let dateT = new Date(date);
        let month = dateT.getUTCMonth() + 1;
        let day = dateT.getUTCDate();
        let year = dateT.getUTCFullYear();

        let hours = dateT.getHours();
        let minutes = dateT.getMinutes();
        let ampm = hours >= 12 ? 'pm' : 'am';

        const newDate = day + '/' + month + '/' + year + ' ' + hours + ':' + minutes + ampm;
        return newDate;
    }

    static timeSince(current, previous) {
        let msPerMinute = 60 * 1000;
        let msPerHour = msPerMinute * 60;
        let msPerDay = msPerHour * 24;
        let msPerMonth = msPerDay * 30;
        let msPerYear = msPerDay * 365;
    
        let elapsed = current - previous;
    
        if (elapsed < msPerMinute) {
             return 'Hace ' + Math.round(elapsed/1000) + ' segundo(s)';
        }
    
        else if (elapsed < msPerHour) {
             return 'Hace ' + Math.round(elapsed/msPerMinute) + ' minuto(s)';
        }
    
        else if (elapsed < msPerDay ) {
             return 'Hace ' + Math.round(elapsed/msPerHour ) + ' hora(s)';   
        }
    
        else if (elapsed < msPerMonth) {
            return 'Hace ' + Math.round(elapsed/msPerDay) + ' día(s)';   
        }
    
        else if (elapsed < msPerYear) {
            return 'Hace ' + Math.round(elapsed/msPerMonth) + ' mese(s)';   
        }
    
        else {
            return 'Hace ' + Math.round(elapsed/msPerYear ) + ' año(s)';   
        }
    }
}