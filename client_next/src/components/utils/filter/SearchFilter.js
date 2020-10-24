import React, {useState, useRef, useLayoutEffect, useEffect} from "react"
import {Card, Image} from "antd"
import {connect, useDispatch, useSelector} from "react-redux";
import Router from "next/router";
import ProductCard from "../card/ProductCard";
import ModalFilter from "./ModalFilter";
import {BACKEND_URL} from "../../../../config";
import PlusIcon from "../../../static/icons/plus.svg"
import Icon from '@ant-design/icons'
import {filterByProducts} from "../../../_actions/sort_actions";
import queryString from "query-string"

const filterSize = 6;

const getOptionsFromQuery = (queryOptions, generalOptions) => {
    return queryOptions.map((option) => {
        return generalOptions.find((o) => o.productName === option)
    })
};

export function getOptionIcon(option) {
    if (option !== undefined) {
        return (
            <Image src={BACKEND_URL + option.icon.url}/>
        )
    } else {
        return undefined;
    }
}

function SearchFilter({options, categories, params, filterByProducts}) {

    let initialState;
    if (params === undefined) {
        initialState = [];
    } else {
        initialState = [options.find((option) => option.productName === params)]
    }
    const urlParams = new URLSearchParams(window.location.search);
    initialState = initialState.concat(getOptionsFromQuery(urlParams.getAll("product"), options));


    const sort = useSelector(state => state.recipesReducer.sort);
    const dispatch = useDispatch();

    console.log(typeof sort);
    console.log(initialState);
    const [selectedItems, setSelectedItems] = useState(initialState);
    const [isVisible, setVisible] = useState(false);
    const firstUpdate = useRef(true);

    useEffect(() => {
        filterByProducts(selectedItems);
    }, []);

    useLayoutEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }
        redirectToFilterLink();
        filterByProducts(selectedItems);
        console.log("filter");
    }, [selectedItems]);

    function redirectToFilterLink() {
        let href = window.location.href;
        let routes = href.split("/");
        let params = routes[routes.length - 1].split("?")[0];
        let queryObject = queryString.parse(params);
        let paramsArray = selectedItems.slice(1);
        queryObject.product = selectedItems[0] ? selectedItems[0].productName : undefined;
        let queryStr = queryString.stringify(queryObject, {
            skipNull: true
        });
        Router.push({
            pathname: Router.pathname,
            query: {
                product: paramsArray.map((item) => item.productName),
                category: "breakfast",
                params: queryStr ? queryStr : "all"
            }
        }).then();
        dispatch({type: sort, payload: null});
    }

    function handleItemUnselect(key) {
        setSelectedItems(selectedItems.filter((item, index) => parseInt(key) !== index));
        filterByProducts(selectedItems);
        redirectToFilterLink();
    }

    function handleItemClick(key) {
        key = parseInt(key);
        if (key === filterSize - 1) {
            setVisible(true);
        } else {
            //TODO popover
            console.log("POPOVER")
        }
    }

    function handleCancelClick() {
        setVisible(false)
    }

    function handleSelectClick(option) {
        let isIncluded = selectedItems.find((item) => {
            return item.productName === option.productName;
        });
        if (!isIncluded) {
            setSelectedItems([...selectedItems, option]);
            redirectToFilterLink();
        }
    }

    function getOptionCards() {
        let cards = [];
        for (let i = 0; i < filterSize - 1; i++) {
            cards.push(
                <div style={{display: "inline-block"}}>
                    <ProductCard key={i}
                                 index={i}
                                 productIcon={getOptionIcon(selectedItems[i])}
                                 onItemDelete={handleItemUnselect}
                                 onItemClick={handleItemClick}/>
                    <span style={{fontWeight: "500", fontSize: "10px"}}>
                        {selectedItems[i] !== undefined ? selectedItems[i].productCaption : ""}
                    </span>
                </div>
            )
        }
        cards.push(
            <div style={{display: "inline-block"}}>
                <ProductCard key={filterSize - 1}
                             index={filterSize - 1}
                             productIcon={<Icon component={PlusIcon} style={{fontSize: "24px"}}/>}
                             onItemClick={handleItemClick}
                             isEnabled={false}/>
                <span style={{fontWeight: "500", fontSize: "10px"}}>Додати</span>
            </div>);
        return cards;
    }

    return (
        <Card>
            <p>
                Прибори
            </p>
            <div style={{display: "flex", width: "100%", textAlign: "center"}}>
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

const mapDispatchToProps = {
    filterByProducts
};

export default connect(null, mapDispatchToProps)(SearchFilter);