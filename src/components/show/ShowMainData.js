import React from 'react'
import {Star} from '../styled'
import IMG_PLACEHOLDER from '../../images/not-found.png';
import {MainDataWrapper} from './ShowMainData.styled'
const ShowMainData = ({ name, rating, summary, tags, image }) => {
    return (
      <MainDataWrapper>
        <img src={image ? image.original : IMG_PLACEHOLDER} alt="show-cover" />
        <div className='text-side'>
          <div className='headline'>
            <h1>{name}</h1>
            <div>
              <Star />
              <span>{rating.average || 'N/A'}</span>
            </div>
          </div>
          <div className='summary' dangerouslySetInnerHTML={{ __html: summary }} />
  
          <div>
            {/* Tags:{' '} */}
     {/*        <Taglist>
              {tags.map((tag, i) => (
                <span key={i}>{tag}</span>
              ))}
            </Taglist> */}
          </div>
        </div>
      </MainDataWrapper>
    );
  };
export default ShowMainData
