import {generateRandomPoint} from '../../geo';

const names = ['Andrew', 'Jamie', 'John', 'Reginald', 'Roger', 'Jefferey'];

const isVisible = [true, false];

const bios = ['Student just chillin', 'I am a narc', 'Wannabe policeman', 'Software engineer just hangin'];

const whatAmIDoings = [
  'Reading War and Peace and waiting to be interrupted',
  'Doing this and that',
  'Drinking a coffee'
];

const sex = ['male', 'female'];

const ages = [24, 20, 32, 43, 18, 14];

const emails = ['me1@g.com', 'me2@g.com', 'me3@g.com'];

const cafeLocation = {latitude: 24.22244098031902, longitude: 23.125367053780863};
const networkingEventLocation = {latitude: 24.22244098031902, longitude: 23.125367053780863};

const locations = {
  cafe: generateRandomPoint(cafeLocation, 999),
  networkingEvent: generateRandomPoint(networkingEventLocation, 999)
};

export {names, isVisible, bios, whatAmIDoings, sex, ages, emails};
