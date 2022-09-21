import React, { Component } from 'react'
import "./styles.css";
import Accordion from "@semcore/ui/accordion";
import { Text } from "@semcore/ui/typography";
import { Flex, Box } from "@semcore/ui/flex-box";
import { useNavigate } from "react-router-dom";

import FavoriteM from "../icons/facebook_m.svg";
import BookmarkFilledM from "../icons/bookmarkfilled.svg";
import DropdownMenu from "@semcore/ui/dropdown-menu";
import { ButtonTrigger } from "@semcore/ui/base-trigger";
import Button from "@semcore/ui/button";
import icon from '../icons/iconclipboard.png'


import CardSaved from '../components/CardSaved';
const axios = require('axios').default;

export default class SavedTrends extends Component {

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
    savedTrendCategories: [],
    savedTrendArticles: [],
    trendCategory: 'All Trends'
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
            this.setState({
              feedID: smallValue.feed_id,
              articles: res.data.articles,
              feedTitle: key,
              feedSubtitle: smallValue.feed_name
            })
            })

            .catch(function (error) {
              console.log(error);
            });

          }
        }
      }  
  }


  changeTrendCategory = (subtitle) => {
  
    const changedTrend = []
    for (const [, value] of Object.entries(this.state.articles)){
    
      if (value.feed_name === subtitle){
        changedTrend.push(value)
      }
   
    }
    this.setState({
      articles: changedTrend
    })
    
    
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
            action: 'getSavedArticles',
            jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiI1YTFjNjIwMC1hMGQxLTExZWEtOWUwZC0xYjFkMzgwYTg1MmIiLCJ2aWV3ZXJfaWQiOiIyMzZiYTExZGZhYmY0OTEwOTI3OC05OWE1ODQyIn0.iVXWKZartgppNRsNKkvhm6ARIOWttXRvTuTyHVIIUEc',
          }})
      
      .then(res => {
        this.setState({
          articles: res.data.articles,
          
          savedTrendCategories: res.data.categories
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

          if (smallValue.feed_id === 2530){
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



  } 

  favoriteFeed(){
    if (this.state.myFeeds.length >= 1){
      return this.state.myFeeds.map((title) => (
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
    const HomeNavigatewCounter = () => {
      const navigate = useNavigate()
      return  <Accordion.Item.Toggle
                  className="accordion-selected-toggle"
                  p="8px 12px"
                  onClick={() => {navigate("/")}}
                  >
                  <Flex alignItems="center">
                  <img src={BookmarkFilledM} alt="bookmarkfilled_m" />
                  <Text p="0px 15px" color="gray-800">{`Saved Trends`}</Text>
                  <div id='trendcounter'>{this.state.articles.length}</div>
                  </Flex>
              </Accordion.Item.Toggle>
      }

      const HomeNavigate = () => {
        const navigate = useNavigate()
        return  <Accordion.Item.Toggle
                    className="accordion-selected-toggle"
                    p="8px 12px"
                    onClick={() => {navigate("/")}}
                    >
                    <Flex alignItems="center">
                    <img src={BookmarkFilledM} alt="bookmarkfilled_m" />
                    <Text p="0px 15px" color="gray-800">{`Saved Trends`}</Text>
                    </Flex>
                </Accordion.Item.Toggle>
        }
    
        if (this.state.articles.length >= 1){
          return <HomeNavigatewCounter></HomeNavigatewCounter>
          }
        else {
          return <HomeNavigate></HomeNavigate>
        }
  }


  emptySavedTrends(){
    if (this.state.articles.length > 0){
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
                          
                  <div id="savetrendbar">
                    <h4>Saved Trends</h4>
                    <div id="dropbar">
                      <DropdownMenu>
                        <DropdownMenu.Trigger m={4}>
                          <ButtonTrigger w={503}>{this.state.trendCategory}</ButtonTrigger>
                        </DropdownMenu.Trigger>
                        <DropdownMenu.Menu >
                        {this.state.savedTrendCategories.map((title) => (
                            <DropdownMenu.Item onClick={()=> (this.changeTrendCategory(title.feed_name) (this.setState({trendCategory: title.feed_name})))}>{title.feed_name}</DropdownMenu.Item>
                        ))}
                        </DropdownMenu.Menu>
                      </DropdownMenu>
                    </div>
                  </div>
              
                  <div id="content">
                  <CardSaved articles={this.state.articles} 
                            feedTitle={this.state.feedTitle} 
                            feedSubtitle={this.state.feedSubtitle} 
                            searchTerm={this.state.searchTerm} 
                            feedID={this.state.feedID} 
                            myFeeds={this.state.myFeeds} 
                            savedTrendCategories={this.state.savedTrendCategories}></CardSaved>
                  </div>
        
                </body>
              </>
        
            )
          }

      else {
          const HomeNavigate = () => {
            const navigate = useNavigate()
            return  <Button size="m" theme={undefined} use="primary" onClick={() => {navigate("/")}}>
                      Go to Trends
                    </Button>
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
                          
                  <div id="savetrendbar">
                    <h4>Saved Trends</h4>
                    <div id="dropbar">
                      <DropdownMenu>
                        <DropdownMenu.Trigger m={4}>
                          <ButtonTrigger w={503}>{this.state.trendCategory}</ButtonTrigger>
                        </DropdownMenu.Trigger>
                        <DropdownMenu.Menu >
                        {this.state.savedTrendCategories.map((title) => (
                            <DropdownMenu.Item onClick={()=> (this.changeTrendCategory(title.feed_name) (this.setState({trendCategory: title.feed_name})))}>{title.feed_name}</DropdownMenu.Item>
                        ))}
                        </DropdownMenu.Menu>
                      </DropdownMenu>
                    </div>
                  </div>

          <div id="savetrendcontent">
            <img src={icon} alt={"clipboard"} />
            <h4>There is nothing here yet</h4>
            <p>Click Save on a Trend card to add it to Saved Trends</p>
            <HomeNavigate></HomeNavigate>
          </div>
          </body>
          </>
        )
    } }
  

  render(){
      
    
    return (
      
      <>
      {this.emptySavedTrends()}
      </>

    )}
}
