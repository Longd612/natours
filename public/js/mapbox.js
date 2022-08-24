/* eslint-disable */

export const displayMap = (locations) => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoibG9uZzhldmx0biIsImEiOiJjbDZ4M3ZkN3gwYzdzM2JxbXRjejVncHF0In0.7T2rFmuCjJmmH2XTsGHjWw';
  const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/long8evltn/cl6x69mpz00mr14pdlka2uxxb', // style URL
    scrollZoom: false,
    // projection: 'globe', // display the map as a 3D globe
    // zoom: 5, // starting zoom
    // center: [-118.207896, 34.035278], // starting position [lng, lat]
    // interactive: false,
  });
  map.on('style.load', () => {
    map.setFog({}); // Set the default atmosphere style
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach((loc) => {
    // Create marker
    const el = document.createElement('div');
    el.className = 'marker';

    // Add marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    // Add popup
    new mapboxgl.Popup({
      offset: 30,
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);

    // Extend map bounds to include current location
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100,
    },
  });

  const nav = new mapboxgl.NavigationControl();
  map.addControl(nav, 'top-right');
};
