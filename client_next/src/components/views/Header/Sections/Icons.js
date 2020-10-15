import React from "react"
import Icon from '@ant-design/icons'
import PlanEatSvg from "../../../../static/icons/PlanEat.svg"
import DishImageSvg from "../../../../static/icons/dishIcon.svg"
import MoreImageSvg from "../../../../static/icons/moreIcon.svg"

export function Logo(props) {

    return (
        <PlanEatSvg style={{margin: "0 80px 0 0"}}/>
    )
}

export function DishIcon(props) {

    return (
        <Icon component={DishImageSvg} style={{fontSize: "18px"}}/>
    )
}

export function MoreIcon(props) {
    return (
        <Icon component={MoreImageSvg} style={{fontSize: "18px"}}/>
    )
}