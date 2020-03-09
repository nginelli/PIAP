const React = require("react");

const TwitterList = require("./TwitterList");
const TwitterForm = require("./TwitterForm");
// const Gradients = require("./Gradients")

/* the main page for the index route of this app */
const RootComponent = function(props) {


	// Initialize an array of tweets with an empty array
	const [tweets, setTweets] = React.useState([]);

	// When this component loads, fetch tweets from the API
	const doFetchTweets = async () => {
		//fetch the data 
		const response = await fetch("/api/tweets");
		const data = await response.json();
		setTweets(data);
	};

	//useEffect lets you run a function whenever the state changes
	// [] listening for the state (or not) 
	React.useEffect(() => {
		doFetchTweets();

	}, []);

 	 return (
    <div>
      <h1>Dumb Colors!</h1>
      <TwitterForm />
      <TwitterList tweets={tweets}/>

    </div>
  );
}

module.exports = RootComponent;