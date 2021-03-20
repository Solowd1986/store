import React from "react";

export default function withParent(Component) {
    return class extends Component {
        constructor(props) {
            console.log(props);
            super(props);
            this.state = { loading: true };
        }

        render() {
            console.log(this.props);
            return (
                <div>parent {super.render()}</div>
            )
        }

    }
}




