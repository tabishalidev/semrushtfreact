import "./styles.css";
import { useNavigate } from "react-router-dom";
import React, { Component } from 'react';
import Accordion from "@semcore/ui/accordion";
import { Text } from "@semcore/ui/typography";
import { Flex, Box } from "@semcore/ui/flex-box";

import Input from "@semcore/ui/input";
import Button from "@semcore/ui/button";
import InfiniteScroll from "react-infinite-scroll-component";
import Card from "@semcore/ui/card";

import Tooltip from "@semcore/ui/tooltip";
import { Col } from '@semcore/ui/grid';
import { Row } from '@semcore/ui/grid';
import {Link} from "react-router-dom";

import SearchM from "../icons/searchm.svg";
import FeaturePopover from '@semcore/ui/feature-popover';
import ShareM from "../icons/sharem.svg";
import FavoriteM from "../icons/favoritem.svg";
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


export default class Home extends Component {

  state = {
    feedList: [],
    feedTitles: [],
    feedSubTitles: [],
    articles: [],
    feedTitle: '',
    feedSubtitle: '',
    searchTerm: '',
    myFeeds: [],
    feedID: 2530,
    savedTrends: [],

    favoriteIcon: <img src={FavoriteFilledL} id="ffl" alt="favorite_l" />,
    addFeedText: 'Add to My Feeds',
    favoriteIcon2: <img src={FavoriteL} alt="favorite_l" />,
    saveButtonText: 'Save',
    savedButtonText: 'Saved',
    saveBookmark: <img src={BookmarkM} alt="bookmark_m" />,
    savedBookmark: <img  src={BookmarkFilledM} alt="bookmark_filled" />,
    lastCardID: 0,
    items: Array.from({ length: 20 }),
    hasMore: true
  }


  changeState = (subtitle) => {
    
    for (const [key, value] of Object.entries(this.state.feedList)){
      for (const [, smallValue] of Object.entries(value)){
        if (smallValue.feed_name === subtitle){
          axios.post('http://trendspottr/semrush/trendfeed.php', null, {
            params: {
                action: 'getRecentArticles',
                feed_id: smallValue.feed_id,
                jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiI1YTFjNjIwMC1hMGQxLTExZWEtOWUwZC0xYjFkMzgwYTg1MmIiLCJ2aWV3ZXJfaWQiOiIyMzZiYTExZGZhYmY0OTEwOTI3OC05OWE1ODQyIn0.iVXWKZartgppNRsNKkvhm6ARIOWttXRvTuTyHVIIUEc',
              }})
          
          .then(res => {
            console.log(res.data.articles)
            this.setState({
              feedID: smallValue.feed_id,
              articles: res.data.articles,
              feedTitle: key,
              feedSubtitle: smallValue.feed_name,
              lastCardID: res.data.articles[res.data.articles.length-1].id
              
            })
            })

            .catch(function (error) {
              console.log(error);
            });

          }
        }
      }  
  }

  axiosSearch = () => {
    axios.post('/semrush/trendfeed.php', null, {
    params: {
        action: 'searchArticles',
        query_string: this.state.searchTerm,
        jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiI1YTFjNjIwMC1hMGQxLTExZWEtOWUwZC0xYjFkMzgwYTg1MmIiLCJ2aWV3ZXJfaWQiOiIyMzZiYTExZGZhYmY0OTEwOTI3OC05OWE1ODQyIn0.iVXWKZartgppNRsNKkvhm6ARIOWttXRvTuTyHVIIUEc',
        }})
    
    .then(res => {
        this.setState({
            articles: res.data.articles
        })
    })

    .catch(function (error) {
        console.log(error);
    });
}

  constructor(){
    super();
   
    
    axios.post('http://trendspottr/semrush/trendfeed.php', null, {
    params: {
        action: 'getMyFeeds',
        jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiI1YTFjNjIwMC1hMGQxLTExZWEtOWUwZC0xYjFkMzgwYTg1MmIiLCJ2aWV3ZXJfaWQiOiIyMzZiYTExZGZhYmY0OTEwOTI3OC05OWE1ODQyIn0.iVXWKZartgppNRsNKkvhm6ARIOWttXRvTuTyHVIIUEc',
      }})
  
      .then(res => {
        const subtitles = []
        for (const [, value] of Object.entries(res.data.myFeeds)) {
          subtitles.push(value.feed_name);
        }
        this.setState({
          myFeeds: subtitles
        })
        })

    .catch(function (error) {
      console.log(error);
    });



    axios.post('http://trendspottr/semrush/trendfeed.php', null, {
        params: {
            action: 'getRecentArticles',
            feed_id: 2530,
            jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiI1YTFjNjIwMC1hMGQxLTExZWEtOWUwZC0xYjFkMzgwYTg1MmIiLCJ2aWV3ZXJfaWQiOiIyMzZiYTExZGZhYmY0OTEwOTI3OC05OWE1ODQyIn0.iVXWKZartgppNRsNKkvhm6ARIOWttXRvTuTyHVIIUEc',
          }})
      
      .then(res => {
        this.setState({
          articles: res.data.articles,
          lastCardID: res.data.articles[res.data.articles.length-1].id
        })
        
        })

        .catch(function (error) {
          console.log(error);
        });

         
    axios.post('http://trendspottr/semrush/trendfeed.php', null, {
      params: {
      action: 'getFeedList', 
      jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiI1YTFjNjIwMC1hMGQxLTExZWEtOWUwZC0xYjFkMzgwYTg1MmIiLCJ2aWV3ZXJfaWQiOiIyMzZiYTExZGZhYmY0OTEwOTI3OC05OWE1ODQyIn0.iVXWKZartgppNRsNKkvhm6ARIOWttXRvTuTyHVIIUEc',
    }})
  
    .then(res => {
      const titles = []
      const subtitles = []

      for (const [key, value] of Object.entries(res.data.feedList)) {
        titles.push(key)
        subtitles.push(value.map(({ feed_name }) => feed_name));
        for (const [, smallValue] of Object.entries(value)){

          if (smallValue.feed_id === '2530'){
            this.setState({
              feedTitle: key,
              feedSubtitle: smallValue.feed_name
            })

          }
        }
      }

      this.setState({
        feedList: res.data.feedList,
        feedTitles: titles,
        feedSubTitles: subtitles,
      })  
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
        this.setState({
          savedTrends: res.data.articles
        })
        
        
        })

        .catch(function (error) {
          console.log(error);
        });


  } 
  
  favoriteFeed(){
    if (this.state.myFeeds.length >= 1){
      return this.state.myFeeds.map((title, index) => (
              <Flex>
                <Accordion.Item.Collapse>
                    <Button id="subTitles" mr={2} p="5px 43px" onClick={()=> this.changeState(title)}>
                        {
                          <Text size={100} color="gray-800">{`${title}`}</Text>
                        }
                    </Button>
                  </Accordion.Item.Collapse> </Flex>))}

    else {
       return <Accordion.Item.Collapse>
          <Box p="5px 43px">
            {
              <>
                <Text size={100} color="gray-800">{`Click `}</Text>
                <img  src={FavoriteM} alt="favorite" />
                <Text
                  size={100}
                  color="gray-800"
                >{` to add your favorite feeds`}</Text>
              </>
            }
          </Box>
    </Accordion.Item.Collapse> 
    }}

  favoriteFeedCounter(){
    if (this.state.myFeeds.length >= 1){
      return <Accordion.Item.Toggle
                  className="accordion-selected-toggle"
                  p="8px 12px"
                >
                  <Flex alignItems="center">
                    <Accordion.Item.Chevron color="gray-300" mr={4} />
                    <Text color="gray-800">{`Favorite Feeds`}</Text> 
                    <div id='favcounter'>{this.state.myFeeds.length}</div>
                  </Flex>
                </Accordion.Item.Toggle>
      }
        else {
          return <Accordion.Item.Toggle
                    className="accordion-selected-toggle"
                    p="8px 12px"
                  >
                  <Flex alignItems="center">
                    <Accordion.Item.Chevron color="gray-300" mr={4} />
                    <Text color="gray-800">{`Favorite Feeds`}</Text>
                  </Flex>
                </Accordion.Item.Toggle>

        }
  }

  savedTrendsCounter(){
    const SavedTrendNavigatewCounter = () => {
      const navigate = useNavigate()
      return  <Accordion.Item.Toggle
                  className="accordion-selected-toggle"
                  p="8px 12px"
                  onClick={() => {navigate("/savedtrends")}}
                  >
                  <Flex alignItems="center">
                  <img  src={BookmarkFilledM} alt="bookmark_filled" />
                  <Text p="0px 15px" color="gray-800">{`Saved Trends`}</Text>
                  <div id='trendcounter'>{this.state.savedTrends.length}</div>
                  </Flex>
              </Accordion.Item.Toggle>
      }

      const SavedTrendNavigate = () => {
        const navigate = useNavigate()
        return  <Accordion.Item.Toggle
                    className="accordion-selected-toggle"
                    p="8px 12px"
                    onClick={() => {navigate("/savedtrends")}}
                    >
                    <Flex alignItems="center">
                    <img  src={BookmarkFilledM} alt="bookmark_filled" />
                    <Text p="0px 15px" color="gray-800">{`Saved Trends`}</Text>
                    </Flex>
                </Accordion.Item.Toggle>
        }
    
        if (this.state.savedTrends.length >= 1){
          return <SavedTrendNavigatewCounter></SavedTrendNavigatewCounter>
          }
        else {
          return <SavedTrendNavigate></SavedTrendNavigate>
        }
  }

   

  
  searchOrFeed() {
    if (this.state.articles.some(o => 'feed_group' in o)){
      return <h4 class="tc">Search Results</h4>
    }
    else {
      return <h4 class="tc">Trending Content</h4>
    }
  }

  searchOrTitle(){
    if (this.state.articles.some(o => 'feed_group' in o)){
      return <span class="sectiontitle">
                {this.state.searchTerm}
              </span>
    }
    else {
      return <span class="sectiontitle">
              {this.state.feedTitle}: {this.state.feedSubtitle}
            </span> 
    }

  }

  addToFavoriteFeed(){
      axios.post('http://trendspottr/semrush/trendfeed.php', null, {
          params: {
              action: 'addToMyFeeds',
              feed_id: this.state.feedID,
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
              feed_id: this.state.feedID,
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
    if (this.state.myFeeds.includes(this.state.feedSubtitle)){
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
   

      return  <Button size="m" theme={undefined} use="secondary" onClick={() => (this.setState({ saveButtonText: 'Saved', saveBookmark: <img  src={BookmarkFilledM} alt="bookmark_filled" />}) (this.addtoSavedTrends(trend_id)))}>
                      <Button.Addon id="sbm">
                      {this.state.saveBookmark}
                      </Button.Addon>
                      {this.state.saveButtonText}
                  </Button>

    }

  
  facebookShare(shareLink){
    var url = 'https://facebook.com/sharer.php?u=' + shareLink;
    return window.open(url, "Popup", "toolbar=no, location=no, statusbar=no, menubar=no, scrollbars=1, resizable=0, width=580, height=600, top=30")
  }

  twitterShare(shareLink, shareTitle){
    var url = 'https://twitter.com/intent/tweet?url=' + shareLink + '&text=' + shareTitle + '&via=trendspottr';
    return window.open(url, "Popup", "toolbar=no, location=no, statusbar=no, menubar=no, scrollbars=1, resizable=0, width=580, height=600, top=30")
  }

  linkedinShare(shareLink, shareTitle, shareDescription){
    var url = 'https://www.linkedin.com/shareArticle?&mini=true&source=Trendspottr&url=' + shareLink + '&title=' + shareTitle + '&summary=' + shareDescription;
    return window.open(url, "Popup", "toolbar=no, location=no, statusbar=no, menubar=no, scrollbars=1, resizable=0, width=580, height=600, top=30")
  }

  bufferShare(shareLink, shareTitle){

    var url = 'https://bufferapp.com/add?text=' + shareTitle + '&url=' + shareLink
    return window.open(url, "Popup", "toolbar=no, location=no, statusbar=no, menubar=no, scrollbars=1, resizable=0, width=580, height=600, top=30")
  }

  
  mailShare(shareLink, shareTitle){
   
    var url = 'mailto:?subject='+ shareTitle +'&body=Now Trending:%20' + shareLink;
    return window.open(url)
  }

  urlShare(shareLink){
    navigator.clipboard.writeText(shareLink);
    alert('The link to this article has been copied.');
  }


  

  fetchMoreData = () => {
    if (this.state.articles.length >= 500) {
      this.setState({ hasMore: false });
      return;
    }
    // a fake async api call like which sends
    // 20 more records in .5 secs
    setTimeout(() => {

      axios.post('http://trendspottr/semrush/trendfeed.php', null, {
      params: {
          action: 'getMoreArticles',
          feed_id: this.state.feedID,
          paging_cursor: this.state.lastCardID,
          jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiI1YTFjNjIwMC1hMGQxLTExZWEtOWUwZC0xYjFkMzgwYTg1MmIiLCJ2aWV3ZXJfaWQiOiIyMzZiYTExZGZhYmY0OTEwOTI3OC05OWE1ODQyIn0.iVXWKZartgppNRsNKkvhm6ARIOWttXRvTuTyHVIIUEc',
        }})
    
      .then(res => {
        
        this.setState({
          articles: this.state.articles.concat(res.data.articles),
          lastCardID: res.data.articles[res.data.articles.length-1].id
        })

        console.log(this.state.articles)
        
        
        
        })

        .catch(function (error) {
          console.log(error);
        });

    }, 500);
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

    <body id="trendfeed">
        <h2 class="titles">Trends</h2>
        <div id="sidebar">
          <Accordion>
            <Accordion.Item>
                  {this.favoriteFeedCounter()}
                  {this.favoriteFeed()}
            </Accordion.Item>
          </Accordion>

          <Accordion>
            <Accordion.Item>
              {this.savedTrendsCounter()}
            </Accordion.Item>
          </Accordion>

          <hr></hr>

          <Accordion>
            {this.state.feedTitles.map((title, index) => (
              <Accordion.Item value={title}>
                <Accordion.Item.Toggle
                  className="accordion-selected-toggle"
                  p="8px 12px"
                >
                  <Flex alignItems="center">
                    <Accordion.Item.Chevron color="gray-300" mr={4} />
                    <Text color="gray-800">{`${title}`}</Text>
                  </Flex>
                </Accordion.Item.Toggle>

                {this.state.feedSubTitles[index].map((subtitle) => (
                  <Flex>
                    <Accordion.Item.Collapse>
                      <Button id="subTitles" p="5px 43px" onClick={()=> this.changeState(subtitle)}>
                        {
                          <Text size={100} color="gray-800">{`${subtitle}`}</Text>
                        }
                      </Button>
                    </Accordion.Item.Collapse>
                  </Flex>
                    
                ))} 
              </Accordion.Item>
            ))}
          </Accordion>

          <div id="level">
            <p>
              Trending Level: <span class="g">Elevated</span>
            </p>
            <p>
              Trending Level: <span class="y">High</span>
            </p>
            <p>
              Trending Level: <span class="r">Extreme</span>
            </p>
          </div>
        </div>

        <div id="topbar">
                <div id="searchbar">
                    <Input size="l" state="normal">
                    <Input.Addon>
                        <img src={SearchM} alt="search" />
                    </Input.Addon>
                    <Input.Value placeholder="Search by Keyword" value={this.state.searchTerm} onChange={(v) => this.setState({searchTerm: v})} />
                    </Input>
                </div>

                <div id="searchbutton">
                    <Button size="l" use="primary" onClick={this.axiosSearch}>
                        Search
                    </Button>
                </div>
          </div>
        
        <div id="content">
          {/* <CardFull articles={this.state.articles} feedTitle={this.state.feedTitle} feedSubtitle={this.state.feedSubtitle} searchTerm={this.state.searchTerm} feedID={this.state.feedID} myFeeds={this.state.myFeeds}></CardFull> */}
          
                    <div id="titlecontent">
                      {this.searchOrFeed()}

                      {this.setFavIcon()}
                      {this.searchOrTitle()}         
                    </div>

                    <InfiniteScroll
                        dataLength={this.state.articles.length}
                        next={this.fetchMoreData}
                        hasMore={this.state.hasMore}
                        loader={<h4 style= {{ textAlign: "center" }}>Loading more feeds...</h4>}
                    
                      >
                      <Row>
                      {this.state.articles.map((x, i) => (
                      
                        <Col key={i} md={4}>
                          
                            <div id ="cards">
                                <Card mt={7} mr={3} wMin="200px" hMin="485px">
                                  <Card.Header>
                                      <Link to={this.state.articles[i].link}>
                                          <img id="cde" alt="article_thumbnail" src= {this.state.articles[i].thumbnail_url} width="266" height="150" />
              
                                          
                                      </Link>

                                    <Card.Title>
                                          <Link to={this.state.articles[i].link} style={{ textDecoration: 'none', color: "black" }}>
                                            <div id="title">{this.state.articles[i].title}</div>
                                          </Link> 
                                    </Card.Title>

                                    <Card.Description>
                                        {this.state.articles[i].author_name}
                                    </Card.Description>
                                    <Card.Description>
                                        {this.state.articles[i].pub_date.substring(0,10)}
                                    </Card.Description>
                                    <Card.Description>
                                        Trending Level: {getColor(this.state.articles[i].trending_level)}
                                    </Card.Description>
                                  </Card.Header>
                                  <Card.Body mt={-5}>
                                    <div id="description">{this.state.articles[i].description}</div>
                                    <div id="save">
                                        {this.setSaveButton(this.state.articles[i].id)}
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
                        ))}
                      </Row>
               </InfiniteScroll> 
    
        </div>

        {/* eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiI1YTFjNjIwMC1hMGQxLTExZWEtOWUwZC0xYjFkMzgwYTg1MmIiLCJ2aWV3ZXJfaWQiOiIyMzZiYTExZGZhYmY0OTEwOTI3OC05OWE1ODQyIn0.iVXWKZartgppNRsNKkvhm6ARIOWttXRvTuTyHVIIUEc */}
      </body>
    </>

    )}
}

