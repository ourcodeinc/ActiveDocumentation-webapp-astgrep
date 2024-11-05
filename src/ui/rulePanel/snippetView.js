import React, {Component} from "react";

class SnippetView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            snippetData: props.snippetData,
            snippetFilePath: props.snippetFilePath,
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props.snippetData !== prevProps.snippetData ||
            this.props.snippetFilePath !== prevProps.snippetFilePath) {
            this.setState({
                snippetData: this.props.snippetData,
                snippetFilePath: this.props.snippetFilePath,
            });
        }
    }

    render() {
        const firstTwoLines = this.state.snippetData.snippet.split("\n").slice(0, 2).join("\n");
        return (
            <section>
                <div data-file-path={this.state.snippetFilePath} className={"snippetDiv position-relative"}>
                    <div className={"filePath"} data-testid={"file-path"}>
                        {this.state.snippetFilePath}
                    </div>
                    <div className={"fullPath"}>
                        {this.state.snippetFilePath}
                    </div>
                    <div className={"link"}>
                        <pre className={"content"}>{firstTwoLines}</pre>
                    </div>
                </div>
            </section>
        );
    }
}

export default SnippetView;
