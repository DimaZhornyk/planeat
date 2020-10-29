import React, {useState} from "react"
import {Dropdown, Menu} from "antd";
import {SORT_BY_ACCESSORIES, SORT_BY_CALORIES, SORT_BY_PRODUCTS, SORT_BY_TIME} from "../../../_actions/sort_types";
import DownOutlined from "@ant-design/icons/lib/icons/DownOutlined";
import {sortByAccessories, sortByCalories, sortByProducts, sortByTime} from "../../../_actions/sort_actions";
import {connect} from "react-redux";

function RecipesSort({
                         sortByTime,
                         sortByCalories,
                         sortByProducts,
                         sortByAccessories
                     }) {

    const [selectedSort, setSelectedSort] = useState(SORT_BY_TIME);

    const sorts = {};
    sorts[SORT_BY_TIME] = {
        caption: "за часом",
        func: sortByTime
    };
    sorts[SORT_BY_CALORIES] = {
        caption: "за калоріями",
        func: sortByCalories
    };
    sorts[SORT_BY_PRODUCTS] = {
        caption: "за продуктами",
        func: sortByProducts
    };
    sorts[SORT_BY_ACCESSORIES] = {
        caption: "за приладдям",
        func: sortByAccessories
    };

    const handleMenuClick = e => {
        setSelectedSort(e.key);
        sorts[e.key].func();
    };

    const menu = (
        <Menu>
            {
                Object.keys(sorts).map((key) => (
                    <Menu.Item key={key} onClick={handleMenuClick}>
                        <p>{sorts[key].caption}</p>
                    </Menu.Item>
                ))
            }
        </Menu>
    );

    return (
        <Dropdown overlay={menu} trigger={['click']}>
            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                {sorts[selectedSort].caption} <DownOutlined/>
            </a>
        </Dropdown>
    )
}

const mapDispatchToProps = {
    sortByTime,
    sortByCalories,
    sortByProducts,
    sortByAccessories
};

export default connect(null, mapDispatchToProps)(RecipesSort);