const mongoose = require('mongoose');
const dbString = process.env.DBString;

var dbHelper = class dbHelper {
    constructor() {}
    Connect() {}
    AddToMessages() {
        console.log("AddToMessages needs a parameter");
    }
    GetLastMessages() {}
}
class mongoDB extends dbHelper {
    constructor() {
        super();
        var mesageSchema = new mongoose.Schema({
            message: String,
            handle: String
        });
        this.Message = mongoose.model('messages', mesageSchema);
    }

    Connect() {
        mongoose.connect(dbString, {
            useNewUrlParser: true
        });
        console.log("Veritabanına bağlanıldı.");
    }

    AddToMessages(data) {
        this.Message(data).save(function (err, data) {
            if (err) throw err;
        });
    }

    GetLastMessages(callback) {
        this.Message.find({}, function (err, data) {
            if (err) throw err;
            callback(data)
        });
    }
}
module.exports = mongoDB;