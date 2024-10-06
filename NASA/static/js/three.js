// script.js

// Set up scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
let solar_system = document.getElementById('solar-system');
// console.log(solar_system.offsetWidth);
// console.log(solar_system.offsetHeight);
renderer.setSize(solar_system.offsetWidth, solar_system.offsetHeight);
document.getElementById('solar-system').appendChild(renderer.domElement);
// Add lights to simulate the Sun
const pointLight = new THREE.PointLight(0xffffff, 2, 100);
pointLight.position.set(0, 0, 0);
scene.add(pointLight);

// Add ambient light to brighten the entire scene
const ambientLight = new THREE.AmbientLight(0x404040, 2); // Adjust the intensity as needed
scene.add(ambientLight);

// Create Sun
// const sunGeometry = new THREE.SphereGeometry(696340/30000, 32, 32);
const sunGeometry = new THREE.SphereGeometry(2*2, 32, 32);
const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);

// Planets array to hold all the planets
const planets = [];

// Function to create planets
function createPlanet(size, distance, color) {
  const planetGeometry = new THREE.SphereGeometry(size, 32, 32);
  const planetMaterial = new THREE.MeshLambertMaterial({ color });
  const planet = new THREE.Mesh(planetGeometry, planetMaterial);

  // Add orbit distance from the Sun
  planet.position.x = distance;
  planet.color = color;
  scene.add(planet);
  planets.push({ planet, distance, angle: Math.random() * Math.PI * 2 });
}

// Create planets with size and distance from the Sun
// createPlanet(2439.7/3000, 58, 0xff0000);  // Mercury
// createPlanet(6051.8/3000, 108, 0xff9900);  // Venus
// createPlanet(6371/3000, 149, 0x0000ff);   // Earth
// createPlanet(3389.5/3000, 228, 0xff3300); // Mars
// createPlanet(69911/3000, 778, 0xffcc00); // Jupiter
// createPlanet(58232/3000, 1429, 0xff6600); // Saturn
// createPlanet(25362/3000, 2875, 0x33ccff); // Uranus
// createPlanet(24622/3000 , 4497, 0x3366ff); // Neptune

// createPlanet(0.5, 5, 0xff0000);  // Mercury
// createPlanet(0.8, 7, 0xff9900);  // Venus
// createPlanet(1, 10, 0x0000ff);   // Earth
// createPlanet(0.9, 15, 0xff3300); // Mars
// createPlanet(1.2, 20, 0xffcc00); // Jupiter
// createPlanet(1.1, 25, 0xff6600); // Saturn
// createPlanet(0.9, 30, 0x33ccff); // Uranus
// createPlanet(0.8, 35, 0x3366ff); // Neptune

createPlanet(0.5*2, 0.40 * 20, 0xff0000);  // Mercury
createPlanet(0.8*2, 0.72 * 20, 0xff9900);  // Venus
createPlanet(1*2, 1 * 20, 0x0000ff);   // Earth
createPlanet(0.9*2, 1.52 * 20, 0xff3300); // Mars
createPlanet(1.2*2, 5.2 * 20, 0xffcc00); // Jupiter
createPlanet(1.1*2, 9.58 * 20, 0xff6600); // Saturn
createPlanet(0.9*2, 19.19 * 20, 0x33ccff); // Uranus
createPlanet(0.8*2, 30 * 20, 0x3366ff); // Neptune

// Create starfield (sky full of stars)
function createStarfield() {
  const starsGeometry = new THREE.BufferGeometry();
  const starCount = 10000;  // Number of stars
  const starVertices = [];

  for (let i = 0; i < starCount; i++) {
    // Random positions for stars
    const x = (Math.random() - 0.5) * 2000; // Adjust range for star spread
    const y = (Math.random() - 0.5) * 2000;
    const z = (Math.random() - 0.5) * 2000;
    starVertices.push(x, y, z);
  }

  starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));

  // Star material: small white points
  const starsMaterial = new THREE.PointsMaterial({ color: 0xffffff });

  // Create star points from geometry and material
  const starField = new THREE.Points(starsGeometry, starsMaterial);
  scene.add(starField);
}

// Create the starfield
createStarfield();

function position(e, a, q, i, node, peri, m) {
  const lr = a * (1 - e ** 2);
  const r = lr / (1 + e * Math.cos(m));
  const x = r * (Math.cos(peri + m) * Math.cos(node) - Math.cos(i) * Math.sin(peri + m) * Math.sin(node));
  const y = r * (Math.cos(peri + m) * Math.sin(node) + Math.cos(i) * Math.sin(peri + m) * Math.cos(node));
  const z = r * Math.sin(peri + m) * Math.sin(i);

  return [x, y, z];
}

function createAsteroid(x, y, z) {
  const planetGeometry = new THREE.SphereGeometry(1, 6, 6);
  const planetMaterial = new THREE.MeshLambertMaterial({ color: 0x3208F2 });
  const planet = new THREE.Mesh(planetGeometry, planetMaterial);

  planet.position.x = x;
  planet.position.y = y;
  planet.position.z = z;
  
  scene.add(planet);
}

// Use NASA API
var options = {
	method: 'GET',
}
let JsonData;
fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=2015-09-07&end_date=2015-09-08&detailed=false&api_key=qVwJOfcpAzIEcPNhVbSbqyiNgj3sNcoX4ARLciyS`, options)
.then(function(response){
  if(response.status == 200){
    return response.json();
  }
})
.then(function(data){ 
  JsonData = data;
  // console.log(data.near_earth_objects["2015-09-08"])
})
.then(function(a) {
  if (JsonData != null) {
    
    for (let k=0; k<JsonData.element_count; k++) {
      let asteroid = JsonData.near_earth_objects["2015-09-08"][k];
      let eccentricity, semiMajorAxis, inclination, ascendingNodeLongitude, meanAnomaly, perihelionDistance, perihelionArgument
      fetch(asteroid.links.self) 
      .then(function(response){
        if(response.status == 200){
          return response.json();
        }
      })
      .then(function(data){ 
        asteroid = data
        console.log(asteroid)
        eccentricity = +asteroid.orbital_data.eccentricity;
        semiMajorAxis = +asteroid.orbital_data.semi_major_axis; // in AU
        inclination = (+asteroid.orbital_data.inclination); // convert degrees to radians
        ascendingNodeLongitude = (+asteroid.orbital_data.ascending_node_longitude); // convert degrees to radians
        meanAnomaly = +(asteroid.orbital_data.mean_anomaly); // convert degrees to radians
        perihelionDistance = +asteroid.orbital_data.perihelion_distance
        perihelionArgument = +asteroid.orbital_data.perihelion_argument
        // const is_PHA = asteroid.is_potentially_hazardous_asteroid
      })
      
      // TODO bug fixes of asteroid
      // TODO add filter
      // TODO add search
      // TODO add labels
      // TODO replace 3d models

      // let E = meanAnomaly; // Initial guess for E
      // for (let i = 0; i < 10; i++) { // Iterate to solve for E
      //     E = keplersEquation(meanAnomaly, eccentricity, E);
      // }

      // // Step 2: Calculate True Anomaly (ν)
      // const nu = 2 * Math.atan2(Math.sqrt(1 + eccentricity) * Math.sin(E / 2), 
      //                           Math.sqrt(1 - eccentricity) * Math.cos(E / 2));

      // // Step 3: Calculate the radius (r)
      // const r = semiMajorAxis * (1 - eccentricity * Math.cos(E));

      // // Step 4: Position in the orbital plane (x', y')
      // const xPrime = r * Math.cos(nu);
      // const yPrime = r * Math.sin(nu);

      // // Step 5: Convert to 3D coordinates (x, y, z)
      // const x = xPrime * (Math.cos(ascendingNodeLongitude) * Math.cos(nu) - 
      //                     Math.sin(ascendingNodeLongitude) * Math.sin(nu) * Math.cos(inclination));
      // const y = xPrime * (Math.sin(ascendingNodeLongitude) * Math.cos(nu) + 
      //                     Math.cos(ascendingNodeLongitude) * Math.sin(nu) * Math.cos(inclination));
      // const z = yPrime * Math.sin(inclination);

      // createAsteroid(x.toFixed(6), y.toFixed(6), z.toFixed(6))
      // Print the results

      pos = position(eccentricity, semiMajorAxis, perihelionDistance, inclination, ascendingNodeLongitude, perihelionArgument, meanAnomaly)
      createAsteroid(pos[0], pos[1], pos[2])
      console.log(`x: ${pos[0].toFixed(6)} AU`);
      console.log(`y: ${pos[1].toFixed(6)} AU`);
      console.log(`z: ${pos[2].toFixed(6)} AU`);
    }
  }
});

// Set initial camera position and angles
let cameraDistance = 50;
let cameraAngleX = 0;
let cameraAngleY = 0;

// Update camera position based on angles
function updateCameraPosition() {
  camera.position.x = cameraDistance * Math.sin(cameraAngleX) * Math.cos(cameraAngleY);
  camera.position.z = cameraDistance * Math.cos(cameraAngleX) * Math.cos(cameraAngleY);
  camera.position.y = cameraDistance * Math.sin(cameraAngleY);
  camera.lookAt(0, 0, 0);  // Always look at the Sun (center of the scene)
}

// Initial update for the camera
updateCameraPosition();

// Orbit speed for each planet (for simplicity, random values)
const orbitSpeeds = [0.03, 0.02, 0.01, 0.008, 0.006, 0.004, 0.003, 0.002];

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  // Rotate planets around the Sun
  planets.forEach((obj, index) => {
    obj.angle += orbitSpeeds[index] * speed / 100;  // Adjust the speed for each planet
    obj.planet.position.x = obj.distance * Math.cos(obj.angle);
    obj.planet.position.z = obj.distance * Math.sin(obj.angle);
  });

  // Render the scene
  renderer.render(scene, camera);
}

function traceOrbits() {
  const orbitMaterial = new THREE.LineBasicMaterial({ color: 0x888888, opacity: 0.5, transparent: true });

  planets.forEach((obj) => {
    // const orbitMaterial = new THREE.LineBasicMaterial({ color: obj.color, opacity: 0.5, transparent: true });
    const orbitPoints = [];
    const segments = 100; // Number of segments for the orbit

    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2; // Full circle
      orbitPoints.push(obj.distance * Math.cos(angle), 0, obj.distance * Math.sin(angle)); // X, Y, Z
    }

    const orbitGeometry = new THREE.BufferGeometry();
    orbitGeometry.setAttribute('position', new THREE.Float32BufferAttribute(orbitPoints, 3));

    const orbit = new THREE.LineLoop(orbitGeometry, orbitMaterial);
    scene.add(orbit);
  });
}

let speed = 100;
let isInputing = false;

document.querySelectorAll('.range_box input').forEach(item => {
  item.addEventListener('input', function() {
      isInputing = true;
      if (this.value >= 120) {
        speed = (this.value - 100) * 10;
      } else if (this.value < 120 && this.value > 100) {
        speed = (this.value - 100) * 10 + 100;
      } else {  
        speed = this.value;
      }
  })
});

// Handle window resize
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

// Handle keyboard input to control the camera with arrow keys
document.addEventListener('keydown', (event) => {
  const key = event.key;

  const rotationSpeed = 0.05;  // Adjust speed of rotation

  if (key === 'ArrowLeft') {
    cameraAngleX -= rotationSpeed;
  }
  if (key === 'ArrowRight') {
    cameraAngleX += rotationSpeed;
  }
  if (key === 'ArrowUp') {
    cameraAngleY = Math.min(cameraAngleY + rotationSpeed, Math.PI / 2); // Limit the vertical angle to avoid flipping
  }
  if (key === 'ArrowDown') {
    cameraAngleY = Math.max(cameraAngleY - rotationSpeed, -Math.PI / 2); // Limit the vertical angle to avoid flipping
  }

  updateCameraPosition();  // Update camera position based on new angles
});

document.addEventListener("wheel", (event) => {
const zoomSpeed = 5;

if (event.deltaY < 0) {
  // Zoom in
  cameraDistance = Math.max(10, cameraDistance - zoomSpeed);  // Prevent zooming too close
} else {
  // Zoom out
  cameraDistance = Math.min(200, cameraDistance + zoomSpeed); // Prevent zooming too far
}

updateCameraPosition();  // Update camera position after zooming
});

// Handle mouse drag to rotate the camera
let isDragging = false;
let previousMouseX = 0;
let previousMouseY = 0;

const dragSpeed = 0.005;  // Adjust drag speed for rotation

document.addEventListener('mousedown', (event) => {
  isDragging = true;
  previousMouseX = event.clientX;
  previousMouseY = event.clientY;
});

document.addEventListener('mousemove', (event) => {
  if (isDragging && !isInputing) {
    const deltaX = event.clientX - previousMouseX;
    const deltaY = event.clientY - previousMouseY;

    cameraAngleX -= deltaX * dragSpeed;
    cameraAngleY = Math.max(Math.min(cameraAngleY + deltaY * dragSpeed, Math.PI / 2), -Math.PI / 2);  // Limit vertical movement

    previousMouseX = event.clientX;
    previousMouseY = event.clientY;

    updateCameraPosition();
  }
});

document.addEventListener('mouseup', () => {
  isDragging = false;
  isInputing = false;
});

// let raycaster = new THREE.Raycaster();
// let mouse = new THREE.Vector2();
// console.log(planets)

// document.getElementById("solar-system").addEventListener("click", function () {
//   // получить позицию мышки относительно игрового бокса
//   let solar_system = document.getElementById('solar-system');
//   ww = (solar_system.offsetWidth);
//   hh = (solar_system.offsetHeight);
//   const xMouse = event.offsetX;
//   const yMouse = event.offsetY;
//   mouse.x = ( xMouse / ww ) * 2 - 1;
//   mouse.y = - ( yMouse / hh ) * 2 + 1;
//   raycaster.setFromCamera( mouse, camera );
//   // получаем массив объектов, по которым был сделан щелчок
//   let intersects = raycaster.intersectObjects( planets );
//   // если этот массив не пустой
//   if ( intersects.length > 0 ) {
//       // получаем самый первый объект, по которому щёлкнули
//       let answer = intersects[0];
//       if(answer.object === planets[0]){
//           alert("Сфера");
//       }
//       if(answer.object === planets[1]){
//           alert("Конус");
//       }
//       if(answer.object === objects[2]){
//           alert("Плоскость");
//       }
//   }
// }); 

const slider = document.querySelector('.slider');
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');
const slides = Array.from(slider.querySelectorAll('.slide'));
const slideCount = slides.length;
let slideIndex = 0;

const firstPoint = document.querySelector('.testimonial-point1');
const secondPoint = document.querySelector('.testimonial-point2');
const thirdPoint = document.querySelector('.testimonial-point3');

prevButton.addEventListener('click', showPreviousSlide);
nextButton.addEventListener('click', showNextSlide);

function showPreviousSlide() {
	slideIndex = (slideIndex - 1 + slideCount) % slideCount;
	updateSlider();
}
  
function showNextSlide() {
	slideIndex = (slideIndex + 1) % slideCount;
	updateSlider();
}
  
function updateSlider() {
	slides.forEach((slide, index) => {
		if (index === slideIndex) {
			slide.style.display = 'flex';
	  	} else {
			slide.style.display = 'none';
	  	}
	});
}
  
updateSlider();

// Start animation
traceOrbits();
animate();