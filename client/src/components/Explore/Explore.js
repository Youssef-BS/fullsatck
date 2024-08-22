import React from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { GetMarketById } from '../../Features/Product/ProductSlice';

const Explore = () => {
    const dispatch = useDispatch()
    // Retrieve marketId from route parameters
    const { marketId, categoryId, subcategoryId } = useParams();
    const MarketState = useSelector((state)=> state?.product?.Market);
    useEffect(()=>{
       dispatch(GetMarketById(marketId))
    },marketId,dispatch)
    console.log(MarketState)
    let content = null;

    if (marketId && !categoryId && !subcategoryId) {
        // Show categories for the selected market
      content = (
        <>
        <div id="maincontent" className="maincontent">
                <div className="container-fluid category-description-container">
                    <div className="row">
                        <div className="col title">
                            <div className="headingtitle">
                                <a href={`https://www.fos-lighting.eu/intelligent-audio-c-${marketId}.html`} className="category-box__image-wrapper">
                                    <img className="header-logo" style={{width:100}}src={MarketState?.image} alt="Active Speakers" />
                                </a>
                                <h1>{MarketState?.name}</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="product-categories-wrap">
                    <div className="container-fluid product-categories">
                        <div className="row my-0">
        {MarketState?.Categories?.map(Category=>(
            <div className="categorybox col-xl-3 col-lg-3 col-md-4 col-sm-6 col-6">
            <Link to={Category.Subcategories.length>0 ?`/explore/${marketId}/${Category.id}/`: `/store`} className="boxlink">
            <div className="image">
                <picture>
                    <source media="(min-width: 1361px)" srcSet={Category?.Products[0]?.image}/>
                    <img src={Category?.Products[0]?.image} className="lazyload" alt="ABS Active Speakers" />
                </picture>
            </div>
            <div className="title">
                <span>{Category?.name}</span>
            </div>
        </Link>
    </div>
        ))      }
         </div>
    </div>
    </div>
    </div>
        
    </>
        
      );
    } else if ( marketId && categoryId && !subcategoryId) {

        const category = MarketState?.Categories?.find(category => category.id == parseInt(categoryId));

      // Show subcategories for the selected category
      content = (
        <>
        <div id="maincontent" className="maincontent">
                <div className="container-fluid category-description-container">
                    <div className="row">
                        <div className="col title">
                            <div className="headingtitle">
                                <a href={`https://www.fos-lighting.eu/intelligent-audio-c-${marketId}.html`} className="category-box__image-wrapper">
                                    <img className="header-logo" style={{width:100}}src={MarketState?.image} alt="Active Speakers" />
                                </a>
                                <h1>{category?.name}</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="product-categories-wrap">
                    <div className="container-fluid product-categories">
                        <div className="row my-0">
        {category?.Subcategories?.map(SubCategory=>(
            <div className="categorybox col-xl-3 col-lg-3 col-md-4 col-sm-6 col-6">
               
               <Link to={SubCategory.SubSubcategories.length>0 ?`/explore/${marketId}/${categoryId}/${SubCategory.id}/`: `/store/${marketId}/${categoryId}`} className="boxlink">

            <div className="image">
                <picture>
                    <source media="(min-width: 1361px)" srcSet={SubCategory?.Products[0]?.image} />
                    <img src={SubCategory?.Products[0]?.image} className="lazyload" alt="ABS Active Speakers" />
                </picture>
            </div>
            <div className="title">
                <span>{SubCategory?.name}</span>
            </div>
        </Link>
    </div>
        ))      }
        </div>
        </div>
        </div>
        </div>
    </>
      );
    } else if (marketId && categoryId && subcategoryId) {
      // Show subsubcategories for the selected subcategory
      content = (
        <div>
          <h2>Subsubcategories for Subcategory ID: {subcategoryId}</h2>
          {/* Fetch or render subsubcategories based on subcategoryId */}
        </div>
      );
    } else {
      // Default content when none of the conditions match
      content = (
        <div>
          <h2>Select a market, category, or subcategory to explore</h2>
          {/* Render some default content or navigation */}
        </div>
      );
    }
    return (
        <div id="mainbody" className="mainbody">
            <div className="breadcrumb_container">
                <div className="breadcrumb" id="breadcrumb_static">
                    <div className="mainwrap container-fluid">
                        <a href="https://www.fos-lighting.eu" className="headerNavigation">Home</a>
                        <i>/</i>
                        <a href={`https://www.fos-lighting.eu/intelligent-audio-c-${marketId}.html`} className="headerNavigation">Intelligent Audio</a>
                        <i>/</i>
                        <a href={`https://www.fos-lighting.eu/active-speakers-c-${marketId}_97.html`} className="headerNavigation">Active Speakers</a>
                    </div>
                </div>
            </div>
            
                        {content}

                            
                           
                        </div>
                    
    );
};

export default Explore;
