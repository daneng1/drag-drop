import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { v4 as uuidv4 } from "uuid";

const fileTypes = ["JPG", "PNG", "GIF"];

function DragDrop() {
	const [file, setFile] = useState([]);
	const handleChange = (image) => {
		const newImage = {
			id: uuidv4(),
			src: URL.createObjectURL(image),
			alt: image.name,
		};
		setFile([...file, newImage]);
	};

	const handleDelete = (id) => setFile(file.filter((item) => item.id !== id));

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<FileUploader handleChange={handleChange} name="file" types={fileTypes} />
			<div style={{ display: "flex", flexDirection: "row" }}>
				{file.length > 0 &&
					file.map((item) => {
						return (
							<div style={{ margin: "10px" }} key={item.id}>
								<div onClick={() => handleDelete(item.id)}>X</div>
								<img src={item.src} width={100} height={100} alt={item.name} />
							</div>
						);
					})}
			</div>
		</div>
	);
}

export default DragDrop;
