const React = require("react");
const ClockFace = require("./ClockFace");
const TwitterList = require("./TwitterList");
const TwitterForm = require("./TwitterForm");

let dummyData = [];

/* the main page for the index route of this app */
const RootComponent = function() {

	const [tweets, setTweets] = react.useState([]);


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
      <h1>Hello!</h1>

      <p>Your app here</p>

      <ClockFace language="fr" />

      <TwitterForm />
      <TwitterList tweets={tweets}/>

    </div>
  );
}

module.exports = RootComponent;