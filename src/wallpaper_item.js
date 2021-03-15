import React from 'react';

const WallpaperItem = ({file}) => {
    /*
    if (file.data.preview) {
        if( file.data.preview.enabled) {
            */
            console.log(file.data);
            return (
                <div>
                    <a href={file.data.url}>{file.data.title}</a>
                </div>
            );
        //}
    //}
    return (
        <div></div>
    );
    
} 

export default WallpaperItem;