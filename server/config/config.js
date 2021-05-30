function getMongoURI(username, password) {
    console.log(`mongodb+srv://${username}:${password}@planeat.f1hnx.mongodb.net`)
    return `mongodb+srv://${username}:${password}@planeat.f1hnx.mongodb.net`
}

export default getMongoURI