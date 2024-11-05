import React, {Component, Fragment} from "react";
import RulePanel from "./rulePanel/rulePanel";
import {connect} from "react-redux";

class AllRules extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ruleTable: props.ruleTable,
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props.ruleTable !== prevProps.ruleTable) {
            this.setState({ruleTable: this.props.ruleTable});
        }
    }

    render() {
        return (
            <Fragment>
                {this.state.ruleTable.map((rule, i) =>
                    (<div key={i} className={"pb-1"}>
                        <RulePanel ruleI={rule}/>
                    </div>),
                )}
            </Fragment>
        );
    }
}

// map state to props
function mapStateToProps(reduxState) {
    return {
        ruleTable: reduxState.ruleTable,
    };
}

export default connect(mapStateToProps, null)(AllRules);
