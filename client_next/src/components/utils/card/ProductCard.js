import React from "react"
import Icon from '@ant-design/icons'
import Cross from "../../../static/icons/crossIcon.svg"
import Tomato from "../../../static/icons/tomato.svg"

function ProductCard({index, productIcon, onItemDelete, onItemClick, isEnabled = true}) {

    let styles = {
        display: "flex",
        position: "relative",
        width: "40px",
        height: "40px",
        margin: "5px",
        padding: "5px",
        border: "dashed 2px #D9D9D9",
        borderRadius: "10px",
        justifyContent: "center",
        alignItems: "center"
    };

    if (productIcon !== undefined) {
        styles.border = "solid 2px #D9D9D9"
    }

    return (
        <div style={styles} onClick={(event) => {
            event.stopPropagation();
            onItemClick(index)
        }}>
            {productIcon !== undefined ?
                <div>
                    {productIcon}
                    {
                        isEnabled === true ?
                            <Icon component={Cross} style={{
                                position: "absolute",
                                top: "0px",
                                right: "0px",
                                transform: "translate(50%, -50%)"
                            }}
                                  onClick={(event => {
                                      event.stopPropagation();
                                      onItemDelete(index);
                                  })}/> : ""
                    }
                </div> : ""
            }
        </div>
    )
}

export default ProductCard;