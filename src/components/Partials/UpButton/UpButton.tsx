import React, { PureComponent } from 'react';
import styles from './up-button.module.scss';
import cn from 'classnames';

class UpButton extends PureComponent<{ isisPageScrolledToBottom: boolean }> {

    state = {
        isPageScrolledToBottom: false,
    };

    componentDidMount(): void {
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount(): void {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll = ():void => {
        const offset = window.scrollY;
        const viewport = document.documentElement.clientHeight;
        offset > viewport ? this.setState({ isPageScrolledToBottom: true}) : this.setState({ isPageScrolledToBottom: false});
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
