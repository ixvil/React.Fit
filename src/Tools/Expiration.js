import moment from "moment/moment";

class Expiration {
    static getDate(userTicket) {
        return moment(userTicket.expirationDate);

    }
}

export default Expiration;