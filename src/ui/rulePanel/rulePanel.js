import React, {Component} from "react";
import {Collapse, Tab, Tabs, Badge} from "react-bootstrap";
import {FaCaretDown, FaCaretUp} from "react-icons/fa";
import {MdEdit} from "react-icons/md";
import SnippetView from "./snippetView";
import {countSnippets} from "../../core/ruleProcessor";

class RulePanel extends Component {
    constructor(props) {
        super(props);

        const {totalSatisfiedSnippetsCount, totalViolatedSnippetsCount} =
            countSnippets(props.ruleI);

        this.state = {
            ruleI: props.ruleI,
            isPanelOpen: true,
            activeSnippetTab: null,

            totalSatisfiedSnippetsCount,
            totalViolatedSnippetsCount,
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.ruleI !== this.props.ruleI) {
            const {totalSatisfiedSnippetsCount, totalViolatedSnippetsCount} =
            countSnippets(this.props.ruleI);

            this.setState({
                ruleI: this.props.ruleI,
                isPanelOpen: true,
                activeSnippetTab: null,

                totalSatisfiedSnippetsCount,
                totalViolatedSnippetsCount,
            });
        }
    }

    render() {
        return (
            <div className={"rulePanelDiv"}>
                <div className={"d-flex flex-column"}>
                    {this.renderControlBar()}
                    <div className="text-start">
                        <strong>{this.state.ruleI.title}</strong>
                        <p>{this.state.ruleI.description}</p>
                    </div>
                </div>
                <Collapse in={this.state.isPanelOpen}>
                    <div>
                        <div className={"clearfix"}>
                            {this.renderTags()}
                        </div>
                        <div className={"pt-2 clearfix"}>
                            {this.renderSnippetTabs()}
                        </div>
                    </div>
                </Collapse>
            </div>
        );
    }

    /**
     * Renders
     */
    renderControlBar() {
        return (
            <div className={"d-flex justify-content-end"}>
                <FaCaretUp
                    data-testid="caret-up"
                    size={20}
                    onClick={() => this.setState({isPanelOpen: false})}
                    className={"react-icons caret" + (this.state.isPanelOpen ? " active" : "")}
                />
                <FaCaretDown
                    data-testid="caret-down"
                    size={20}
                    onClick={() => this.setState({isPanelOpen: true})}
                    className={"react-icons caret" + (this.state.isPanelOpen ? "" : " active")}
                />
                <MdEdit
                    data-testid="edit-icon"
                    size={20}
                    className={"react-icons"}
                />
            </div>
        );
    }

    /**
     * Renders tag badges
     */
    renderTags() {
        return (this.state.ruleI.tags).map((tag, i) => {
            return (
                <div className={"buttonDiv link"} key={i}>
                    <Badge bg="secondary">{tag}</Badge>
                </div>);
        });
    }

    /**
     * Renders the snippet tabs
     */
    renderSnippetTabs() {
        return (
            <Tabs
                activeKey={this.state.activeSnippetTab}
                onSelect={(key) => {
                    this.setState({activeSnippetTab: this.state.activeSnippetTab === key ? null : key});
                }}
                transition={true}
            >
                <Tab eventKey={"satisfied"} title={this.renderTabHeader("satisfied")}>
                    {this.renderListOfSnippets("satisfiedSnippets")}
                </Tab>
                <Tab eventKey={"violated"} title={this.renderTabHeader("violated")}>
                    {this.renderListOfSnippets("violatedSnippets")}
                </Tab>
            </Tabs>
        );
    }

    /**
     * Renders the tab headers
     * @param group
     */
    renderTabHeader(group) {
        switch (group) {
            case "satisfied":
                return (
                    <small className="rulePanelSatisfiedTab">{"Examples"}
                        <Badge bg="secondary" className={"ms-1"}>{this.state.totalSatisfiedSnippetsCount}</Badge>
                    </small>);
            case "violated":
                return (
                    <small className="rulePanelViolatedTab">{"Violated"}
                        <Badge bg="secondary" className={"ms-1"}>{this.state.totalViolatedSnippetsCount}</Badge>
                    </small>);
            default:
                break;
        }
    }

    /**
     * Creates a list div node for quantifier and satisfied result and wrap them in a div
     * @param group {string}
     */
    renderListOfSnippets(group) {
        return this.state.ruleI.results?.map((resultObjectsArrays) => {
            return resultObjectsArrays?.map((resultObjectsArray) => {
                const snippets = resultObjectsArray.snippets?.[group] ?? [];
                return snippets.map((snippet, i) => {
                    return (
                        <SnippetView
                            key={i}
                            snippetData={snippet}
                            snippetFilePath={resultObjectsArray.relativeFilePath}
                        />
                    );
                });
            });
        });
    }
}

export default RulePanel;
