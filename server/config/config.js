function getMongoURI(username, password) {
    return `mongodb+srv://${username}:${password}@planeat.f1hnx.mongodb.net`
}

export default getMongoURI