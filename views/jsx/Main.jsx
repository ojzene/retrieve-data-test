/** this is a generic layout template,  */
import React from 'react';
import Home from './Components/Home';

export default function Main(props) {

	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, intial-scale=1.0" />
				<title>Financial Times technical test</title>
				<link rel="stylesheet" type="text/css" href="/dist/css/styles.css" />
				<link rel="stylesheet" href="https://www.ft.com/__origami/service/build/v3/bundles/css?components=o-grid@^6.0.0,o-colors@^6.0.8,o-typography@^7.0.2,o-table@^9.0.2&brand=master&system_code=origami"/>
    			<script src="https://www.ft.com/__origami/service/build/v3/bundles/js?components=o-table@^9.0.2,o-autoinit@^3.0.0&system_code=origami"></script>
				<script src="/dist/js/main.js" defer></script>
			</head>
			<body className="o-colors-box-background">
				<Home {...props} />
			</body>
		</html>
	);
};
