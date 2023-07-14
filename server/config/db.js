const mongoose = require("mongoose")
module.exports = () => {
const connectionParams = {
useNewUrlParser: true,
useUnifiedTopology: true,
}
try {
mongoose.connect("mongodb+srv://alicjakolodziejczyk01:IBRZzzbdD5zD5zCL@melox.hmgxchx.mongodb.net/?retryWrites=true&w=majority")
.then(() =>console.log("Connected to database successfully"));
} catch (error) {
console.log(error);
console.log("Could not connect database!")
}
}