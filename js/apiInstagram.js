let photos = [];
let photosDisplayed = 0;

async function fetchInstagramPhotos() {
    try {
        const response = await fetch('http://localhost:3000/api/photos');
        if (!response.ok) {
            throw new Error('Failed to fetch Instagram photos');
        }
        const data = await response.json();
        console.log('Photos:', data);  // Log de depuração
        return data;
    } catch (error) {
        console.error('Error fetching Instagram photos:', error);
        return [];
    }
}

async function fetchInstagramProfile() {
    try {
        const response = await fetch('http://localhost:3000/api/profile');
        if (!response.ok) {
            throw new Error('Failed to fetch Instagram profile');
        }
        const data = await response.json();
        console.log('Profile:', data);  // Log de depuração
        return data;
    } catch (error) {
        console.error('Error fetching Instagram profile:', error);
        return null;
    }
}

function displayProfile(profile) {
    const profilePictureElement = document.getElementById('profile-picture');
    const usernameElement = document.getElementById('username');

    profilePictureElement.src = profile.profile_picture_url || 'https://i.ibb.co/wNYcNpH/VR-Amarelo-JPG.jpg';
    profilePictureElement.alt = `Profile Picture of ${profile.username}`;
    usernameElement.textContent = `@${profile.username}`;
}

function displayPhotos(photos, start, limit) {
    const gallery = document.getElementById('gallery');
    const end = start + limit;
    const photosToDisplay = photos.slice(start, end);

    photosToDisplay.forEach(photo => {
        const div = document.createElement('div');
        div.className = 'gallery-item';

        const img = document.createElement('img');
        img.src = photo.media_type === 'VIDEO' ? photo.thumbnail_url : photo.media_url;

        const overlay = document.createElement('div');
        overlay.className = 'overlay';

        const caption = document.createElement('p');
        const truncatedCaption = (photo.caption || '').slice(0, 110);
        caption.textContent = truncatedCaption.length === 110 ? `${truncatedCaption}...` : truncatedCaption;

        overlay.appendChild(caption);

        div.appendChild(img);
        div.appendChild(overlay);

        div.addEventListener('click', () => {
            window.open(photo.permalink, '_blank');
        });

        gallery.appendChild(div);
    });

    photosDisplayed += photosToDisplay.length;

    if (photosDisplayed >= photos.length) {
        document.getElementById('load-more').style.display = 'none';
    }
}

async function initGallery() {
    const profile = await fetchInstagramProfile();
    if (profile) {
        displayProfile(profile);
    } else {
        console.error('Profile data is null or undefined.');
    }

    photos = await fetchInstagramPhotos();
    if (photos.length > 0) {
        displayPhotos(photos, 0, 4);
    } else {
        console.error('No photos to display.');
    }
}

document.getElementById('load-more').addEventListener('click', () => {
    displayPhotos(photos, photosDisplayed, 4);
});

initGallery();
