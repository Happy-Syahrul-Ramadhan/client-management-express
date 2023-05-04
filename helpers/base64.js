function base64ToFile(base64, filename) {

    var arr = base64.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
}

function getMetafile(file) {
    return {
        filename: file.name,
        contentType: file.type,
        chunkSize: file.size
    }
}


export {
    base64ToFile,
    getMetafile
    
}
export default function (base64, filename) {
    const file = base64ToFile(base64, filename);
    const metafile = getMetafile(file);
    return {
        ...metafile,
        uri: base64
    }
}
