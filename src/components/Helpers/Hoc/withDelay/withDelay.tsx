import React, { Component } from "react";
import cn from "classnames";
import Spinner from "@components/Partials/Spinner/Spinner";
import * as util from "@components/Helpers/Functions/scrollbarHelper";

type withDelayState = {
    isDelayEnded: boolean
};

function withDelay(PropsComponent: React.ComponentType, ms = 1500):React.ReactNode {
    return class WithDelay extends Component<unknown, withDelayState> {
        constructor(props:unknown, private timer: ReturnType<typeof setTimeout> ) {
            super(props);
            this.state = { isDelayEnded: false };
        }

        componentDidMount():void {
            util.addScrollbarOffset();
            this.timer = setTimeout(() => {
                this.setState({ isDelayEnded: true });
            }, ms);
        }

        componentWillUnmount():void {
            clearTimeout(this.timer);
        }

        render():React.ReactNode {
            if (!this.state.isDelayEnded) {
                return (
                    <div className={cn("overlay", "overlay__b-bg")}>
                        <Spinner />
                    </div>
                );
            }
            return <PropsComponent />;
        }
    };
}

export default withDelay;
