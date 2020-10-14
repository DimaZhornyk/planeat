import React from "react";

import Link from "next/link";
import Strapi from "strapi-sdk-javascript";

export const strapi = new Strapi('http://localhost:1337')


const Index = () => {
    return (
        <>
            <p>Landing</p>
            <Link href={"/main"}>lol</Link>
        </>
    )
}

export default Index

