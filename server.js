const app = require('./express/app');
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`App running on http://localhost:${port}`);
});