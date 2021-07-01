import React, {useState} from "react";

const Hello = ({name, age}) => {
    // const {name, age} = props

    const bornYear = () => new Date().getFullYear() - age

    return (
        <div>
            <p>Hello {name}, you are {age} years old</p>
            <p>So you were probably born in {bornYear()}</p>
        </div>
    )
}

const Display = ({ counter }) => <div>{counter}</div>

const Button = ({handleClick, text}) => {
    return (
        <Button onClick={handleClick}>\
            {text}
        </Button>
    )
}

const App = () => {
    const name = 'Peter'
    const age = 10
    const [ counter, setCounter ] = useState(0)
    // const handleClick = () => {
    //     console.log('clicked')
    // }

    // setTimeout(
    //     () => setCounter(counter + 1),
    //     1000
    // )
    const increaseByOne = () => setCounter(counter + 1)
    const decreaseByOne = () => setCounter(counter - 1)
    const setToZero = () => setCounter(0)


    console.log('rendering...', counter);
    // const {counter} = props

    return (
        <div>
            <Display counter={counter} />
            <h1>Greetings</h1>

            {/* <button onClick={handleClick}>
                plus
            </button> */}
            {/* <button onClick={() => console.log('clicked')}>
                plus
            </button> */}

            {/* <button onClick={() => setCounter(counter + 1)}>
                plus
            </button>
            <button onClick={() => setCounter(0)}>
                zero
            </button>
            <button onClick={() => setCounter(counter - 1)}>
                minus
            </button> */}

            {/* <button onClick={increaseByOne}>plus</button>
            <button onClick={setToZero}>zero</button>
            <button onClick={decreaseByOne}>minus</button> */}
            <Button
                handleClick={increaseByOne}
                text='plus'
            />
            <Button
                handleClick={setToZero}
                text='zero'
            />
            <Button
                handleClick={decreaseByOne}
                text='minus'
            />
            <Hello name="Maya" age={26 + 10} />
            <Hello name={name} age={age} />
        </div>
    )
}

export default App;
