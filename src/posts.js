/*
*	FILE : posts.js
*	PROJECT : SEBG3080 - Frontend Programming assignment
*	PROGRAMMER : Mark Jackson
*	FIRST VERSION : 2021-03-14
*	DESCRIPTION :
*		this sends individual posts to the post builder in postData.js
*/
import React from 'react';
import PostData from './postData';

const Posts = ({ files }) => {
    return (
        <div>
            {files.map((file) => (
                <PostData file={file} />
            ))}
        </div>
    );
}

export default Posts;