
import React from 'react'

export default function NewsItem(props) {
  return (
   <>
   <div className='my-3'>
        <div className="card">


          <div style={{display:"flex"  ,justifyContent:"flex-end",position:"absolute", right: "0"}}>

        <span className=" badge rounded-pill bg-danger" >   {props.source}  </span>
          </div>


        <img src={props.imageUrl} className="card-img-top" alt="..."/>
        <div className="card-body">
          <h5 className="card-title">{props.title}  </h5>
          <p className="card-text">{props.description}</p>
          <p className='card-text'><small className='text-danger'>By {props.author} on {new Date(props.date).toGMTString()}</small></p>
          <a href={props.newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark">Read more</a>
        </div>
      </div>
    </div>
   </>
  )
}
