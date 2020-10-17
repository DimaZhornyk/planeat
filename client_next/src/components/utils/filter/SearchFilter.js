import React, {useState, useEffect} from "react"
import {Card} from "antd"
import ProductCard from "../card/ProductCard";
import ModalFilter from "./ModalFilter";

const filterSize = 6;

function SearchFilter({options, categories}) {

    console.log(options);

    const [selectedItems, setSelectedItems] = useState([{k: ""}, {k: ""}, {k: ""}]);
    const [isVisible, setVisible] = useState(false);

    function handleItemUnselect(key) {
        selectedItems.splice(parseInt(key), 1);
        console.log(selectedItems);
        setSelectedItems(selectedItems);
    }

    function handleItemClick(key) {
        if (parseInt(key) === filterSize - 1) {
            setVisible(true);
        } else {
            //TODO open popover
        }
    }

    function getOptionCards() {
        let cards = [];
        for (let i = 0; i < filterSize - 1; i++) {
            cards.push(
                <ProductCard key={i}
                             index={i}
                             product={selectedItems[i]}
                             onItemDelete={handleItemUnselect}
                             onItemClick={handleItemClick}/>
            )
        }
        cards.push(<ProductCard key={filterSize - 1} index={filterSize - 1} product={{k: " "}}
                                onItemClick={handleItemClick}
                                isEnabled={false}>
                        <span style={{fontSize: "8px", fontWeight: "500"}}>
                            Додати продукт
                        </span>
        </ProductCard>);
        return cards;
    }

    function handleCancelClick() {
        setVisible(false)
    }

    function handleSelectClick(key) {
        selectedItems.push(options[key]);
        setSelectedItems(selectedItems);
    }

    return (
        <Card>
            <p>
                Прибори
            </p>
            <div style={{display: "flex", width: "100%"}}>
                {getOptionCards()}
            </div>
            <ModalFilter options={options}
                         categories={categories}
                         isVisible={isVisible}
                         onCancel={handleCancelClick}
                         onSelect={handleSelectClick}/>
        </Card>
    )
}

export default SearchFilter;