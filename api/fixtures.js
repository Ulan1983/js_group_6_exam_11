const mongoose = require('mongoose');
const config = require('./config');

const User = require('./models/User');
const Category = require('./models/Category');
const Item = require('./models/Item');


const run = async () => {
	await mongoose.connect(config.database, config.databaseOptions);

	const collections = await mongoose.connection.db.listCollections().toArray();

	for (let coll of collections) {
		await mongoose.connection.db.dropCollection(coll.name);
	}

	const [user1, user2] = await User.create({
		username: 'Test1',
		password: '123',
		displayName: 'John Doe',
		phone: '+1234567',
		token: 'token1'
	}, {
		username: 'Test2',
		password: '123',
		displayName: 'Jack Daniels',
		phone: '+11223344',
		token: 'token2'
	});

	const [cat1, cat2, cat3] = await Category.create({
		title: 'TV',
		description: 'TV models'
	}, {
		title: 'Cars',
		description: 'All models of cars'
	}, {
		title: 'Mobile phones',
		description: 'All types of mobile phones'
	});

	await Item.create({
		title: 'Sony',
		description: 'Sony KD-65XG8096 Smart TV 65 – производительный ЖК-телевизор, который разработан специально для Вашего комфортного и качественного досуга. Яркий 65 (165 см)-дюймовый дисплей порадует зрителя превосходным уровнем цветового охвата и реалистичной графикой, что позволит максимально погрузиться в происходящее на экране. Он оснащен современной светодиодной подсветкой и разрешением 3840x2160 точек.',
		price: 140000,
		image: 'fixtures/sony_tv.jpeg',
		category: cat1,
		user: user1
	}, {
		title: 'LG',
		description: 'LG 55SM9010 Smart TV 55 – производительный ЖК-телевизор, который разработан специально для Вашего комфортного и качественного досуга. Яркий 55 (140 см)-дюймовый дисплей порадует зрителя превосходным уровнем цветового охвата и реалистичной графикой, что позволит максимально погрузиться в происходящее на экране. Он оснащен современной светодиодной подсветкой и разрешением 3840x2160 точек.',
		price: 102000,
		image: 'fixtures/lg_tv.jpeg',
		category: cat1,
		user: user2
	}, {
		title: 'Honda CRV',
		description: 'Свежий растоможен оформлен. Все стикеры на месте весь в родной краске. Без вложений сел и поехал!',
		price: 720000,
		image: 'fixtures/honda.jpg',
		category: cat2,
		user: user1
	}, {
		title: 'Mercedes',
		description: 'Свежий растоможен оформлен. Все стикеры на месте весь в родной краске. Без вложений сел и поехал! Авто с чистой историей.',
		price: 1300000,
		image: 'fixtures/mercedes.jpg',
		category: cat2,
		user: user2
	}, {
		title: 'Iphone',
		description: 'Смартфон Apple IPhone обладает хорошей камерой на 12+12 Мп. Объем встроенной памяти составляет 128 Gb. Оперативной памяти на 4 Gb хватает для стабильной работы системы. Под крышкой скрывается аккумулятор ёмкостью 3110 мАч. Смартфон имеет возможность беспроводной зарядки. Функция быстрой зарядки пригодится пользователям, которые ценят свое время. Поддержка диапазона 4G даст вам возможность пользоваться быстрым интернетом.',
		price: 62000,
		image: 'fixtures/iphone.jpg',
		category: cat3,
		user: user1
	}, {
		title: 'Samsung',
		description: 'Смартфон Samsung S10 Plus обладает хорошей камерой на 16+12+12 Мп. Объем встроенной памяти составляет 128 Gb. Оперативной памяти на 8 Gb хватает для стабильной работы системы. Под крышкой скрывается аккумулятор ёмкостью 4100 мАч. Смартфон имеет возможность беспроводной зарядки. Функция быстрой зарядки пригодится пользователям, которые ценят свое время. Поддержка диапазона 4G даст вам возможность пользоваться быстрым интернетом.',
		price: 52000,
		image: 'fixtures/samsung.jpg',
		category: cat3,
		user: user2
	});

	mongoose.connection.close();
};

run().catch(e => {
	mongoose.connection.close();
	throw e;
});