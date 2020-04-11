import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";

const GET_LOGO = gql`
    query logo($logoId: String) {
        logo(id: $logoId) {
            _id
            text
            color
            backgroundColor
            borderColor
            fontSize
            borderRadius
            borderWidth
            padding
            margin
        }
    }
`;

const UPDATE_LOGO = gql`
    mutation updateLogo(
        $id: String!,
        $text: String!,
        $color: String!,
        $backgroundColor: String!,
        $borderColor: String!,
        $fontSize: Int!,
        $borderRadius: Int!,
        $borderWidth: Int!,
        $padding: Int!,
        $margin: Int!,) {
            updateLogo(
                id: $id,
                text: $text,
                color: $color,
                backgroundColor: $backgroundColor,
                borderColor: $borderColor,
                fontSize: $fontSize,
                borderRadius: $borderRadius,
                borderWidth: $borderWidth,
                padding: $padding,
                margin: $margin) {
                    lastUpdate
                }
        }
`;

class EditLogoScreen extends Component {
    constructor() {
        super();

        // WE'LL MANAGE THE UI CONTROL
        // VALUES HERE
        this.state = {
            tempText: null,
            text: null,
            color : "#FFFFFF",
            fontSize : 24,
            backgroundColor: "#FF0000",
            borderColor: "#FFFFFF",
            borderRadius: 0,
            borderWidth: 0,
            margin: 0,
            padding: 0
        }
    }

    handleInput = (event) => {
        console.log(this.state.tempText);
        this.setState({tempText: event.target.value, backgroundColor: this.state.backgroundColor, color: this.state.color, 
            fontSize: this.state.fontSize, borderRadius: this.state.borderRadius, borderWidth: this.state.borderWidth,
            padding: this.state.padding, margin: this.state.margin, text: this.state.text, borderColor: this.state.borderColor});
    }

    handleTextColorChange = (event) => {
        console.log("handleTextColorChange to " + event.target.value);
        this.setState({ color: event.target.value, fontSize: this.state.fontSize, backgroundColor: this.state.backgroundColor,
                        borderColor: this.state.borderColor, borderRadius: this.state.borderRadius, borderWidth: this.state.borderWidth,
                        padding: this.state.padding, margin: this.state.margin, text: this.state.text});
    }

    handleFontSizeChange = (event) => {
        console.log("handleFontSizeChangeComplete to " + event.target.value);
        this.setState({ fontSize: event.target.value, color: this.state.color, backgroundColor: this.state.backgroundColor,
                        borderColor: this.state.borderColor, borderRadius: this.state.borderRadius, borderWidth: this.state.borderWidth,
                        padding: this.state.padding, margin: this.state.margin, text: this.state.text});
    }

    handleBorderRadiusChange = (event) => {
        console.log("handleBorderRadiusChange to " + event.target.value);
        this.setState({ borderRadius: event.target.value, fontSize: this.state.fontSize, color: this.state.color, 
                        backgroundColor: this.state.backgroundColor, borderColor: this.state.borderColor, borderWidth: this.state.borderWidth,
                        padding: this.state.padding, margin: this.state.margin, text: this.state.text});
    }
    
    handleBorderWidthChange = (event) => {
        console.log("handleBorderWidthChange to " + event.target.value);
        this.setState({ borderWidth: event.target.value, borderRadius: this.state.borderRadius, fontSize: this.state.fontSize, color: this.state.color, 
                        backgroundColor: this.state.backgroundColor, borderColor: this.state.borderColor,
                        padding: this.state.padding, margin: this.state.margin, text: this.state.text});
    }
    
    handlePaddingChange = (event) => {
        console.log("handlePaddingChange to " + event.target.value);
        this.setState({ padding: event.target.value, borderWidth: this.state.borderWidth, borderRadius: this.state.borderRadius, fontSize: this.state.fontSize, color: this.state.color, 
                        backgroundColor: this.state.backgroundColor, borderColor: this.state.borderColor, margin: this.state.margin, text: this.state.text});
    }

    handleMarginChange = (event) => {
        console.log("handleMarginChange to " + event.target.value);
        this.setState({ margin: event.target.value, borderWidth: this.state.borderWidth, borderRadius: this.state.borderRadius, fontSize: this.state.fontSize, color: this.state.color, 
                        backgroundColor: this.state.backgroundColor, borderColor: this.state.borderColor, padding: this.state.padding, text: this.state.text});
    }

    handleBackgroundColorChange = (event) => {
        console.log("handleBackGroundColorChangeComplete to " + event.target.value);
        this.setState({ backgroundColor: event.target.value, color: this.state.color, fontSize: this.state.fontSize, 
                        borderColor: this.state.borderColor, borderRadius: this.state.borderRadius, borderWidth: this.state.borderWidth,
                        padding: this.state.padding, margin: this.state.margin, text: this.state.text});
    }

    handleBorderColorChange = (event) => {
        console.log("handleBorderColorChangeComplete to " + event.target.value);
        this.setState({ borderColor: event.target.value, backgroundColor: this.state.backgroundColor, color: this.state.color, 
                    fontSize: this.state.fontSize, borderRadius: this.state.borderRadius, borderWidth: this.state.borderWidth,
                    padding: this.state.padding, margin: this.state.margin, text: this.state.text});
    }

    render() {
        let text, color, backgroundColor, borderColor, fontSize, borderRadius, borderWidth, padding, margin;
        const styles = {
            container: {
                text: this.state.text,
                color: this.state.color,
                fontSize: this.state.fontSize + "pt",
                background: this.state.backgroundColor,
                borderColor: this.state.borderColor,
                borderRadius: this.state.borderRadius +  "px",
                borderWidth: this.state.borderWidth + "px",
                borderStyle: "solid",
                padding: this.state.padding + "px",
                margin: this.state.margin + "px"
            }
        }
        return (
            <Query query={GET_LOGO} variables={{ logoId: this.props.match.params.id }}>
                {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;
                    if(this.state.text === null){
                        this.setState({backgroundColor: data.logo.backgroundColor, color: data.logo.color, fontSize: data.logo.fontSize, 
                            borderColor: data.logo.borderColor, borderRadius: data.logo.borderRadius, borderWidth: data.logo.borderWidth,
                            padding: data.logo.padding, margin: data.logo.margin, text: data.logo.text, tempText: data.logo.text});
                    }
                    return (
                        <Mutation mutation={UPDATE_LOGO} key={data.logo._id} onCompleted={() => this.props.history.push(`/`)}>
                            {(updateLogo, { loading, error }) => (
                                <div className="container">
                                    <nav>
                                        <div className="nav-wrapper">
                                            <div className="panel-heading">
                                                <div><Link style={{color:"white"}} id="homeButton" to="/">Home</Link></div>
                                            </div>
                                        </div>
                                    </nav>
                                    <h3 className="panel-title">
                                        Edit Logo
                                    </h3>
                                    <div className="row">
                                        <div className="panel-body" style={{width:"33.33333%"}}>                                            
                                            <form onSubmit={e => {
                                                e.preventDefault();
                                                updateLogo({ variables: { id: data.logo._id, text: text.value, color: color.value, backgroundColor: backgroundColor.value,
                                                    borderColor: borderColor.value, fontSize: parseInt(fontSize.value), borderRadius: parseInt(borderRadius.value), borderWidth: parseInt(borderWidth.value),
                                                    padding: parseInt(padding.value), margin: parseInt(margin.value) } });
                                                text.value = "";
                                                color.value = "";
                                                backgroundColor.value = "";
                                                borderColor.value = "";
                                                fontSize.value = "";
                                                borderRadius.value = "";
                                                borderWidth.value = "";
                                                padding.value = "";
                                                margin.value = "";
                                            }}>
                                                <div className="form-group">
                                                    <label htmlFor="text">Text:</label>
                                                    <input type="text" className="form-control" name="text" ref={node => {
                                                        text = node;
                                                    }} placeholder="Text" defaultValue={data.logo.text} value = {this.state.tempText} onChange = {this.handleInput}/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="color">Color:</label>
                                                    <input type="color" className="form-control" name="color" ref={node => {
                                                        color = node;
                                                    }} placeholder="Color" defaultValue={data.logo.color} onChange = {this.handleTextColorChange}/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="backgroundColor">Background Color:</label>
                                                    <input type="color" className="form-control" name="backgroundColor" ref={node => {
                                                        backgroundColor = node;
                                                    }} placeholder="Background Color" defaultValue={data.logo.backgroundColor} onChange = {this.handleBackgroundColorChange}/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="borderColor">Border Color:</label>
                                                    <input type="color" className="form-control" name="borderColor" ref={node => {
                                                        borderColor = node;
                                                    }} placeholder="Border Color" defaultValue={data.logo.borderColor} onChange = {this.handleBorderColorChange}/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="fontSize">Font Size:</label>
                                                    <input type="text" className="form-control" name="fontSize" ref={node => {
                                                        fontSize = node;
                                                    }} placeholder="Font Size" defaultValue={data.logo.fontSize} onChange = {this.handleFontSizeChange}/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="borderRadius">Border Radius:</label>
                                                    <input type="text" className="form-control" name="borderRadius" ref={node => {
                                                        borderRadius = node;
                                                    }} placeholder="Border Radius" defaultValue={data.logo.borderRadius} onChange = {this.handleBorderRadiusChange}/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="borderWidth">Border Width:</label>
                                                    <input type="text" className="form-control" name="borderWidth" ref={node => {
                                                        borderWidth = node;
                                                    }} placeholder="Border Width" defaultValue={data.logo.borderWidth} onChange = {this.handleBorderWidthChange}/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="padding">Padding:</label>
                                                    <input type="text" className="form-control" name="padding" ref={node => {
                                                        padding = node;
                                                    }} placeholder="Padding" defaultValue={data.logo.padding} onChange = {this.handlePaddingChange}/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="margin">Margin:</label>
                                                    <input type="text" className="form-control" name="margin" ref={node => {
                                                        margin = node;
                                                    }} placeholder="Margin" defaultValue={data.logo.margin} onChange = {this.handleMarginChange}/>
                                                </div>
                                                <button type="submit" className="btn btn-success">Submit</button>
                                            </form>
                                            {loading && <p>Loading...</p>}
                                            {error && <p>Error :( Please try again</p>}
                                        </div>
                                        <div className="col s8" style={{width:"66.66666%"}}> 
                                            <div>
                                                <pre className="logo" style={ styles.container }>
                                                    {this.state.tempText}
                                                </pre>
                                            </div>
                                        </div>
                                    </div>
                                    </div>
                            )}
                        </Mutation>
                    );
                }}
            </Query>
        );
    }
}

export default EditLogoScreen;