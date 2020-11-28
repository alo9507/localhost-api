import { generateRandomPoint } from '../geo';

const cafeLocation = { latitude: 24.22244098031902, longitude: 23.125367053780863 };
const networkingEventLocation = { latitude: 50.22244098031902, longitude: 50.125367053780863 };

const locations = {
    cafe: generateRandomPoint(cafeLocation, 800),
    networkingEvent: generateRandomPoint(networkingEventLocation, 800)
};

const users = {
    john: {
        id: 'john',
        sex: 'male',
        name: 'John',
        email: 'john@g.com',
        bio: "John's bio",
        whatAmIDoing: 'What john is doing',
        isVisible: true,
        age: 25
    },
    nearby: {
        id: 'nearby',
        sex: 'male',
        name: 'Near By',
        email: 'john@g.com',
        bio: "John's bio",
        whatAmIDoing: 'What john is doing',
        isVisible: true,
        age: 25,
        latitude: 10,
        longitude: 10
    },
    lat10_long10: {
        id: 'lat10_long10',
        sex: 'male',
        name: 'John',
        email: 'john@g.com',
        bio: "John's bio",
        whatAmIDoing: 'What john is doing',
        isVisible: true,
        age: 25,
        latitude: 10,
        longitude: 10
    },
    lat80_long80: {
        id: 'lat80_long80',
        sex: 'male',
        name: 'John',
        email: 'john@g.com',
        bio: "John's bio",
        whatAmIDoing: 'What john is doing',
        isVisible: true,
        age: 25,
        latitude: 80,
        longitude: 80
    },
    male_25_visible: {
        id: 'male_25_visible',
        sex: 'male',
        name: 'John',
        email: 'john@g.com',
        bio: "John's bio",
        whatAmIDoing: 'What john is doing',
        isVisible: true,
        age: 25
    },
    male_25_invisible: {
        id: 'male_25_invisible',
        sex: 'male',
        name: 'John',
        email: 'john@g.com',
        bio: "John's bio",
        whatAmIDoing: 'What john is doing',
        isVisible: false,
        age: 25
    },
    female_25_visible: {
        id: 'female_25_visible',
        sex: 'female',
        name: 'John',
        email: 'john@g.com',
        bio: "John's bio",
        whatAmIDoing: 'What john is doing',
        isVisible: true,
        age: 25
    },
    female_25_invisible: {
        id: 'female_25_invisible',
        sex: 'female',
        name: 'John',
        email: 'john@g.com',
        bio: "John's bio",
        whatAmIDoing: 'What john is doing',
        isVisible: false,
        age: 25
    },
    male_40_visible: {
        id: 'male_40_visible',
        sex: 'male',
        name: 'John',
        email: 'john@g.com',
        bio: "John's bio",
        whatAmIDoing: 'What john is doing',
        isVisible: true,
        age: 40
    },
    female_40_visible: {
        id: 'female_40_visible',
        sex: 'female',
        name: 'John',
        email: 'john@g.com',
        bio: "John's bio",
        whatAmIDoing: 'What john is doing',
        isVisible: true,
        age: 40,
        latitude: locations['networkingEvent'].latitude,
        longitude: locations['networkingEvent'].longitude
    },
    jenny: {
        id: 'jenny',
        sex: 'female',
        name: 'Jenny',
        email: 'jenny@g.com',
        bio: "Jenny's bio",
        whatAmIDoing: 'What jenny is doing',
        isVisible: true,
        age: 50
    },
    bill: {
        id: 'bill',
        sex: 'male',
        name: 'Bill',
        email: 'bill@g.com',
        bio: "Bill's bio",
        whatAmIDoing: 'What Bill is doing',
        isVisible: true,
        age: 20,
        latitude: locations['cafe'].latitude,
        longitude: locations['cafe'].longitude
    },
    tamara: {
        id: 'tamara',
        sex: 'female',
        name: 'Tamara',
        email: 'tamara@g.com',
        bio: "Tamara's bio",
        whatAmIDoing: 'What Tamara is doing',
        isVisible: true,
        age: 24,
        latitude: locations['cafe'].latitude,
        longitude: locations['cafe'].longitude
    }
};

export default users;
