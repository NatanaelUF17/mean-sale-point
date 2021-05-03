const app = require('./src/app');

const port = process.env.PORT || 6292;

// Entry point of the server 
app.listen(port, () => {
    console.log(`Listening: http://localhost:${port}`);
});