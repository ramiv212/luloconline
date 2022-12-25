import { usePrismicDocumentByUID } from '@prismicio/react';
import { useContext,useState,useEffect } from 'react';
import { ProductFilterContext } from '../ProductFilterContext';

function Sidebar() {
  const [document] = usePrismicDocumentByUID('homepage', 'homepage')
  
  const {productFilter, setProductFilter} = useContext(ProductFilterContext)

  const [scrollHeight, setScrollHeight] = useState(null)

  useEffect( () => {
    setScrollHeight(document && document.documentElement.scrollHeight)
  },[scrollHeight] )

  function removeFromArray(item,array) {
    const index = array.indexOf(item);
    if (index > -1) { // only splice array when item is found
      array.splice(index, 1); // 2nd parameter means remove one item only
    }
  }


  function chekboxFunction(checkboxID,filter) {
    let lowerCaseID = checkboxID.toLowerCase()
    let newFilter = [...filter]
    // if the item is found in the array
    if (newFilter.includes(lowerCaseID)) {
        // remove it
        removeFromArray(lowerCaseID,newFilter)
        return newFilter
    // if item is not found in array add it to the array
    } else {
        newFilter.push(lowerCaseID)
        return newFilter
    }
  }
  

  return (
    <div id='sidebar-parent' style={{height: scrollHeight}}>
    <div id='sidebar-child' style={{position: 'sticky',top:0}}>
        <br />
        <span style={{fontWeight:"600"}}>Category - </span>
        {document ? Object.keys(document.data.categories[0]).map((category) => {
            return <span className='sidebar-category' key={document.data.categories[0][category]}>
                <input name="cssCheckbox" 
                    type={'checkbox'} 
                    className="css-checkbox" 
                    id={document.data.categories[0][category]}
                    onChange={(e) => {
                        setProductFilter(chekboxFunction(e.target.id,productFilter))
                    }}
                    >
                    </input>&nbsp;
                <label htmlFor={document.data.categories[0][category]}>&nbsp;&nbsp;{document.data.categories[0][category]} </label>
                <br/> </span>
        }) : ""}

    </div>
    </div>
  )
}

export default Sidebar