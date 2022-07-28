import React from "react";

const CustomError = ({message, isSaveClick}) => {
    console.log(4, message, isSaveClick)
    return (<div
        className="text-danger"
        hidden={
            !(
                isSaveClick && message
            )
        }
    >
<
    span> {message}
</span>
    </div>)

}

export default CustomError;