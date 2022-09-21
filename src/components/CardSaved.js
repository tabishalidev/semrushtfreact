import React, { Component } from "react";
import "../Pages/styles.css";

import Button from "@semcore/ui/button";
import Card from "@semcore/ui/card";
import Tooltip from "@semcore/ui/tooltip";
import { Col } from '@semcore/ui/grid';
import { Row } from '@semcore/ui/grid';
import {Link} from "react-router-dom";
import FeaturePopover from '@semcore/ui/feature-popover';
import ShareM from "../icons/sharem.svg";
import BookmarkM from "../icons/bookmark_m.svg";
import FavoriteL from "../icons/favoritel.svg";
import FavoriteFilledL from "../icons/favorite_filledl.svg";
import FacebookM from '../icons/facebook_m.svg';

import TwitterM from '../icons/twitter_m.svg';
import LinkedInM from '../icons/linkedin_m.svg';
import MailFilledM from '../icons/mailfilled_m.svg';
import LinkM from '../icons/link_m.svg';
import BufferM from '../icons/icons8-buffer-16.png';
import BookmarkFilledM from "../icons/bookmarkfilled.svg";

const axios = require('axios').default;

export default class CardSaved extends Component {

  
  state = {
    favoriteIcon: <img src={FavoriteFilledL} id="ffl" alt="favorite_l" />,
    addFeedText: 'Add to My Feeds',
    favoriteIcon2: <img src={FavoriteL} alt="favorite_l" />,
    saveButtonText: 'Save',
    savedButtonText: 'Saved',
    saveBookmark: <img src={BookmarkM} alt="bookmark_m" />,
    savedBookmark: <img src={BookmarkFilledM} alt="bookmarkfilled_m" />,
    savedTrends: [],

  }

  constructor(){
    super()
  
    
    axios.post('http://trendspottr/semrush/trendfeed.php', null, {
    params: {
        action: 'getSavedArticles',
        jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiI1YTFjNjIwMC1hMGQxLTExZWEtOWUwZC0xYjFkMzgwYTg1MmIiLCJ2aWV3ZXJfaWQiOiIyMzZiYTExZGZhYmY0OTEwOTI3OC05OWE1ODQyIn0.iVXWKZartgppNRsNKkvhm6ARIOWttXRvTuTyHVIIUEc',
      }})
  
  .then(res => {
    this.setState({
      savedTrends: res.data.articles
    })
    })
    .catch(function (error) {
      console.log(error);
    });

    
  }

  
  searchOrFeed() {
    if (this.props.articles.some(o => 'feed_group' in o)){
      return <h4 class="tc">Search Results</h4>
    }
    else {
      return <h4 class="tc">Trending Content</h4>
    }
  }

  searchOrTitle(){
    if (this.props.articles.some(o => 'feed_group' in o)){
      return <span class="sectiontitle">
                {this.props.searchTerm}
              </span>
    }
    else {
      return <span class="sectiontitle">
              {this.props.feedTitle}: {this.props.feedSubtitle}
            </span> 
    }

  }

  addToFavoriteFeed(){
      axios.post('http://trendspottr/semrush/trendfeed.php', null, {
          params: {
              action: 'addToMyFeeds',
              feed_id: this.props.feedID,
              jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiI1YTFjNjIwMC1hMGQxLTExZWEtOWUwZC0xYjFkMzgwYTg1MmIiLCJ2aWV3ZXJfaWQiOiIyMzZiYTExZGZhYmY0OTEwOTI3OC05OWE1ODQyIn0.iVXWKZartgppNRsNKkvhm6ARIOWttXRvTuTyHVIIUEc',
            }})
        
        .then(res => {
          })
          .catch(function (error) {
            console.log(error);
          });

  }

  removefromFavoriteFeed(){
        axios.post('http://trendspottr/semrush/trendfeed.php', null, {
          params: {
              action: 'removeFromMyFeeds',
              feed_id: this.props.feedID,
              jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiI1YTFjNjIwMC1hMGQxLTExZWEtOWUwZC0xYjFkMzgwYTg1MmIiLCJ2aWV3ZXJfaWQiOiIyMzZiYTExZGZhYmY0OTEwOTI3OC05OWE1ODQyIn0.iVXWKZartgppNRsNKkvhm6ARIOWttXRvTuTyHVIIUEc',
            }})
        
        .then(res => {
          })
        .catch(function (error) {
            console.log(error);
          });    
  }

  addtoSavedTrends(trend_id){
    console.log(trend_id)
    axios.post('http://trendspottr/semrush/trendfeed.php', null, {
      params: {
          action: 'saveTrend',
          id: trend_id,
          jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiI1YTFjNjIwMC1hMGQxLTExZWEtOWUwZC0xYjFkMzgwYTg1MmIiLCJ2aWV3ZXJfaWQiOiIyMzZiYTExZGZhYmY0OTEwOTI3OC05OWE1ODQyIn0.iVXWKZartgppNRsNKkvhm6ARIOWttXRvTuTyHVIIUEc',
        }})
    
    .then(res => {
      console.log(res.data)
      })
      .catch(function (error) {
        console.log(error);
      });

  }

  removefromSavedTrends(trend_id){
    axios.post('http://trendspottr/semrush/trendfeed.php', null, {
      params: {
          action: 'deleteSavedTrend',
          saved_item_id: trend_id,
          jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiI1YTFjNjIwMC1hMGQxLTExZWEtOWUwZC0xYjFkMzgwYTg1MmIiLCJ2aWV3ZXJfaWQiOiIyMzZiYTExZGZhYmY0OTEwOTI3OC05OWE1ODQyIn0.iVXWKZartgppNRsNKkvhm6ARIOWttXRvTuTyHVIIUEc',
        }})
    
    .then(res => {
      
      })
      .catch(function (error) {
        console.log(error);
      });


      axios.post('http://trendspottr/semrush/trendfeed.php', null, {
        params: {
            action: 'getSavedArticles',
            jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiI1YTFjNjIwMC1hMGQxLTExZWEtOWUwZC0xYjFkMzgwYTg1MmIiLCJ2aWV3ZXJfaWQiOiIyMzZiYTExZGZhYmY0OTEwOTI3OC05OWE1ODQyIn0.iVXWKZartgppNRsNKkvhm6ARIOWttXRvTuTyHVIIUEc',
          }})
      
      .then(res => {
        
        
        })
        .catch(function (error) {
          console.log(error);
        });

  }

  setFavIcon(){
    if (this.props.myFeeds.includes(this.props.feedSubtitle)){
      return <Tooltip id="tt" title={"Remove from Favorite Feeds"} onClick={() => this.setState({favoriteIcon: <img src={FavoriteL} alt="favorite_l" />, addFeedText: 'Remove from Favorite Feeds'}, this.removefromFavoriteFeed())}>
                  {this.state.favoriteIcon}
              </Tooltip> 
    }
    else {
      return <Tooltip id="tt" title={this.state.addFeedText} onClick={() => this.setState({favoriteIcon2: <img src={FavoriteFilledL} id="ffl" alt="favorite_l" />}, this.addToFavoriteFeed())}>
                  {this.state.favoriteIcon2}
              </Tooltip> 
    }
  }

  setSaveButton(trend_id){
    for (const [, value] of Object.entries(this.state.savedTrends)) {
      
      if (value.id === trend_id){
    
        return  <Button size="m" theme={undefined} use="secondary" onClick={() => (this.setState({ savedButtonText: 'Save', savedBookmark: <img src={BookmarkM} alt="bookmark_m" />}) (this.removefromSavedTrends(value.saved_item_id)))}>
                        <Button.Addon id="sbm">
                        {this.state.savedBookmark}
                        </Button.Addon>
                        {this.state.savedButtonText}
                    </Button>
      }

    }
   

      return  <Button size="m" theme={undefined} use="secondary" onClick={() => (this.setState({ saveButtonText: 'Saved', saveBookmark: <img src={BookmarkFilledM} alt="bookmarkfilled_m" />}) (this.addtoSavedTrends(trend_id)))}>
                      <Button.Addon id="sbm">
                      {this.state.saveBookmark}
                      </Button.Addon>
                      {this.state.saveButtonText}
                  </Button>

    }
     
   
    
  


    render(){

      function getColor(str){
        if (str === "Elevated"){
          return <span class="gCard">Elevated</span>
        }
        else if (str === "Extreme"){
          return <span class="rCard">Extreme</span>
        }
        else {
          return <span class="yCard">High</span>
        } 
      }

    
      return (
        <>
        <Row>
          {this.props.articles.map((x, i) =>
            <Col key={i} md={4}>
                <div id ="cards">
                    <Card mt={7} mr={3} wMin="200px" hMin="485px">
                      <Card.Header>
                          <Link to={this.props.articles[i].link}>
                              <img id="cde" alt="article_thumbnail" src= {this.props.articles[i].thumbnail_url} width="266" height="150" />
                          </Link>

                        <Card.Title>
                              <Link to={this.props.articles[i].link} style={{ textDecoration: 'none', color: "black" }}>
                                <div id="title">{this.props.articles[i].title}</div>
                              </Link> 
                        </Card.Title>

                        <Card.Description>
                            {this.props.articles[i].author_name}
                        </Card.Description>
                        <Card.Description>
                            {this.props.articles[i].pub_date.substring(0,10)}
                        </Card.Description>
                        <Card.Description>
                            Trending Level: {getColor(this.props.articles[i].trending_level)}
                        </Card.Description>
                      </Card.Header>
                      <Card.Body mt={-5}>
                        <div id="description">{this.props.articles[i].description}</div>

                        <div id="fd">Topic: {this.props.articles[i].feed_group}</div>

                        <div id="fd">Feed: {this.props.articles[i].feed_name}</div>

                        <div id="save">
                            {this.setSaveButton(this.props.articles[i].id)}
                        </div>

                        <div id="share">
                        <FeaturePopover
                            onVisibleChange={function Ve(){}}
                            placement = 'auto-end'
                            // 'auto-start' | 'auto' | 'auto-end' | 'top-start' | 'top' | 'top-end' | 'right-start' | 'right' | 'right-end' | 'bottom-end' | 'bottom' | 'bottom-start' | 'left-end' | 'left' | 'left-start'
                           
                          >
                            <FeaturePopover.Trigger>
                                <Button size="m" theme={undefined} use="secondary" >
                                  <Button.Addon>
                                  <img src={ShareM} alt="share" />
                                  </Button.Addon>
                                  <Button.Text>Share
                                  </Button.Text>
                                </Button>
                            </FeaturePopover.Trigger>
                          
                              <FeaturePopover.Popper 
                                id="sharebox"
                                closeIcon
                              
                                wMin={200}
                              >
                                <img src={FacebookM} id="favicon" onClick={() => {this.facebookShare(this.state.articles[i].link)}} alt="facebook_m" />
                                <img src={TwitterM} id="favicon" onClick={() => {this.twitterShare(this.state.articles[i].link)}} alt="twitter_m" />
                                <img src={LinkedInM} id="favicon" onClick={() => {this.linkedinShare(this.state.articles[i].link, this.state.articles[i].title, this.state.articles[i].description)}} alt="linkedin_m" />
                                <img src={MailFilledM} id="favicon" onClick={() => {this.mailShare(this.state.articles[i].link, this.state.articles[i].title)}} alt="mailfilled_m" />
                                <img id="favicon" src={BufferM} alt="buffer_icon" onClick={() => {this.bufferShare(this.state.articles[i].link, this.state.articles[i].title)}}/>
                                <img src={LinkM} id="favicon" onClick={() => {this.urlShare(this.state.articles[i].link)}} alt="link_m" />
                                
                               
                              </FeaturePopover.Popper>
                   
                          </FeaturePopover>
                        </div>
                      </Card.Body>
                    </Card>
                
                  </div>
              </Col>
            
            )}
          </Row>

    </>);}
}
