const Artist = require('../models/artist');

/**
 * Sets a group of Artists as not retired
 * @param {array} _ids - An array of the _id's of of artists to update
 * @return {promise} A promise that resolves after the update
 */
module.exports = (_ids) => {
    module.exports = (_ids) => {
        return Artist.update(
            { _id: { $in: _ids } },
            { retired: false },
            { multi: true }
        )
        // or in 2023 i can use the new method like upadteMany, its actually the same thing in the background
    };
};
