import React from "react";
import Labels from '../contants/Labels.json';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false}
    };

    static getDerivedStateFromError(error0) {
        return {hasError: true};
    }

    componentDidCatch(error, errorInfo) {
        return { hasError: true };
    }

    render() {
        const Label = Labels[window.globalConfig.language]
        if (this.state.hasError) {
            return (<div>
                {Label.message.errorConfessionMsg}
            </div>);
        } else {
            return (<div>{this.props.children}</div>);
        }
    }
}

export default ErrorBoundary;