import DragDrop from "./dragDrop";
import Previews from "./dropZone";
import "./App.css";

function App() {
	return (
		<div className="App">
			<h1>Drag and Drop</h1>
			<DragDrop />
			<h1>Dropzone</h1>
			<Previews />
		</div>
	);
}

export default App;
