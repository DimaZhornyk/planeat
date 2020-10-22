import React from "react";

function withSearch(Component) {
    const query = window.location.search;
    const params = new URLSearchParams(query);

    return props => {
        return (
            <Component {...props} query={params}/>
        )
    };
}

export default withSearch;