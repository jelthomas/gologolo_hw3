import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const GET_LOGOS = gql`
  {
    logos {
      _id
      text
      lastUpdate
    }
  }
`;

class HomeScreen extends Component {

    render() {
        return (
            <Query pollInterval={50} query={GET_LOGOS}>
                {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;
                    data.logos.sort((a, b) => (b.lastUpdate > a.lastUpdate)? 1:-1);
                    for(let i=0; i < data.logos.length; i++){
                        if(data.logos[i].text.length >= 30){
                            data.logos[i].text = data.logos[i].text.substring(0, 30) + " ...";
                        }
                    }
                    return (
                        <div className="container row">
                            <div className="col s4">
                                <h3>Recent Work</h3>
                                <div className="pre">
                                {data.logos.map((logo, index) => (
                                    <div key={index} className='home_logo_link'
                                        style={{ cursor: "pointer" }}>
                                        <Link to={`/view/${logo._id}`}>{logo.text}</Link>
                                    </div>
                                ))}
                                </div>
                            </div>
                            <div className="col s8">
                                <div id="home_banner_container">
                                    Logo Maker
                                </div>
                                <div>
                                    <button className="createNew" style={{ cursor: "pointer" }}>
                                        <Link id="add_logo_button" to="/create">Create a New Logo</Link>
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                }
                }
            </Query >
        );
    }
}

export default HomeScreen;
