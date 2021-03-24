import React, { Component } from "react";




export const Alert = ( {children} ) => {
    const color = "red";
    return (<div>
        {children(color)}
    </div>)
};




class DataStore extends Component {

    state = {
        users: [
            {
                age: 12
            }
        ],
        shared: "pick"

    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log(this.state);
    }

    render() {
        return (
            <>
                <h2>STORE 1</h2>
                <input/>
                <button onClick={() => this.setState({
                    users: [
                        {
                            age: 13
                        }
                    ]})}>Change</button>
            </>
        )
    }
}

export default DataStore;


