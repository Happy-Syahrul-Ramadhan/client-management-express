// A few JavaScript Functions for Images and Files
// Author: Justin Mitchel
// Source: https://kirr.co/ndywes

// Convert a Base64-encoded string to a File object

// Download a Base64-encoded file

const imageSize = 2520000; /* 2,4 mb */
const accepFileType =
	"image/x-png,image/png,image/jpg,image/jpeg,image/gif,image/wepb";
const accepFileTypeArray = accepFileType.split(",").map((item) => {
	return item.trim();
});

export const verifyFile = (files) => {
	if (files && files.length > 0) {
		const currentFile = files[0];
		const currentFileType = currentFile.type;
		const currentFileSize = currentFile.size;
		if (currentFileSize > imageSize) {
			alert("this no allow To big below 2mb ");
			return false;
		}

		if (!accepFileTypeArray.includes(currentFileType)) {
			alert("this files no allow or please under 2mb");
			return false;
		}
		return true;
	}
	return false;
};

export const toBase64 = (file) =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = (error) => reject(error);
	});

export function downloadBase64File(base64Data, filename) {
	var element = document.createElement("a");
	element.setAttribute("href", base64Data);
	element.setAttribute("download", filename);
	element.style.display = "none";
	document.body.appendChild(element);
	element.click();
	document.body.removeChild(element);
}

// Extract an Base64 Image's File Extension
export function extractImageFileExtensionFromBase64(base64Data) {
	return base64Data.substring(
		"data:image/".length,
		base64Data.indexOf(";base64")
	);
}


// membuat base64 menjadi sebuah file
export function base64StringtoFile(dataurl, filename) {
	var arr = dataurl.split(","),
		mime = arr[0].match(/:(.*?);/)[1],
		bstr = atob(arr[1]),
		n = bstr.length,
		u8arr = new Uint8Array(n);

	while (n--) {
		u8arr[n] = bstr.charCodeAt(n);
	}

	return new File([u8arr], filename, { type: mime });
}

export function isBase64(str) {
	if (str === "" || str.trim() === "") {
		return false;
	}
	try {
		return btoa(atob(str)) == str;
	} catch (err) {
		return false;
	}
}
export function isDataURL(s) {
	return !!s.match(isDataURL.regex);
}
isDataURL.regex =
	/^\s*data:([a-z]+\/[a-z]+(;[a-z\-]+\=[a-z\-]+)?)?(;base64)?,[a-z0-9\!\$\&\'\,\(\)\*\+\,\;\=\-\.\_\~\:\@\/\?\%\s]*\s*$/i;
