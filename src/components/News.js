import React,{useEffect,useState} from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";






const News=(props)=> {
  
  const [articles, setArticles] = useState([])   //we will fetch out api in articles
  const [loading, setLoading] = useState(true)     //this is for spinner
  const [page, setPage] = useState(1)          //bydefault page will be 1
  const [totalResults, setTotalResults] = useState(0)           //it will store total no. of results

  




  //to capitalise first letter
  const capitaliseFirstLetter =(string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }






    //to update the page
    const  updateNews= async ()=>{


      props.loading(10);  // loading  10%

      const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
      setLoading(true) //enable loading before fetching data
      
      let data = await fetch(url);  //fetch data


      props.loading(30);   //loading 30%


      let parsedData = await data.json()   //parse data to json

      props.loading(70);  //loading 70%

      setArticles(parsedData.articles)        //store data articles in the state
      setTotalResults(parsedData.totalResults)   //store the number of total results
      setLoading(false)           //disable loading after data is fetched

    

      props.loading(100);  //loading complete

    }




//in class component it is componentDidMount
//we input we want to listen is give empty array so it will run only once
    useEffect(() => {
      
      document.title=`${capitaliseFirstLetter(props.category)} - Newsify`; //changing the title
      updateNews();       //call updateNews function to fetch articles
      //eslint-disable-next-line
  
    }, [])
    
  



//fetching more data for infinite scroll
   const fetchMoreData = async () => {
    
     
     const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
     
     setPage(page+1)  //increment the page 
      
      let data = await fetch(url);  //fetch data from next page
      let parsedData = await data.json()     //parse data to jason
      setArticles(articles.concat(parsedData.articles))     //concatinate the data next to the current data
      setTotalResults(parsedData.totalResults)   //total results of 2nd page
     
    };


  
      
      //we are using map to traverse article array
      //when we use map to iterate we have to give a unique key to each element
      //we use slice as we want to limit the no. of character in title till 88 characters
      //we disable next button when if we add 1 next page then it will be greater than the total no. of pages required
      //if loading will be true than only spinner will spin 
    return (
      
      <>
        <h1 className="text-center " style={{ margin: "50px" } }>Newsify - Top {capitaliseFirstLetter(props.category)} Headlines  </h1>

         {loading && <Spinner/>}    

        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}  
          hasMore={articles.length !== totalResults}     
          loader={<Spinner/>}
        >
   
   <div className="container">

          

        <div className="row">
          { articles.map((element)=>{
            
            return  <div className="col-md-4"  key={element.url} >
            <NewsItem   title={element.title?element.title:""} description={element.description?element.description:""} 
            imageUrl={element.urlToImage?element.urlToImage:"https://previews.123rf.com/images/hollygraphic/hollygraphic1301/hollygraphic130100016/17177197-black-question-mark-from-question-words.jpg"} newsUrl={element.url}
            author={element.author?element.author:"Unknown"} date={element.publishedAt?element.publishedAt:""} 
            source={element.source.name}
            />
          </div>

}) }
        </div>

</div>
        </InfiniteScroll>




</>

)

}


News.defaultProps = {
  pageSize: 5,
  country: 'in',
  category: 'general'

}


News.propTypes = {
  pageSize: PropTypes.number,
  country:PropTypes.string,
  category:PropTypes.string
}


export default News;






































 



/*for previous button 
   const handlePrevClick = async ()=>
  {
    setPage(page-1)

      updateNews();
    }





//for next button
      handleNextClick =  async ()=>
    {
   

        setPage(page+1)

        updateNews();

      }
      
    



    return (
      
      <div className="container my-3">
        <h1 className="text-center " style={{ margin: "40px"} }>Newsify - Top {this.capitaliseFirstLetter(props.category)} Headlines  </h1>

        {this.state.loading && <Spinner/>}    
    
        <div className="row">
          {!this.state.loading && this.state.articles.map((element)=>{

          return  <div className="col-md-4"  key={element.url} >
            <NewsItem   title={element.title?element.title:""} description={element.description?element.description:""} 
            imageUrl={element.urlToImage?element.urlToImage:"https://previews.123rf.com/images/hollygraphic/hollygraphic1301/hollygraphic130100016/17177197-black-question-mark-from-question-words.jpg"} newsUrl={element.url}
            author={element.author?element.author:"Unknown"} date={element.publishedAt?element.publishedAt:""} 
            source={element.source.name}
            />
          </div>

          }) }
        </div>


        <div  className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
        <button disabled={this.state.page +1  >  Math.ceil(this.state.totalResults/props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>

        </div>

      </div>
          
    );
  }
}

*/