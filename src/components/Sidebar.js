import { usePrismicDocumentByUID } from '@prismicio/react';
import { useContext } from 'react';
import { ProductFilterContext } from '../ProductFilterContext';

function Sidebar() {
  const [document] = usePrismicDocumentByUID('homepage', 'homepage')
  
  const {productFilter, setProductFilter} = useContext(ProductFilterContext)


  function removeFromArray(item,array) {
    const index = array.indexOf(item);
    if (index > -1) { // only splice array when item is found
      array.splice(index, 1); // 2nd parameter means remove one item only
    }
  }


  function chekboxFunction(checkboxID) {
    // if the item is found in the array
    if (productFilter.includes(checkboxID)) {
        // remove it
        removeFromArray(checkboxID,productFilter)
    // if item is not found in array add it to the array
    } else {
        productFilter.push(checkboxID)
    }
    console.log(productFilter)
  }
  

  return (
    <div id='sidebar'>
        <br />
        <span style={{fontWeight:"600"}}>Category - </span>
        {document ? Object.keys(document.data.categories[0]).map((category) => {
            return <span className='sidebar-category' key={document.data.categories[0][category]}>
                <input name="cssCheckbox" 
                    type={'checkbox'} 
                    className="css-checkbox" 
                    id={document.data.categories[0][category]}
                    onChange={(e) => {
                        chekboxFunction(e.target.id)                  
                    }}
                    >
                    </input>&nbsp;
                <label htmlFor={document.data.categories[0][category]}>&nbsp;&nbsp;{document.data.categories[0][category]} </label>
                <br/> </span>
        }) : ""}

    </div>
  )
}

export default Sidebar