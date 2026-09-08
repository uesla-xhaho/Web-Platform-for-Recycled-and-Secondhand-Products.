const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const { sequelize, initModels, User, Product } = require('../src/models');

const run = async () => {
  try {
    initModels();
    await sequelize.authenticate();
    await sequelize.sync({ force: true });

    await User.create({
      name: 'Platform Admin',
      email: 'admin@circular.local',
      password: 'Admin123!',
      role: 'admin',
      location: 'Tirane',
      artisanApproved: false,
    });

    const artisan = await User.create({
      name: 'Arta Dervishi',
      email: 'arta@artisan.local',
      password: 'Artisan123!',
      role: 'artisan',
      location: 'Durres',
      bio: 'Punime artizanale te ricikluara me materiale natyrale.',
      artisanApproved: true,
    });

    await User.create({
      name: 'Demo Customer',
      email: 'customer@demo.local',
      password: 'Customer123!',
      role: 'customer',
      location: 'Tirane',
    });

    await Product.bulkCreate([
      {
        title: 'Xhakete Vintage Denim',
        description: 'Xhakete denim pre-loved ne gjendje shume te mire.',
        category: 'second-hand',
        subcategory: 'Veshje',
        materials: ['Denim', 'Cotton'],
        condition: 'good',
        ecoImpact: 'high',
        price: 45,
        artisanId: artisan.id,
        artisanName: artisan.name,
        artisanLocation: artisan.location,
        stock: 4,
        shippingMethod: 'Standard',
        shippingCost: 3,
        shippingDays: 2,
        images: [],
        featured: true,
      },
      {
        title: 'Cante Upcycled nga Banner',
        description: 'Cante e punuar nga materiale te riperdorura.',
        category: 'upcycled',
        subcategory: 'Aksesore',
        materials: ['Recycled PVC', 'Cotton'],
        condition: 'not_applicable',
        ecoImpact: 'high',
        price: 32,
        artisanId: artisan.id,
        artisanName: artisan.name,
        artisanLocation: artisan.location,
        stock: 10,
        shippingMethod: 'Express',
        shippingCost: 5,
        shippingDays: 1,
        images: [],
        featured: true,
      },
    ]);

    console.log('Seed complete');
    console.log('Admin login: admin@circular.local / Admin123!');
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

run();
