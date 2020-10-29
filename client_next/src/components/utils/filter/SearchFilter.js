import React, {useState, useRef, useLayoutEffect, useEffect} from "react"
import {connect, useDispatch, useSelector} from "react-redux";
import {Card, Image} from "antd"
import Router from "next/router";
import OptionCard from "../card/OptionCard";
import ModalFilter from "./ModalFilter";
import {BACKEND_URL} from "../../../../config";
import PlusIcon from "../../../static/icons/plus.svg"
import Icon from '@ant-design/icons'
import queryString from "query-string"

const filterSize = 6;

const getOptionsFromQuery = (queryOptions, generalOptions) => {
    console.log(queryOptions, generalOptions);
    return queryOptions.map((option) => {
        return generalOptions.find((o) => o.name === option)
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

function SearchFilter({options, optionName, categories, params, filter}) {

    console.log(options, categories, params);

    let initialState;
    if (params === undefined) {
        initialState = [];
    } else {
        initialState = [options.find((option) => option.name === params)]
    }
    const urlParams = new URLSearchParams(window.location.search);
    initialState = initialState.concat(getOptionsFromQuery(urlParams.getAll(optionName), options));


    const sort = useSelector(state => state.recipesReducer.sort);
    const dispatch = useDispatch();

    const [selectedItems, setSelectedItems] = useState(initialState);
    const [isVisible, setVisible] = useState(false);
    const firstUpdate = useRef(true);

    useEffect(() => {
        filter(selectedItems);
    }, []);

    useLayoutEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }
        redirectToFilterLink();
        filter(selectedItems);
    }, [selectedItems]);

    function redirectToFilterLink() {
        let href = window.location.href;
        let routes = href.split("/");
        let params = routes[routes.length - 1].split("?")[0];
        let queryObject = queryString.parse(params);
        let optionsArray = selectedItems.slice(1);
        let paramsObject = queryString.parse(routes[routes.length - 1].split("?")[1]);
        queryObject[optionName] = selectedItems[0] ? selectedItems[0].name : undefined;
        paramsObject[optionName] = optionsArray.map((item) => item.name);
        let queryStr = queryString.stringify(queryObject, {
            skipNull: true
        });
        Router.push({
            pathname: Router.pathname,
            query: {
                ...paramsObject,
                category: "breakfast",
                params: queryStr ? queryStr : "all"
            }
        }).then();
        dispatch({type: sort, payload: null});
    }

    function handleItemUnselect(key) {
        setSelectedItems(selectedItems.filter((item, index) => parseInt(key) !== index));
        filter(selectedItems);
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
            return item.name === option.name;
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
                    <OptionCard key={i}
                                index={i}
                                productIcon={getOptionIcon(selectedItems[i])}
                                onItemDelete={handleItemUnselect}
                                onItemClick={handleItemClick}/>
                    <span style={{fontWeight: "500", fontSize: "10px"}}>
                        {selectedItems[i] !== undefined ? selectedItems[i].caption : ""}
                    </span>
                </div>
            )
        }
        cards.push(
            <div style={{display: "inline-block"}}>
                <OptionCard key={filterSize - 1}
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

export default SearchFilter;