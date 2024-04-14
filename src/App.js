import './App.css';
import { useEffect, useState } from 'react';
import ReviewCard from './components/ReviewCard';
import { TailSpin } from 'react-loader-spinner';

const apiConstants = {
  initial: null,
  success: 'SUCCESS',
  loading: 'LOADING',
  failure: 'FAILURE'
};

const colorsList = ['#fcba03', '#48e80e', '#0ee894', '#fa5007', '#e607fa', '#0707fa', '#fa0738', '#07fa7d', '#c9fa07', '#fa07cd'];

const App = () => {
  const [apiStatus, setApiStatus] = useState(apiConstants.initial);
  const [reviewsList, setReviewsList] = useState([]);
  const [paginationLinks, setPaginationLinks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
 

  useEffect(() => {
    fetchData();
     // eslint-disable-next-line
  }, [currentPage]);

  const fetchData = async () => {
    setApiStatus(apiConstants.loading);
    const response = await fetch(`https://admin.tomedes.com/api/v1/get-reviews?page=${currentPage}`);
    if (response.ok) {
      const data = await response.json();
      setReviewsList(data.data);

      setCurrentPage(data.meta.current_page)
      setPaginationLinks(data.meta.links)
      setApiStatus(apiConstants.success);
    } else {
      setApiStatus(apiConstants.failure);
    }
  };

  const handlePageChange = (url) => {
    if(url !== null){
    const page = Number(url.split('=')[1]);
    setCurrentPage(page);
    }
  };

  const renderSuccessView = () => (
    <>
      <ul className='reviews-container'>
        {reviewsList.map((each, index) => (
          <ReviewCard key={each.ID} eachReview={each} bgColor={colorsList[index]} />
        ))}
      </ul>
      <div className="pagination-container">
      
        {paginationLinks.map((link, index) => {
          

          let btnClass=link.active?'btn active-btn':'btn';
          let btnValue = link.label;
          if (link.label.endsWith('Previous')) {
            btnValue = '< Prev'; 
          } else if (link.label.startsWith('Next')) {
            btnValue = 'Next >'; 
          }

          return (
            <button key={index} className={btnClass} onClick={() =>handlePageChange(link.url)}>
              {btnValue}
            </button>
          );
        })}
      </div>
    </>
  );

  const renderLoader = () => (
    <div className='loader-container'>
      <TailSpin color=' rgb(0, 102, 255)' width={60} height={60} />
    </div>
  );

  const renderFailureView = () => (
    <div className='failure-container'>
      <h1>Failure</h1>
    </div>
  );

  const renderResult = () => {
    switch (apiStatus) {
      case apiConstants.failure:
        return renderFailureView();
      case apiConstants.success:
        return renderSuccessView();
      case apiConstants.loading:
        return renderLoader();
      default:
        return null;
    }
  };

  return (
    <div className='main-container'>
      <div className='content-container'>
        <h1 className='app-head'>Welcome to Reviews Application</h1>
        <div className='result-container'>
          {renderResult()}
        </div>
      </div>
    </div>
  );
};

export default App;
