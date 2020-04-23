const { EventEmitter } = require("events");

module.exports = class GameClient extends EventEmitter {
    constructor() {
        super();
        //calls constructors from every class you inherit
        const pageURL = new URL(window.location);
        pageURL.protocol = "ws";
        console.log("Attempting to connect to " + pageURL.toString());
        this._websocket = new WebSocket (pageURL.toString());

        this._websocket.onopen = () => {
            this.emit("connected");
        };

        this._websocket.onmessage = (event) => {
            this.emit("players", JSON.parse(event.data));
        };
    }

    sendPlayer(player) {
        //expects data like this 
        this._websocket.send(
            JSON.stringify(player));
    }
}