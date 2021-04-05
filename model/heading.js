const mongoose = require('mongoose')
const headingSchema =new  mongoose.Schema({
   headings:Array
});
module.exports = mongoose.model('heading',headingSchema);
