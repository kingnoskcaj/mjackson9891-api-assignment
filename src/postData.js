import React from 'react';
import App from './App';

const PostData = ({ file }) => {
    function handleClick() {
        let favourites = JSON.parse(localStorage.getItem("favourites") || "[]");
        favourites.push(file);
        localStorage.setItem("favourites", JSON.stringify(favourites));
      }
    return (
        <div>
            <a href={file.data.url}>{file.data.title}</a>
            <button
                className="btn btn-default"
                onClick={handleClick}>Favourite</button>
        </div>
    );
}

export default PostData;