import * as React from "react";
import * as ReactDOM from "react-dom";
import { App } from "./components/app";

document.addEventListener("DOMContentLoaded", () => {
	const root = document.createElement("div");
	root.setAttribute("id", "root");

	const meta = document.createElement("meta");
	meta.name = "viewport";
	meta.content = "width=device-width, initial-scale=1";

	document.body.appendChild(root);
	document.head.appendChild(meta);

	try {
		let oldState = JSON.parse(
			decodeURIComponent(window.location.search.slice(3))
		);
		ReactDOM.render(<App oldState={oldState} />, root);
	} catch (e) {
		console.warn("Unable to parse state from url, resorting to default", e);
		ReactDOM.render(<App />, root);
	}
});
