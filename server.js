// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();
const config = require('./webpack.config.js');
const compiler = webpack(config);

const PORT = Number(process.env.PORT) || 3000;
const HOST = process.env.HOST || '0.0.0.0';

app.use(
	webpackDevMiddleware(compiler, {
		publicPath: config.output.publicPath,
	})
);

// Fallback after a production `npm run build` (or if middleware misses a file)
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(__dirname));

const server = app.listen(PORT, HOST, function ()
{
	const url = 'http://localhost:' + PORT + '/';
	console.log('');
	console.log('Activity & POI web component — local demo');
	console.log('  Open:  ' + url);
	console.log('  Bound: http://' + HOST + ':' + PORT + '/');
	console.log('');
});

server.on('error', function (err)
{
	if (err && err.code === 'EADDRINUSE')
	{
		console.error('Port ' + PORT + ' is already in use.');
		console.error('Stop the other process, or start with PORT=3001 npm run start');
		process.exit(1);
	}
	throw err;
});
