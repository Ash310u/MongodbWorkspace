import _ from 'lodash';
import faker from 'faker';
import { MongoClient } from 'mongodb';
import { GENRES } from './constants';

const MINIMUM_ARTISTS = 2;
const ARTISTS_TO_ADD = 15;

let artistsCollection;

const uri = "mongodb://localhost/upstar_music'";

const client = new MongoClient(uri);

async function run() {
  try {
    const db = client.db('upstar_music');

    artistsCollection = db.collection('artists');
    
    let count = await artistsCollection.countDocuments();
    
    if (count < MINIMUM_ARTISTS) {
      const artists = _.times(ARTISTS_TO_ADD, () => createArtist());

      artistsCollection.insertMany(artists);
    }

  } finally {
    await client.close();
  }
}
run().catch(console.dir);


function createArtist() {
  return {
    name: faker.name.findName(),
    age: randomBetween(15, 45),
    yearsActive: randomBetween(0, 15),
    image: faker.image.avatar(),
    genre: getGenre(),
    website: faker.internet.url(),
    netWorth: randomBetween(0, 5000000),
    labelName: faker.company.companyName(),
    retired: faker.random.boolean(),
    albums: getAlbums()
  };
}

function getAlbums() {
  return _.times(randomBetween(0, 5), () => {
    const copiesSold = randomBetween(0, 1000000);

    return {
      title: _.capitalize(faker.random.words()),
      date: faker.date.past(),
      copiesSold,
      numberTracks: randomBetween(1, 20),
      image: getAlbumImage(),
      revenue: copiesSold * 12.99
    };
  });
}

function getAlbumImage() {
  const types = _.keys(faker.image);
  const method = randomEntry(types);

  return faker.image[method]();
}

function getGenre() {
  return randomEntry(GENRES);
}

function randomEntry(array) {
  return array[~~(Math.random() * array.length)];
}

function randomBetween(min, max) {
  return ~~(Math.random() * (max-min)) + min;
}
