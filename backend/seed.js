const db = require('./database');

const products = [
  { id: 1, name: 'Flight Simulation Software', price: 9000, img: '/images/FlightSim.jpg', description: 'High fidelity flight simulators for pilot training or aviation enthusiasts. Provides realistic cockpit controls and weather simulation for an immersive flight experiencee.'},
  { id: 2, name: 'Aerospace Fasteners Set', price: 500, img: '/images/fasteners.jpg', description: 'Precision engineered fasteners designed for aircraft and spacecraft applications. Made from lightweight, high strength alloys to withstand extreme pressure and temperature variations.'},
  { id: 3, name: 'Pilot Headsets', price: 18000, img: '/images/headsets.jpg', description: 'Noise canceling aviation headsets designed for commercial and private pilots. Ensures clear communication and integrates seamlessly with aircraft audio systems.'},
  { id: 4, name: 'Miniature Drone', price: 2000, img: '/images/drone.jpg', description: 'Compact drone equipped with advanced sensors for aerospace testing and data collection. Ideal for aerodynamics experiments and environmental monitoring.'},
  { id: 5, name: 'Pilot Backpack', price: 1500, img: '/images/backpack.jpg', description: 'A practical backpack designed for pilots. Useful for carrying logbooks, charts, headsets or travel gear.'},
  { id: 6, name: 'Carbon Fiber Aircraft Panel', price: 3000, img: '/images/panel.jpg', description: 'Lightweight, high strength panels used in aircraft and drone construction. Offers durability and improved fuel efficiency without compromising structural integrity.'},
  { id: 7, name: 'Airband Radio Receiver', price: 8000, img: '/images/radio.jpg', description: 'Designed to pick up live communications between cockpits and control towers. It is the ultimate accessory for aviation fans, ensuring you never miss a takeoff clearance or landing update.'},
  { id: 8, name: 'DIY Rocket Kit', price: 500, img: '/images/rocket.jpg', description: 'DIY kit that let hobbyists assemble and launch miniature rockets safely. Perfect for enthusiasts of all ages to learn about rocket mechanics.'}
];

db.serialize(() => {
  db.run("DROP TABLE IF EXISTS products");

  db.run(`CREATE TABLE products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    price REAL,
    img TEXT,
    desc TEXT
  )`);

  const stmt = db.prepare("INSERT INTO products (name, price, img, desc) VALUES (?, ?, ?, ?)");
  
  products.forEach(p => {
    stmt.run(p.name, p.price, p.img, p.description);
  });

  stmt.finalize();
  console.log("Database seeded!");
});

db.close();