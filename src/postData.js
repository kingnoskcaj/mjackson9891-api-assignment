/*
*	FILE : postData.js
*	PROJECT : SEBG3080 - Frontend Programming assignment
*	PROGRAMMER : Mark Jackson
*	FIRST VERSION : 2021-03-14
*	DESCRIPTION :
*		this builds the individual posts
*/
import React from 'react';

const PostData = ({ file }) => {
    /*when the button is clicked, add or remove from the favourites depending on of we are looking at them*/
    function handleClick() {
        /*get them from the stored data*/
        let favourites = JSON.parse(localStorage.getItem("favourites") || "[]");
        /*check if we are looking at them*/
        let viewFavourites = localStorage.getItem("viewFav");
        if(viewFavourites === 'true'){
            /*are are looking at them*/
            /*remove from array*/
            favourites.splice(favourites.findIndex(element=> element===file), 1);
        } else{
            /*we are looking at new posts*/
            /*add to the array*/
            favourites.push(file);
        }
        /*push the favourites back to the storage*/
        localStorage.setItem("favourites", JSON.stringify(favourites));
      }
    return (
        <div>
            <table>
                <tr>
                    <td>
                        <a href={file.data.url}>{file.data.title}</a>
                    </td>
                    <td>
                    <button onClick={handleClick}>Favourite</button>
                    </td>
                </tr>
            </table>
            
            
        </div>
    );
}

export default PostData;