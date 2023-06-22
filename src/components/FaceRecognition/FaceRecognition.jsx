import React from "react";
import './FaceRecognition.css'

const FaceRecognition = ({boxes, imageUrl}) => {
    return (
        <div className="center FaceRecognition">
            <div style={{position: 'relative'}}>
                <img id="inputimage" alt={''} src={imageUrl} style={{width: '500px', maxWidth: '100%', height: 'auto'}}></img>
                {
                    boxes.map((box, i) => {
                        const { topRow, rightCol, bottomRow, leftCol } = box
                        return <div key={i} className='bounding-box' style={{position:"absolute" , top: topRow, right: rightCol, bottom: bottomRow, left: leftCol}}></div>
                    })
                }
            </div>
        </div>
    )
}

export default FaceRecognition;