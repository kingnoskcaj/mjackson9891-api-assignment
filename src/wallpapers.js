import React from 'react';
import WallpaperItem from './wallpaper_item';

const Wallpapers = ({files}) => {
    return (
        <div>
            {files.map((file) => (
                    <WallpaperItem file={file} />  
            ))}
        </div>
    );
}

export default Wallpapers;