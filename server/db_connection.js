const mongoose = require("mongoose")

require("dotenv").config()

mongoose.set("strictQuery", false)

const URL = process.env.DB_URL

const connectDB = async () => {
    try {
        await mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connection to the Database");
    } catch (error) {
        console.error("Error while connecting to the Database: ", error.message)
        process.exit(1)
    }
};

module.exports = connectDB




// const mongoose = require("mongoose")

// require("dotenv").config();

// mongoose.set("strictQuery", false);
// const URL = process.env.DB_URL
// try {

//     mongoose.connect(URL, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     });

//     console.log("Connected To Database");

// } catch (error) {

//     console.log("error while loadind the data base", error);

// }
