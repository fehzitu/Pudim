const fs = require("fs");

// queue system, prevents multiple writes at the same time
const writeQueue = new Map();

// function to safely save json data
function saveJson(path, data) {
    // convert object to formatted json string
    const json = JSON.stringify(data, null, 2);

    // get previous write promise for this path (or empty promise)
    const previous = writeQueue.get(path) || Promise.resolve();

    // wait previous write finish before writing again
    const next = previous
        .then(() => fs.promises.writeFile(path, json))
        .catch(console.error); // catch possible errors

    // store the new promise in the queue
    writeQueue.set(path, next);

    // after finishing, remove from queue if still the same promise
    next.finally(() => {
        if (writeQueue.get(path) === next) {
            writeQueue.delete(path);
        }
    });

    // return promise so other parts can await if needed
    return next;
};

module.exports = { saveJson };