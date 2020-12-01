const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clasesSchema = new mongoose.Schema({
    link: [{
        type: String,

    }],
    cohorte: {
        type: Schema.Types.ObjectId,
        ref: "Cohort",
    },
});

const Clases = mongoose.model("Clases", clasesSchema);

module.exports = Clases;