
import './Rank.css'
 
const Rank = ({name, entries}) => {
    return (   
    <div className='Rank'> 
        <div className="f3">
        <p>{`${name}, This is your current entry count `}</p>
        </div> 
        <div className='f1'>
        <p>{`#${entries}`}</p>
        </div>
    </div>
         
    );
}

export default Rank;