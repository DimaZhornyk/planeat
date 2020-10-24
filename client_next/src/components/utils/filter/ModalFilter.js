import React, {useState, useEffect} from "react"
import {Col, Menu, Modal} from "antd";
import Search from "antd/lib/transfer/search";
import {MenuOutlined} from "@ant-design/icons";
import ProductCard from "../card/ProductCard";
import {getOptionIcon} from "./SearchFilter";

function ModalFilter({options, categories, isVisible, onCancel, onSelect}) {
    const [selectedCategory, setSelectedCategory] = useState(categories[0].categoryProductName);

    function getProductsFromSelectedCategory(category) {
        const products = options.filter((element) => {
            return element.category === category
        });
        return (
            products.map((product, index) => (
                <div key={index} style={{display: "flex", alignItems: "center", margin: "10px"}}>
                    <ProductCard productIcon={getOptionIcon(product)} isEnabled={false} onItemClick={(key) => onSelect(product)}/>
                    <div style={{display: "block"}}>
                        <span style={{fontSize: "10px", fontWeight: "600", display: "block", lineHeight: "10px"}}>
                        {product.productCaption}
                        </span>
                        <span style={{fontSize: "8px", fontWeight: "500", display: "block"}}>
                        {product.productCalories + " ккл / 100гр"}
                        </span>
                    </div>
                </div>
            ))
        )
    }

    return (
        <Modal
            width={700}
            visible={isVisible}
            footer={null}
            onCancel={onCancel}
        >
            <Menu style={{width: "150px"}}
                  mode="vertical"
                  defaultSelectedKeys={[categories[0].categoryProductName]}>
                {categories.map((category, index) => (
                    <Menu.Item icon={<MenuOutlined/>}
                               key={index}
                               index={category.categoryProductName}
                               onClick={({item, key, keyPath, selectedKeys, domEvent}) => {
                                   domEvent.stopPropagation();
                                   setSelectedCategory(categories[key].categoryProductName)
                               }}
                               style={{fontWeight: "600"}}>
                        {category.categoryProductDisplayNameUA}
                    </Menu.Item>
                ))}
            </Menu>
            <div>
                <Search
                    placeholder="Пошук..."
                    onSearch={value => console.log(value)}
                    style={{width: 200}}
                />

                <div style={{display: "flex", justifyContent: "start", flexWrap: "wrap", padding: "0px 20px"}}>
                    {getProductsFromSelectedCategory(selectedCategory)}
                </div>
            </div>
        </Modal>
    )
}

export default ModalFilter;