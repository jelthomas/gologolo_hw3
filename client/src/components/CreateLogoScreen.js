import React, { Component } from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { Link } from 'react-router-dom';

const ADD_LOGO = gql`
    mutation AddLogo(
        $text: String!,
        $color: String!,
        $backgroundColor: String!,
        $borderColor: String!,
        $fontSize: Int!,
        $borderRadius: Int!,
        $borderWidth: Int!,
        $padding: Int!,
        $margin: Int!) {
        addLogo(
            text: $text,
            color: $color,
            backgroundColor: $backgroundColor,
            borderColor: $borderColor,
            fontSize: $fontSize,
            borderRadius: $borderRadius,
            borderWidth: $borderWidth,
            padding: $padding,
            margin: $margin) {
            _id
        }
    }
`;

class CreateLogoScreen extends Component {
    constructor() {
        super();

        // WE'LL MANAGE THE UI CONTROL
        // VALUES HERE
        this.state = {
            tempText: 'New Logo',
            text: "",
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

    checkNull = () => {
        var values = ['text', 'fontSize', 'borderRadius', 'borderWidth', 'padding', 'margin']
        for(let i = 0; i < values.length; i++){
            var x = document.forms["myForm"][values[i]].value;
            if (x == "") {
                alert(values[i] + " must be filled out");
                return false;
            }
        }
        return true;
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
            <Mutation mutation={ADD_LOGO} onCompleted={() => this.props.history.push('/')}>
                {(addLogo, { loading, error }) => (
                    <div className="container">
                        <div className="panel panel-default">
                            <nav className="shadow">
                                <div className="nav-wrapper">
                                    <div className="panel-heading">
                                        <div><Link style={{color:"white"}} id="homeButton" to="/">Home</Link></div>
                                    </div>
                                </div>
                            </nav>
                            <div className="row">
                            <div className="panel-body" style={{WebkitBoxShadow: "0 2px 2px 0 rgba(0,0,0,0.14),0 3px 1px -2px rgba(0,0,0,0.12),0 1px 5px 0 rgba(0,0,0,0.2)", width:"33.3333%", display: "inline-table", marginTop: "0.5rem", borderRadius: "5px", backgroundColor: "white", paddingLeft: "0.75rem", paddingRight: "0.75rem"}}>
                                <form name="myForm" onSubmit={e => {
                                    e.preventDefault();
                                    if(this.checkNull()){
                                    addLogo({ variables: { text: text.value, color: color.value, backgroundColor: backgroundColor.value, 
                                        borderColor: borderColor.value, fontSize: parseInt(fontSize.value), 
                                        borderRadius: parseInt(borderRadius.value), borderWidth: parseInt(borderWidth.value),
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
                                }}}>
                                    <div className="panel-title" style={{textAlign: "center", backgroundColor: "#546e7a", color: "white", marginTop: "0.5rem", marginBottom: "1rem", borderRadius: "5px"}}>
                                        <div style={{paddingTop: "0.5rem", paddingBottom: "0.5rem", fontSize: "30pt"}}>
                                            Create Logo
                                        </div>
                                    </div>
                                    <div style={{backgroundColor: "#546e7a", color:"white", paddingLeft: "20px"}}> 
                                        <div className="row" style={{paddingTop: "20px"}}>
                                            <div className="form-group">
                                                <div className="col s4" >Text:</div>
                                                <div className="col s8">
                                                    <input type="text" name="text" className="form-control" name="text" ref={node => {
                                                        text = node;
                                                    }} placeholder={this.state.text} value = {this.state.tempText} onChange = {this.handleInput}/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="form-group">
                                                <div className="col s4">Color:</div>
                                                <div className="col s8" style={{alignItems: "right"}}>
                                                    <input type="color" className="form-control" name="color" ref={node => {
                                                        color = node;
                                                    }} placeholder={this.state.color} value = {this.state.color} onChange = {this.handleTextColorChange} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="form-group">
                                                <div className="col s4">Background Color:</div>
                                                <div className="col s8">
                                                    <input type="color" className="form-control" name="backgroundColor" ref={node => {
                                                        backgroundColor = node;
                                                    }} placeholder={this.state.backgroundColor} onChange={this.handleBackgroundColorChange} value={this.state.backgroundColor}/>
                                                </div>
                                            </div>
                                        </div>   
                                        <div className="row">
                                            <div className="form-group">
                                                <div className="col s4">Border Color:</div>
                                                <div className="col s8">
                                                    <input type="color" className="form-control" name="borderColor" ref={node => {
                                                        borderColor = node;
                                                    }} placeholder={this.state.borderColor} onChange={this.handleBorderColorChange} value={this.state.borderColor}/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="form-group">
                                                <div className="col s4">Font Size:</div>
                                                <div className="col s8">
                                                    <input type="number" name="fontSize" min="4" max="144" className="form-control" name="fontSize" ref={node => {
                                                        fontSize = node;
                                                    }} placeholder={this.state.fontSize} onChange={this.handleFontSizeChange} value={this.state.fontSize}/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="form-group">
                                                <div className="col s4">Border Radius:</div>
                                                <div className="col s8">
                                                    <input type="number" name="borderRadius" min="0" max="200" className="form-control" name="borderRadius" ref={node => {
                                                        borderRadius = node;
                                                    }} placeholder={this.state.borderRadius} onChange={this.handleBorderRadiusChange} value={this.state.borderRadius}/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="form-group">
                                                <div className="col s4">Border Width:</div>
                                                <div className="col s8">
                                                    <input type="number" name="borderWidth" min="0" max="200" className="form-control" name="borderWidth" ref={node => {
                                                        borderWidth = node;
                                                    }} placeholder={this.state.borderWidth} onChange={this.handleBorderWidthChange} value={this.state.borderWidth} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="form-group">
                                                <div className="col s4">Padding:</div>
                                                <div className="col s8">
                                                    <input type="number" name="padding" min="0" max="200" className="form-control" name="padding" ref={node => {
                                                        padding = node;
                                                    }} placeholder={this.state.padding} onChange={this.handlePaddingChange} value={this.state.padding} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="form-group">
                                                <div className="col s4">Margin:</div>
                                                <div className="col s8">
                                                    <input type="number" name="margin" min="0" max="200" className="form-control" name="margin" ref={node => {
                                                        margin = node;
                                                    }} placeholder={this.state.margin} onChange={this.handleMarginChange} value={this.state.margin}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn-success" style={{marginBottom: "1rem", marginLeft: "7.5rem"}}>Submit</button>
                                </form>
                                {loading && <p>Loading...</p>}
                                {error && <p>Error :( Please try again</p>}
                            </div>
                            <div className="col s8" style={{width:"66.66666%", height: "max-content", marginTop: "0.5rem", marginLeft: "0.5rem"}}> 
                                <div>
                                    <pre className="logo" style={ styles.container }>
                                        {this.state.tempText}
                                    </pre>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                )}
            </Mutation>
        );
    }
}

export default CreateLogoScreen;