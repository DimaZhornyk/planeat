import React from "react";
import {FacebookFilled, InstagramFilled, TwitterOutlined} from "@ant-design/icons";

function Share({recipeId}) {

    return (
        <div style={{display: "flex", position: "absolute", bottom: "0px", alignItems: "center", justifyContent: "center", width: "100%", marginBottom: "20px", backgroundColor: "white"}}>
            {/*<div style={{height: "0px", border: "1px solid rgba(0, 0, 0, 0.15)"}}/>*/}
            <p style={{fontSize: "18px", margin: "0px 50px"}}>Поділись рецептом з друзями!</p>
            <div style={{display: "flex"}}>
                <TwitterOutlined style={{color: '#FFCA44', fontSize: "35px", margin: "0px 15px"}}/>
                <FacebookFilled style={{color: '#FFCA44', fontSize: "35px", margin: "0px 15px"}}/>
                <InstagramFilled style={{color: '#FFCA44',  fontSize: "35px", margin: "0px 15px"}}/>
            </div>
            {/*<div style={{height: "0px", border: "1px solid rgba(0, 0, 0, 0.15)"}}/>*/}
        </div>
    )
}

export default Share