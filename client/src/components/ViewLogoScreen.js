import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';

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
            lastUpdate
        }
    }
`;

const DELETE_LOGO = gql`
  mutation removeLogo($id: String!) {
    removeLogo(id:$id) {
      _id
    }
  }
`;

class ViewLogoScreen extends Component {

    render() {
        
        return (
            <Query pollInterval={50} query={GET_LOGO} variables={{ logoId: this.props.match.params.id }}>
                {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;
                    return (
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
                                    <div className="panel-body" style={{WebkitBoxShadow: "0 2px 2px 0 rgba(0,0,0,0.14),0 3px 1px -2px rgba(0,0,0,0.12),0 1px 5px 0 rgba(0,0,0,0.2)", width:"33.3333%", marginTop: "0.5rem", borderRadius: "5px", backgroundColor: "white", paddingLeft: "0.75rem", paddingRight: "0.75rem", display: "inline-table"}}>
                                            <div className="panel-title" style={{textAlign: "center", backgroundColor: "#546e7a", color: "white", marginTop: "0.5rem", marginBottom: "1rem", borderRadius: "5px"}}>
                                                <div style={{paddingTop: "0.5rem", paddingBottom: "0.5rem", fontSize: "30pt"}}>
                                                    View Logo
                                                </div>
                                            </div>
                                            <div style={{backgroundColor: "#546e7a", color:"white", paddingLeft: "20px"}}> 
                                                <div className="row" style={{paddingTop: "20px"}}>
                                                    <div className="form-group">
                                                        <div className="col s4" >Text:</div>
                                                        <div className="col s8" style={{display: "inline-grid"}}>
                                                        <pre style={{color:"white"}}>
                                                        {data.logo.text}
                                                        </pre>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="form-group">
                                                        <div className="col s4">Color:</div>
                                                        <div className="col s8" style={{alignItems: "right"}}>
                                                        {data.logo.color}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="form-group">
                                                        <div className="col s4">Background Color:</div>
                                                        <div className="col s8">
                                                        {data.logo.backgroundColor}
                                                        </div>
                                                    </div>
                                                </div>   
                                                <div className="row">
                                                    <div className="form-group">
                                                        <div className="col s4">Border Color:</div>
                                                        <div className="col s8">
                                                        {data.logo.borderColor}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="form-group">
                                                        <div className="col s4">Font Size:</div>
                                                        <div className="col s8">
                                                        {data.logo.fontSize}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="form-group">
                                                        <div className="col s4">Border Radius:</div>
                                                        <div className="col s8">
                                                        {data.logo.borderRadius}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="form-group">
                                                        <div className="col s4">Border Width:</div>
                                                        <div className="col s8">
                                                        {data.logo.borderWidth}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="form-group">
                                                        <div className="col s4">Padding:</div>
                                                        <div className="col s8">
                                                        {data.logo.padding}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="form-group">
                                                        <div className="col s4">Margin:</div>
                                                        <div className="col s8">
                                                        {data.logo.margin}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="form-group">
                                                        <div className="col s4">Last Update:</div>
                                                        <div className="col s8">
                                                            {data.logo.lastUpdate}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <Mutation mutation={DELETE_LOGO} key={data.logo._id} onCompleted={() => this.props.history.push('/')}>
                                        {(removeLogo, { loading, error }) => (
                                            <div style={{marginBottom:"1.5rem", textAlign:"center"}}>
                                                <form 
                                                    onSubmit={e => {
                                                        e.preventDefault();
                                                        removeLogo({ variables: { id: data.logo._id } });
                                                    }}>
                                                    <Link to={`/edit/${data.logo._id}`} className="btn btn-success">Edit</Link>&nbsp;
                                                <button type="submit" className="btn btn-danger">Delete</button>
                                                </form>
                                                {loading && <p>Loading...</p>}
                                                {error && <p>Error :( Please try again</p>}
                                            </div>
                                        )}
                                    </Mutation>
                                        {loading && <p>Loading...</p>}
                                        {error && <p>Error :( Please try again</p>}
                                    </div>
                                    <div className="col s8" style={{width:"66.66666%", marginTop: "0.5rem", marginLeft: "0.5rem"}}> 
                                <div>
                                    <pre className="logo" style={{text: data.logo.text, color: data.logo.color, fontSize: data.logo.fontSize,
                                background: data.logo.backgroundColor,
                                borderColor: data.logo.borderColor,
                                borderRadius: data.logo.borderRadius,
                                borderWidth: data.logo.borderWidth,
                                padding: data.logo.padding, margin: data.logo.margin, borderStyle: "solid"}}>
                                        {data.logo.text}
                                    </pre>
                                </div>
                            </div>
                                    </div>
                                </div>
                            </div>
                    );
                }}
            </Query>
        );
    }
}

export default ViewLogoScreen;