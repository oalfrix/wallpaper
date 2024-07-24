document.getElementById('upload-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const imageType = document.getElementById('image-type').value;
    const imageFile = document.getElementById('image-file').files[0];

    if (imageFile) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const url = e.target.result;
            let wallpapers = JSON.parse(localStorage.getItem(`${imageType}Wallpapers`)) || [];
            wallpapers.push(url);
            localStorage.setItem(`${imageType}Wallpapers`, JSON.stringify(wallpapers));
            loadUploadedWallpapers();
            document.getElementById('upload-status').textContent = `Upload successful: ${imageFile.name}`;
        };
        reader.readAsDataURL(imageFile);
    } else {
        alert('Please select a file.');
    }
});

function loadUploadedWallpapers() {
    const photoWallpapers = JSON.parse(localStorage.getItem('photoWallpapers')) || [];
    const liveWallpapers = JSON.parse(localStorage.getItem('liveWallpapers')) || [];

    const uploadedGrid = document.getElementById('uploaded-wallpaper-grid');
    uploadedGrid.innerHTML = '';

    photoWallpapers.forEach((src, index) => {
        const item = createUploadedWallpaperItem(src, 'photo', index);
        uploadedGrid.appendChild(item);
    });

    liveWallpapers.forEach((src, index) => {
        const item = createUploadedWallpaperItem(src, 'live', index);
        uploadedGrid.appendChild(item);
    });
}

function createUploadedWallpaperItem(src, type, index) {
    const item = document.createElement('div');
    item.className = 'wallpaper-item';

    const media = type === 'photo' ? document.createElement('img') : document.createElement('video');
    media.src = src;
    if (type === 'live') media.controls = true;

    const controls = document.createElement('div');
    controls.className = 'controls';

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = () => deleteWallpaper(type, index);

    controls.appendChild(deleteButton);
    item.appendChild(media);
    item.appendChild(controls);

    return item;
}

function deleteWallpaper(type, index) {
    let wallpapers = JSON.parse(localStorage.getItem(`${type}Wallpapers`)) || [];
    wallpapers.splice(index, 1);
    localStorage.setItem(`${type}Wallpapers`, JSON.stringify(wallpapers));
    loadUploadedWallpapers();
}

loadUploadedWallpapers();