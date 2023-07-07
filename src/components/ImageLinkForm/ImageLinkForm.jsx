
import './ImageLinkForm.css'
 
const ImageLinkForm = ({onInputChange, onPictureSubmit}) => {
    return (   
        <div className="ImageLinkForm center">
            <p>{'this app will detect faces in your picture. Git it a try'}</p>
        
            <div className='detect-box' style={{width: '700px', maxWidth: '100%', margin: 50}}> 
                <input placeholder='Paste your link here...' className='detect-input' type='text' onChange={onInputChange} />
                <button className='detect-button' onClick={onPictureSubmit}>Detect</button>
            </div>
        </div> 
         
    );
}

export default ImageLinkForm;
