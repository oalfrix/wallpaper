document.addEventListener("DOMContentLoaded", () => {
    loadWallpapers();
});

function loadWallpapers() {
    const photoWallpapers = JSON.parse(localStorage.getItem('photoWallpapers')) || [];
    const liveWallpapers = JSON.parse(localStorage.getItem('liveWallpapers')) || [];

    const photoGrid = document.getElementById('photo-wallpaper-grid');
    const liveGrid = document.getElementById('live-wallpaper-grid');

    photoWallpapers.forEach((src, index) => {
        const item = createWallpaperItem(src, 'photo', index);
        photoGrid.appendChild(item);
    });

    liveWallpapers.forEach((src, index) => {
        const item = createWallpaperItem(src, 'live', index);
        liveGrid.appendChild(item);
    });
}

function createWallpaperItem(src, type, index) {
    const item = document.createElement('div');
    item.className = 'wallpaper-item';

    const media = type === 'photo' ? document.createElement('img') : document.createElement('video');
    media.src = src;
    if (type === 'live') media.controls = true;

    const controls = document.createElement('div');
    controls.className = 'controls';

    const downloadButton = document.createElement('button');
    downloadButton.textContent = 'Download';
    downloadButton.onclick = () => downloadMedia(src);

    const shareButton = document.createElement('button');
    shareButton.textContent = 'Share';
    shareButton.onclick = () => shareMedia(src);

    controls.appendChild(downloadButton);
    controls.appendChild(shareButton);

    item.appendChild(media);
    item.appendChild(controls);

    return item;
}

function downloadMedia(src) {
    const link = document.createElement('a');
    link.href = src;
    link.download = 'wallpaper';
    link.click();
}

function shareMedia(src) {
    if (navigator.share) {
        navigator.share({
            title: '4K Wallpaper',
            text: 'Check out this wallpaper!',
            url: src
        }).catch(console.error);
    } else {
        alert('Share not supported in your browser.');
    }
}