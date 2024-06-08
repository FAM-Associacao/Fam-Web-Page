const accessToken = 'IGQWRQdVBZAWlFHRWNxUGFqZA0dGcWpBbU0yVkpIM1pOQS1VTkpWQUxHR1JEMlpMLV9GOWNZASm5TOEg5cEFaRzdMQWdqaFNLend6RHhuOEVkWmtmUlRWNk1fSmYzRTZAzUVJRb1I1N2o2eXFJOGJDOG1UTGJxMGF3WTgZD';
let photos = [];
let photosDisplayed = 0;

async function fetchInstagramPhotos() {
    try {
        const response = await fetch(`https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp&access_token=${accessToken}`);
        if (!response.ok) {
            throw new Error('Failed to fetch Instagram photos');
        }
        const data = await response.json();
        console.log('Photos:', data);  // Log de depuração
        return data.data;
    } catch (error) {
        console.error('Error fetching Instagram photos:', error);
        return [];
    }
}

async function fetchInstagramProfile() {
    try {
        const response = await fetch(`https://graph.instagram.com/me?fields=id,username,profile_picture_url&access_token=${accessToken}`);
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
    const followButton = document.getElementById('follow-button');

    profilePictureElement.src = profile.profile_picture_url || 'https://super.abril.com.br/wp-content/uploads/2018/07/5602efa982bee15a9806a4a2simpsons1.jpeg?quality=90&strip=info&w=620&h=440&crop=1'; // URL de uma imagem padrão caso não tenha imagem de perfil
    profilePictureElement.alt = `Profile Picture of ${profile.username}`;
    usernameElement.textContent = `@${profile.username}`;
    followButton.href = `https://www.instagram.com/${profile.username}/`;
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

    // Esconder o botão se todas as fotos foram exibidas
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
