const express = require('express');
const morgan = require('morgan');
const dayjs = require('dayjs');
const app = express();
const chalk = require('chalk');

// Middleware for logging incoming requests
app.use((req, res, next) => {
    const start = Date.now();

    // Log the response status using morgan
    morgan.token('status', (req, res) => {
        const status = res.statusCode;
        const color =
            status >= 500 ? 'red' : status >= 400 ? 'yellow' : 'green';
        return chalk[color](status);
    });

    // Pass the request to the next middleware
    next();

    // Log the response time using console.log
    const responseTime = Date.now() - start;
    const now = dayjs().format('YYYY-MM-DD HH:mm:ss');
    console.log(
        `[${chalk.grey(now)}]: ${chalk.blueBright('INFO:')} ${chalk.greenBright(
            'Completed'
        )} ${chalk.cyan(req.method)} ${chalk.yellow(
            req.url
        )} ${chalk.magentaBright(res.statusCode)} ${chalk.green(
            `${responseTime}ms`
        )}`
    );
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

module.exports = app;
