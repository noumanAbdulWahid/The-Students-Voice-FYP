import React, { useState, useEffect } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { Image } from 'primereact/image';
        

function PostContent({content, image}){
    const [truncatedContent, setTruncatedContent] = useState("");
    const [showFullContent, setShowFullContent] = useState(false);

    function handleShowFullContent() {
        setShowFullContent(true);
      }
      function handleShowLessContent() {
        setShowFullContent(false);
      }
    
      useEffect(() => {
        if (content.length > 150) {
          setTruncatedContent(content.slice(0, 150) + '  ');
        } else {
          setTruncatedContent(content);
        }
      }, [content]);

    return(
        <>
        <div className='post-content'>
            {showFullContent ? (
                <div>
                    <span className='show-content'>
                        {ReactHtmlParser(content)} 
                        {content.length > 150 && (
                            <button className='show-content-btn font-bold' onClick={handleShowLessContent}> ...Show less</button>
                        )}
                    </span>
                </div>
            ): (
            <span className='show-content'>
                {ReactHtmlParser(truncatedContent)}
                {content.length > 150 && !showFullContent && (
                <button className='show-content-btn font-bold' onClick={handleShowFullContent}> ...See more</button>
                )}
            </span>
            )}
         </div>
         <Image src={`/images/${image}`} zoomSrc = {`/images/${image}`} alt="Post Image" className='w-12 flex flex-column mt-2' style={{ objectFit: 'cover', objectPosition: 'top'}} preview />
         </>
    );
}

export default PostContent;