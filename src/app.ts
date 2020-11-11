// Code goes here!
import axios from 'axios';

const GOOGLE_API_KEY = '';
const form = document.querySelector('form')!;
const addressInput = document.getElementById('address')! as HTMLInputElement;

type GoogleGeocodingRes = {
  results: { geometry: { location: { lat: number; lng: number } } }[];
  status: 'OK' | 'ZERO_RESULTS';
};

function searchAddresshandler(event: Event) {
  event.preventDefault();
  const enteredAddress = addressInput.value;

  axios
    .get<GoogleGeocodingRes>(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
        enteredAddress
      )}&key=${GOOGLE_API_KEY}`
    )
    .then(res => {
      if (res.data.status !== 'OK') {
        throw new Error('Something went wrong..');
      }
      const coordinates = res.data.results[0].geometry.location;

      const map = new google.maps.Map(
        document.getElementById('map') as HTMLElement,
        {
          center: coordinates,
          zoom: 8,
        }
      );
      new google.maps.Marker({
        position: coordinates,
        map: map,
      });
    })
    .catch(err => {
      alert(err);
    });
}

form.addEventListener('submit', searchAddresshandler);
