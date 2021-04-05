const express = require('express');
const connectDB = require('./utils/mongoConnector');
// const path = require('path');
const  Db  = require('./model/store');
const  Heading  = require('./model/heading');

const cors = require('cors');
const heading = require('./model/heading');
const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));
app.use(cors())
// Define Routes
app.post('/api/adddata', async (req,res)=>{
    try {
      const addedheading = new Heading({ headings:req.body.headings });
      await addedheading.save();
       const added =await  Db.insertMany( req.body.rows );
      //  console.log(req.body.headings)
       return res.send({success:true});
    } catch (error) {
        console.log(error);
    }
});
app.get('/api/getrows', async (req,res)=>{
  try {
      const allrows =await  Db.find( {} );
    //  console.log(req.body.rows)
     return res.send({rows:allrows});
  } catch (error) {
      console.log(error);
  }
});
app.get('/api/getheadings', async (req,res)=>{
  try {
      const foundheadings =await  Heading.findOne( {} );
    //  console.log(req.body.rows)
    let headings = foundheadings.headings;
     return res.send({headings:headings});
  } catch (error) {
      console.log(error);
  }
});
app.delete('/api/data', async(req,res)=>{
  try {
    await Db.deleteMany({});
    await Heading.deleteOne({});
    return res.send({success:true})

  } catch (error) {
    console.log(error);
  }
})
// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('Client/build'));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'Client', 'build', 'index.html'))
  );
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
