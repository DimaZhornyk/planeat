import {ApolloClient, InMemoryCache} from "@apollo/client";
import {MAIN_BACKEND_URL} from "../config";


const Apollo = () => {
    return new ApolloClient({
        uri: MAIN_BACKEND_URL + '/graphql',
        cache: new InMemoryCache()
    })
}

export default Apollo()