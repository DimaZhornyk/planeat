import React from "react"
import Icon from '@ant-design/icons'
import PlanEatSvg from "../../../../static/icons/PlanEat.svg"
import dishImageSvg from "../../../../static/icons/dishIcon.svg"

export function Logo(props) {

    return (
        <PlanEatSvg/>
    )
}

export function DishIcon(props) {

    return (
        <Icon component={dishImageSvg} style={{}}/>
    )
}