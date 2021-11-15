//const declares a constant variable

const express = require("express");

//let declares a non constant variable


//import routes from './src/routes/index.js';
const app = express();
app.use(express.json());


//our program is listening on port 5000, visit on localhost:5000. localhost is just code for your IP address
const port = process.env.PORT || 5000;

// Routes
app.get('/ping', (req, res) => res.status(200).send('pong'));
//app.use('/user', routes);

app.get("/meow", (req, res) => {
  res.status(200).sendFile('cat.jpg', { root: __dirname });
})


//the string below is verbatium the index.html we created. 
app.get("/html", (req, res) => {
    res.status(200).sendFile('index.html', { root: __dirname });
})

// Not found
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

// Error handling
app.use((error, req, res) => {
    res.status(error.status || 500).json({
        error: {
            message: error.message,
        },
    });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

module.exports=app;