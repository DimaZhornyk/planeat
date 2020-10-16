import React, { useState, useEffect } from "react"
import {AutoComplete, Card} from "antd"

function SearchFilter( {option} ) {

    const [selectedItems, setSelectedItems] = useState([]);

    useEffect(() => {
        //TODO on selected item change
    },[selectedItems]);

    const options = [
        {
            value: 'Помідор',
        },
        {
            value: 'Огірок',
        },
        {
            value: 'Капуста',
        },
    ];

    return (
        <Card>
            <p>
                Прибори
            </p>
            <AutoComplete
                style={{
                    width: "100%"
                }}
                options={options}
                placeholder="Пошук..."
                filterOption={(inputValue, option) =>
                    option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                    //TODO rewrite this logic
                }
            />
        </Card>
    )
}

export default SearchFilter;