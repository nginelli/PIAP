const React = require("react");

function TwitterList(props) {

	//create a component for each element of the array
	//listComponents is an array of react components  
	//idx is index 
	const listComponents = props.tweets.map((tweet, idx) => {
		return <li kex={idx}>{tweet.user}: {tweet.message}</li>
	});

	return <ul> 
		{listComponents}
	</ul>
}

module.exports = TwitterList;