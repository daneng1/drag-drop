import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import "./dropZone.css";

const thumbsContainer = {
	display: "flex",
	flexDirection: "row",
	flexWrap: "wrap",
	marginTop: 16,
};

const thumb = {
	display: "inline-flex",
	borderRadius: 10,
	border: "1px solid #eaeaea",
	marginBottom: 8,
	marginRight: 8,
	width: 100,
	height: 100,
	padding: 4,
	boxSizing: "border-box",
};

const thumbInner = {
	display: "flex",
	minWidth: 0,
	overflow: "hidden",
};

const img = {
	display: "flex",
	width: "100%",
	height: "auto",
	borderRadius: 8,
};

function Previews(props) {
	const [files, setFiles] = useState([]);
	const [error, setError] = useState(false);
	const { getRootProps, getInputProps } = useDropzone({
		maxFiles: 3,
		accept: "image/jpeg, image/png",
		onDrop: (acceptedFiles) => {
			if (files.length === 0) {
				setFiles(
					acceptedFiles.map((file) =>
						Object.assign(file, {
							preview: URL.createObjectURL(file),
						})
					)
				);
			} else if (files.length > 0 && files.length < 3) {
				const newFiles = acceptedFiles.map((file) =>
					Object.assign(file, {
						preview: URL.createObjectURL(file),
					})
				);
				console.log("newFiles", newFiles);
				setFiles([...files, ...newFiles]);
			} else {
				setError(true);
			}
		},
	});

	const thumbs = files.map((file) => (
		<div style={thumb} key={file.name}>
			<div style={thumbInner}>
				<img src={file.preview} style={img} alt={file.name} />
			</div>
		</div>
	));

	useEffect(() => {
		// Make sure to revoke the data uris to avoid memory leaks
		files.forEach((file) => URL.revokeObjectURL(file.preview));
	}, [files]);

	return (
		<section className="container">
			{error && (
				<alert>
					You've already reached the maximum number of allowed images
				</alert>
			)}
			<div {...getRootProps({ className: "dropzone" })}>
				<input {...getInputProps()} />
				<p>Drag 'n' drop up to 3 files here, or click to select files</p>
			</div>
			<aside style={thumbsContainer}>{thumbs}</aside>
		</section>
	);
}

export default Previews;
