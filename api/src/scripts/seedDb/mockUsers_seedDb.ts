import { generateRandomPoint } from '../../geo';

const cafeLocation = { latitude: 24.22244098031902, longitude: 23.125367053780863 };
const networkingEventLocation = { latitude: 50.22244098031902, longitude: 50.125367053780863 };

const locations = {
    cafe: generateRandomPoint(cafeLocation, 800),
    networkingEvent: generateRandomPoint(networkingEventLocation, 800)
};

const users = {
    george: {
        id: "d78d7693-11bd-4692-a7b3-5023cb5daa62",
        sex: 'male',
        firstname: 'George',
        lastname: "Lastname",
        phoneNumber: "+1978323323",
        bio: "George's bio",
        whatAmIDoing: 'What George is doing',
        isVisible: true,
        age: 25,
        profileImageUrl: "https://randomuser.me/portraits/men/55.jpg"
    },
    john: {
        id: 'john',
        sex: 'male',
        phoneNumber: "+1978323323",
        firstname: 'John',
        lastname: "Lastname",
        bio: "John's bio",
        whatAmIDoing: 'What john is doing',
        isVisible: true,
        age: 25,
        profileImageUrl: "https://randomuser.me/portraits/men/56.jpg"
    },
    nearby: {
        id: 'nearby',
        sex: 'male',
        firstname: 'Near By',
        lastname: "Lastname",
        phoneNumber: "+1978323323",
        bio: "John's bio",
        whatAmIDoing: 'What john is doing',
        isVisible: true,
        age: 25,
        latitude: 10,
        longitude: 10,
        profileImageUrl: "https://randomuser.me/portraits/men/57.jpg"
    },
    lat10_long10: {
        id: 'lat10_long10',
        sex: 'male',
        firstname: 'John',
        lastname: "Lastname",
        phoneNumber: "+1978323323",
        bio: "John's bio",
        whatAmIDoing: 'What john is doing',
        isVisible: true,
        age: 25,
        latitude: 10,
        longitude: 10,
        profileImageUrl: "https://randomuser.me/portraits/men/25.jpg"
    },
    lat80_long80: {
        id: 'lat80_long80',
        sex: 'male',
        phoneNumber: "+1978323323",
        firstname: 'John',
        lastname: "Lastname",
        bio: "John's bio",
        whatAmIDoing: 'What john is doing',
        isVisible: true,
        age: 25,
        latitude: 80,
        longitude: 80,
        profileImageUrl: "https://randomuser.me/portraits/men/15.jpg"
    },
    male_25_visible: {
        id: 'male_25_visible',
        sex: 'male',
        firstname: 'John',
        lastname: "Lastname",
        phoneNumber: "+1978323323",
        bio: "John's bio",
        whatAmIDoing: 'What john is doing',
        isVisible: true,
        age: 25,
        profileImageUrl: "https://randomuser.me/portraits/men/43.jpg"
    },
    male_25_invisible: {
        id: 'male_25_invisible',
        sex: 'male',
        firstname: 'John',
        lastname: "Lastname",
        phoneNumber: "+1978323323",
        bio: "John's bio",
        whatAmIDoing: 'What john is doing',
        isVisible: false,
        age: 25,
        profileImageUrl: "https://randomuser.me/portraits/men/23.jpg"
    },
    female_25_visible: {
        id: 'female_25_visible',
        sex: 'female',
        firstname: 'John',
        lastname: "Lastname",
        phoneNumber: "+1978323323",
        bio: "John's bio",
        whatAmIDoing: 'What john is doing',
        isVisible: true,
        age: 25,
        profileImageUrl: "https://randomuser.me/portraits/men/23.jpg"
    },
    female_25_invisible: {
        id: 'female_25_invisible',
        sex: 'female',
        firstname: 'John',
        lastname: "Lastname",
        phoneNumber: "+1978323323",
        bio: "John's bio",
        whatAmIDoing: 'What john is doing',
        isVisible: false,
        age: 25,
        women: "https://randomuser.me/portraits/women/55.jpg"
    },
    male_40_visible: {
        id: 'male_40_visible',
        sex: 'male',
        firstname: 'John',
        phoneNumber: "+1978323323",
        lastname: "Lastname",
        bio: "John's bio",
        whatAmIDoing: 'What john is doing',
        isVisible: true,
        age: 40,
        profileImageUrl: "https://randomuser.me/portraits/men/65.jpg"
    },
    female_40_visible: {
        id: 'female_40_visible',
        sex: 'female',
        firstname: 'John',
        lastname: "Lastname",
        phoneNumber: "+1978323323",
        bio: "John's bio",
        whatAmIDoing: 'What john is doing',
        isVisible: true,
        age: 40,
        latitude: locations['networkingEvent'].latitude,
        longitude: locations['networkingEvent'].longitude,
        profileImageUrl: "https://randomuser.me/portraits/women/23.jpg"
    },
    jenny: {
        id: 'jenny',
        sex: 'female',
        firstname: 'Jenny',
        lastname: "Lastname",
        phoneNumber: "+1978323323",
        bio: "Jenny's bio",
        whatAmIDoing: 'What jenny is doing',
        isVisible: true,
        age: 50,
        latitude: locations['networkingEvent'].latitude,
        longitude: locations['networkingEvent'].longitude,
        profileImageUrl: "https://randomuser.me/portraits/men/25.jpg"
    },
    bill: {
        id: 'bill',
        sex: 'male',
        firstname: 'Bill',
        lastname: "Lastname",
        bio: "Bill's bio",
        // phoneNumber: "+1978323323",
        whatAmIDoing: 'What Bill is doing',
        isVisible: true,
        age: 20,
        latitude: locations['cafe'].latitude,
        longitude: locations['cafe'].longitude,
        profileImageUrl: "https://randomuser.me/portraits/men/76.jpg"
    },
    tamara: {
        id: 'tamara',
        sex: 'female',
        firstname: 'Tamara',
        lastname: "Lastname",
        phoneNumber: "+1978323323",
        bio: "Tamara's bio",
        whatAmIDoing: 'What Tamara is doing',
        isVisible: true,
        age: 24,
        latitude: locations['cafe'].latitude,
        longitude: locations['cafe'].longitude,
        profileImageUrl: "https://randomuser.me/portraits/women/78.jpg"
    }
};

export default users;
