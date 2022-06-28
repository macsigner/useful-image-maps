import UsefulImageMap from '../../UsefulImageMap';

document.documentElement.classList.remove('no-js');
document.documentElement.classList.add('js');

let image = document.querySelector('#map-image');

new UsefulImageMap(image);
