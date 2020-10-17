import React from "react"
import Icon from '@ant-design/icons'
import CloseOutlined from "@ant-design/icons/lib/icons/CloseOutlined";
import Tomato from "../../../static/icons/tomato.svg"

function ProductCard({index, product, onItemDelete, onItemClick, isEnabled = true}) {

    let styles = {
        display: "flex",
        position: "relative",
        width: "40px",
        height: "40px",
        margin: "5px",
        border: "dashed 2px #D9D9D9",
        borderRadius: "10px",
        justifyContent: "center",
        alignItems: "center"
    };

    if (product !== undefined) {
        styles.border = "solid #D9D9D9"
    }

    return (
        <div style={styles} onClick={(event) => {
            event.stopPropagation();
            onItemClick(index)
        }}>
            {product !== undefined ?
                <div>
                    <Icon component={Tomato}
                          style={{fontSize: "20px"}}
                    />
                    {
                        isEnabled === true ?
                            <button style={{
                                width: "16px",
                                height: "16px",
                                position: "absolute",
                                top: "0px",
                                right: "0px",
                                borderRadius: "10px",
                                transform: "translate(50%,-50%)",
                                padding: "0px",
                                background: "red",
                                border: "none",
                                outline: "none"
                            }}
                                    onClick={(event) => {
                                        event.stopPropagation();
                                        onItemDelete(index)
                                    }}>
                                <CloseOutlined style={{fontSize: "10px", alignItems: "center", color: "white"}}/>
                            </button> : ""
                    }
                </div> : ""}
        </div>
    )
}

export default ProductCard;