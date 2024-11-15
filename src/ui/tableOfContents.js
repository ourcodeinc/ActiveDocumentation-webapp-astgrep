import React, {Component} from "react";
import "../App.css";
import {connect} from "react-redux";
import {Button, Stack} from "react-bootstrap";
import {MdPlaylistAdd} from "react-icons/md";
import {HASH_CONSTANTS} from "./uiConstants";
import {CONFIG} from "../config";

class TableOfContents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ruleTable: props.ruleTable ?? [],
            tagTable: props.tagTable ?? [],
        };
    }

    handleTagClick = (tagIndex) => {
        window.location.hash = `#/${HASH_CONSTANTS.TAG}/${tagIndex}`;
    };

    componentDidUpdate(prevProps) {
        if (prevProps.ruleTable !== this.props.ruleTable ||
            prevProps.tagTable !== this.props.tagTable) {
            this.setState({
                ruleTable: this.props.ruleTable,
                tagTable: this.props.tagTable,
            });
        }
    }

    render() {
        return (
            <div data-testid={"tableOfContents"}>
                {this.renderTags()}
                {this.renderRules()}
                {this.renderWelcomeMessage()}
            </div>
        );
    }

    renderTags() {
        if (this.state.ruleTable.length === 0 || this.state.tagTable.length === 0) return null;

        return (
            <>
                <div className="well well-sm" data-testid="tags-header">
                    <h4>Tags</h4>
                </div>
                <ul className="list-inline" id="tags_list">
                    {this.state.tagTable.map((tag, i) => (
                        <li key={i} onClick={() => this.handleTagClick(tag.index)}>
                            {tag.tagName}
                        </li>
                    ))}
                </ul>
            </>
        );
    }

    renderRules() {
        if (this.state.ruleTable.length === 0) return null;

        return (
            <>
                <div className="border p-3 bg-light rounded" data-testid="rules-header">
                    <h4>{"All Documented Rules"}</h4>
                </div>
                <div className="table-responsive">
                    <Stack className="pt-2">
                        {this.state.ruleTable.map((rule, i) => (
                            <div key={i}>
                                <div className="border p-3 rounded">{rule.title}</div>
                            </div>
                        ))}
                    </Stack>
                </div>
            </>
        );
    }

    renderWelcomeMessage() {
        if (this.state.ruleTable.length > 0) return null;
        return (
            <div>
                <p>Welcome to the Rules Dashboard! This tool helps you manage design rules for your projects.</p>
                <p>Explore how easy it is to create, view, and manage design rules with the intuitive interface.</p>
                <br />
                <div style={{marginTop: "20px"}}>
                    <h4>How Active Documentation Works?</h4>
                    <p>ActiveDocumentation seamlessly integrates into your IDE and codebase, automatically monitoring and enforcing design rules.</p>
                    <div style={{marginTop: "20px", color: "red"}}>
                        <p><b>Have not installed Plugin yet?</b></p>
                        <p>Please check out the <a href={CONFIG.INSTALLATION_LINK}>installation process here</a> to install the plugin and get started.</p>
                    </div>
                </div>
                <div>
                    <div>
                        <img
                            src={`${process.env.PUBLIC_URL}/RulePad.png`}
                            alt="Rules Dashboard Screenshot"
                            style={{width: "450px", height: "400px", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"}}
                        />
                    </div>
                    <br />
                    <p>Start by creating a rule to begin!</p>
                    <div className="ist-inline">
                        <div style={{padding: "10px 0 10px 0", clear: "both"}}>
                            <Button style={{padding: "0 5px"}}
                                onClick={() => {
                                    window.location.hash = `#/${HASH_CONSTANTS.ALL_RULES}`;
                                }}>
                                <MdPlaylistAdd className="react-icons" size={35}/>
                                    Add a New Rule
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(reduxState) {
    return {
        ruleTable: reduxState.ruleTable,
        tagTable: reduxState.tagTable,
    };
}

export default connect(mapStateToProps, null)(TableOfContents);
