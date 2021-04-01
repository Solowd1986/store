import React, { PureComponent } from 'react';
import styles from './up-button.module.scss';
import cn from 'classnames';

class UpButton extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isPageScrolledToBottom: false,
        };
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll = () => {
        const offset = window.scrollY;
        const viewport = document.documentElement.clientHeight;
        if (offset > viewport) {
            this.setState({
                isPageScrolledToBottom: true,
            });
        } else {
            this.setState({
                isPageScrolledToBottom: false,
            });
        }
    };

    scrollUp = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    render() {
        const classList = cn(styles.up, {
            [styles.show]: this.state.isPageScrolledToBottom,
        });
        return <div onClick={this.scrollUp} className={classList} />;
    }
}

export default UpButton;
