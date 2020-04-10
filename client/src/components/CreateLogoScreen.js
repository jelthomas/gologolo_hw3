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

    render() {
        let text, color, backgroundColor, borderColor, fontSize, borderRadius, borderWidth, padding, margin;
        return (
            <Mutation mutation={ADD_LOGO} onCompleted={() => this.props.history.push('/')}>
                {(addLogo, { loading, error }) => (
                    <div className="container">
                        <div className="panel panel-default">
                            <nav>
                                <div className="nav-wrapper">
                                    <div className="panel-heading">
                                        <div><Link style={{color:"white"}} id="homeButton" to="/">Home</Link></div>
                                    </div>
                                </div>
                            </nav>
                            <h3 className="panel-title">
                                Create Logo
                            </h3>
                            <div className="panel-body">
                                <form onSubmit={e => {
                                    e.preventDefault();
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
                                }}>
                                    <div className="form-group">
                                        <label htmlFor="text">Text:</label>
                                        <input type="text" className="form-control" name="text" ref={node => {
                                            text = node;
                                        }} placeholder="Text" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="color">Color:</label>
                                        <input type="color" className="form-control" name="color" ref={node => {
                                            color = node;
                                        }} placeholder="Color" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="backgroundColor">Background Color:</label>
                                        <input type="color" className="form-control" name="backgroundColor" ref={node => {
                                            backgroundColor = node;
                                        }} placeholder="Background Color" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="borderColor">Border Color:</label>
                                        <input type="color" className="form-control" name="borderColor" ref={node => {
                                            borderColor = node;
                                        }} placeholder="Border Color" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="fontSize">Font Size:</label>
                                        <input type="number" className="form-control" name="fontSize" ref={node => {
                                            fontSize = node;
                                        }} placeholder="Font Size" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="borderRadius">Border Radius:</label>
                                        <input type="number" className="form-control" name="borderRadius" ref={node => {
                                            borderRadius = node;
                                        }} placeholder="Border Radius" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="borderWidth">Border Width:</label>
                                        <input type="number" className="form-control" name="borderWidth" ref={node => {
                                            borderWidth = node;
                                        }} placeholder="Border Width" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="padding">Padding:</label>
                                        <input type="number" className="form-control" name="padding" ref={node => {
                                            padding = node;
                                        }} placeholder="Padding" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="margin">Margin:</label>
                                        <input type="number" className="form-control" name="margin" ref={node => {
                                            margin = node;
                                        }} placeholder="Margin" />
                                    </div>
                                    <button type="submit" className="btn btn-success">Submit</button>
                                </form>
                                {loading && <p>Loading...</p>}
                                {error && <p>Error :( Please try again</p>}
                            </div>
                        </div>
                    </div>
                )}
            </Mutation>
        );
    }
}

export default CreateLogoScreen;