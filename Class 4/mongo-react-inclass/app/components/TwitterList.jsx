const React = require("react");

const dummyData = [
	{user: "Alex", message: "1"}
	{user: "Alexa", message: "yo"}
	{user: "Alex", message: "2"}
]

function TwitterList (){

	//create a component for each element of the array
	//listComponents is an array of react components  
	//idx is index 
	const listComponents = dummyData.map((tweet, idx) => {
		return <li kex={idx}>{tweet.user}: {tweet.message}</li>
	});

	return <ul> 
		{listComponents}
	</ul>
}

module.exports = TwitterList;