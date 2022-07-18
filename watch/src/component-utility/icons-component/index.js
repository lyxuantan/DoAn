import {ReactComponent as IconChevron} from "./../../assets/icons-svg/chevron_down.svg";
import {ReactComponent as IconArrowRight} from "./../../assets/icons-svg/arow-right.svg";

const Chevron = ({height}) => {
    return <>
        <IconChevron height={height}/>
    </>
}

const ArrowRight = ({height}) => {
    return <>
        <IconArrowRight height={height}/>
    </>
}

export  {Chevron, ArrowRight};