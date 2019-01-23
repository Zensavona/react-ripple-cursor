import * as React from 'react';
interface InitialProps {
    size: number;
    colour: number[];
    scope: Window;
}
interface State {
    hidden: boolean;
    drag: boolean;
    animating: boolean;
    removeOnMouseUp: boolean;
    animation: string;
    x: number;
    y: number;
}
declare class Ripple extends React.Component<InitialProps, State> {
    static defaultProps: {
        size: number;
        colour: number[];
        scope: Window;
    };
    showEvents: string[];
    hideEvents: string[];
    pointer: any;
    state: {
        hidden: boolean;
        animating: boolean;
        animation: string;
        drag: boolean;
        removeOnMouseUp: boolean;
        x: number;
        y: number;
    };
    constructor(props: InitialProps);
    getPointer(): any;
    injectKeyFrames(): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    addEventListener(): void;
    removeEventListener(): void;
    showRipple(e: any): void;
    hideRipple(e: any): void;
    render(): JSX.Element;
}
export default Ripple;
