import React from 'react';

const Hello = (props) => {
    return (
        <div>
            <p>Hello {props.name}, you are {props.age} years old</p>
        </div>
    )
}

const Footer = () => {
    return (
        <div>
            greeting app created by <a href="https://github.com/liiinder">Kristoffer Linder</a>
        </div> 
    )
}

const App = () => {
    const now = new Date();
    const a = 10;
    const b = 20;
    console.log('hello from component');

    return (
        <>
            <p>Hello world, it is {now.toString()}</p>
            <p>
                {a} plus {b} is {a + b}
            </p>
            <Hello name="Kristoffer" age={34}/>
            <Hello name="Joakim" age={32}/>
            <Hello name="Martin" age={27}/>
            <Footer />
        </>
    )
};

export default App;