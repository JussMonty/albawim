const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Declaring the array of image filenames */
const imageFilenames = ['pic1.jpg', 'pic2.jpg', 'pic3.jpg', 'pic4.jpg', 'pic5.jpg'];

/* Declaring the alternative text for each image file */
const altText = {
    'pic1.jpg': 'Closeup of a human eye',
    'pic2.jpg': 'Rock that looks like a wave',
    'pic3.jpg': 'Pirple and white flowers',
    'pic4.jpg': 'Wall from ancient Egypt',
    'pic5.jpg': 'Big moth on a leaf'
};

/* Looping through images */
for(let i = 0; imageFilenames.length; i++){
    const filename = imageFilenames[i];

    const newImage = document.createElement('img');
    newImage.setAttribute('src', 'images/' + filename);
    newImage.setAttribute('alt', altText[filename]);
    thumbBar.appendChild(newImage);

    // Adding a click event listener to each thumbnail image
    newImage.addEventListener('click', function(){
        displayedImage.setAttribute('src', 'images/' + filename);
        displayedImage.setAttribute('alt', altText[filename]);
    });

}    

/* Wiring up the Darken/Lighten button */
btn.addEventListener('click', function(){
    const currentClass = btn.getAttribute('class');
    if (currentClass === 'dark'){
        btn.setAttribute('class', 'light');
        btn.textContent =  'Lighten';
        overlay.style,backgroundColor = 'rgb(0 0 0 / 50%)';
    } else {
        btn.setAttribute('class', 'dark');
        btn.textContent = 'Darken';
        overlay.style.backgroundColor = 'rgb(0 0 0 / 0%)';
    }
});