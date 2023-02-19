const server = require('./app');
const port = process.env.PORT || 3000;

server.listen(port, () => {
    console.info(`Server launched at port ${port}`);
});
