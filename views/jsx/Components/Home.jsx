/** You can submit this test using either Handlebars or JSX as a templating engine. This is the file to work in if you would like to use JSX */

import React from 'react';

export default function Home(props) {
	let quoteArr, container = [];
	const quoteList = props.content;

	/** Fetches the page title from the API */
	const hero = (
		<>
			<h1>{props.pageTitle}</h1>
		</>
	);

	/** Function that maps security name and symbol percentage value retrieved from the API */
	const retrieveData = (data) => {
		try {
			const securities = {
				'FTSE:FSI': 'FTSE 100',
				'INX:IOM': 'S&P 500',
				'EURUSD': 'Euro/Dollar',
				'GBPUSD': 'Pound/Dollar',
				'IB.1:IEU': 'Brent Crude Oil',
			};

			const resultList = data?.map(symbol => {
				const quoteObj = { name: "", value: "" };
				const security = securities[symbol.symbolInput];
				const percentageChange = symbol.quote.change1DayPercent.toFixed(2);
				quoteObj.name = security;
				quoteObj.value = `${percentageChange}%`;
				return quoteObj;
			});
			return resultList;
		} catch(e) {
			return null;
		}
	}

	quoteArr = retrieveData(quoteList);
	if (quoteArr !== null) {
		quoteArr.forEach((security, idx) => {
			container.push(
				<span className="ft-right" key={idx}>
					<span className="ft-white"> {security.name} </span> 
					<span className={`${Array.from(security.value)[0] === '-' ? 'negative' : "positive"}`}>
						{security.value}
					</span>
				</span>
			)
		});
	} else {
		container.push(<span className="ft-white">Cannot retrieve data from API at the moment..</span>);
	}

	const quoteComponent = (
		<>
			<div className="o-grid-container">
				<div className="o-typography-wrapper">
					<h1>
						{hero}
					</h1>
				</div>
				<div className="security-wrapper o-grid-row o-typography-wrapper o-colors-white-80">
					<div data-o-grid-colspan="2 M12">
						{container}
					</div>
				</div>
			</div>
		</>
	);

	return (
		<>
			{quoteComponent}
		</>
	);
};
