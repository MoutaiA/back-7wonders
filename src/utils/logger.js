const fs = require('fs');
const path = require('path');
const { createLogger, transports, format } = require('winston');

const logsFolder = path.join(__dirname, 'logs');
if (!fs.existsSync(logsFolder)) {
	fs.mkdirSync(logsFolder);
}

const logger = createLogger({
	transports: [
		new transports.Console({
			format: format.combine(format.colorize(), format.simple()),
		}),
		new transports.File({
			filename: path.join(logsFolder, 'app.log'),
		}),
	],
});

module.exports = logger;
