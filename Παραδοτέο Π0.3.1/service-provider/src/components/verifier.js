import React from "react";
import data from "./data.json"

function verifier() {
    return (
        <div className="Verifier">
            <div className="posts">
                {
                    data.map(post => {

                        return (
                            <div key={post.token} className="post">
                                {/*<h4>{post.attributeName}</h4>*/}
                                {/*     <p>{post.policyId }</p>*/}
                                {/*     <p>{post.operation }</p>*/}
                                {/*     <p>{post.name}</p>*/}
                                <pre dangerouslySetInnerHTML={{
                                    __html: JSON.stringify(data, null, 2),
                                }}/>
                            </div>

                        )

                    })
                }
            </div>
        </div>
    );
}

const getJSON = async url => {
    const response = await fetch(url);
    if (!response.ok) // check if response worked (no 404 errors etc...)
        throw new Error(response.statusText);

    const data = response.json(); // get JSON from the response
    return data; // returns a promise, which resolves to this data value
}

console.log("Fetching data...");
getJSON("http://localhost:8080/certs").then(data => {
    console.log(data);
}).catch(error => {
    console.error(error);
});

export default verifier;
