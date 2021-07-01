import React from 'react'

const Part = (props) => {
    return (
        <div>
            <p>{props.name} - {props.exercises} exercises</p>
        </div>
    )
}

export default Part