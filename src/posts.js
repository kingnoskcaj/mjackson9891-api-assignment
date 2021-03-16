import React from 'react';
import PostData from './postData';

const Posts = ({files}) => {
    return (
        <div>
            {files.map((file) => (
                    <PostData file={file} />  
            ))}
            
        </div>
    );
}

export default Posts;