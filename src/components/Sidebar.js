import { usePrismicDocumentByUID } from '@prismicio/react';
import { useContext,useState,useEffect } from 'react';
import { ProductFilterContext } from '../ProductFilterContext';

function Sidebar( { filter,sale } ) {
  const [document] = usePrismicDocumentByUID('homepage', 'homepage')
  
  const {productFilter, setProductFilter} = useContext(ProductFilterContext)

  const [scrollHeight, setScrollHeight] = useState(null)

  useEffect( () => {
    document && setScrollHeight(document && document.documentElement.scrollHeight)
  },[scrollHeight] )


  function removeFromArray(item,array) {
    const index = array.indexOf(item);
    if (index > -1) { // only splice array when item is found
      array.splice(index, 1); // 2nd parameter means remove one item only
    }
  }

  // this function adds or removes an item to the filter state that filters what products
  // are rendered in the products component. On checkbox change, it will either add an item or remove it if it exists.
  function chekboxFunction(checkboxID,filter) {
    let lowerCaseID = checkboxID.toLowerCase()
    console.log(filter)
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
    <div id='sidebar-parent' style={{height: scrollHeight, width:'265px'}}>
    <div id='sidebar-child' style={{position: 'sticky',top:0}}>
        <br />
        <span style={{fontWeight:"600"}}>Category - </span>
        {document ? Object.keys(document.data.categories[0]).map((category) => {

            // if the category of this checkbox matches the filter, do not render this checkbox
            // categories with two words have an underscore in between so I add one to the filter as well to help them match
            if (filter && category.toLowerCase() === filter.toLowerCase().replace(' ','_')) return

            return <span className='sidebar-category' key={document.data.categories[0][category]}>
                <input name="cssCheckbox" 
                    type={'checkbox'} 
                    className="css-checkbox" 
                    id={document.data.categories[0][category]}
                    onChange={(e) => {
                        setProductFilter({
                          filter: chekboxFunction(e.target.id,productFilter.filter),
                          sale: productFilter.sale
                        })
                    }}
                    >
                    </input>&nbsp;
                <label htmlFor={document.data.categories[0][category]}>&nbsp;&nbsp;{document.data.categories[0][category]} </label>
                <br/> </span>
        }) : ""}
        
        {/* this checkbox will enable filtering by sale. It will change the sale object of the productFilter context */}
        {!sale ? <span id='sale-checkbox-span'>
          <input type={'checkbox'} className="css-checkbox" id='sale-checkbox' onChange={(e) => {
            console.log(e.target.checked)
            if (e.target.checked) {
              setProductFilter({
                filter: productFilter.filter,
                sale: true,
              })
            } else {
              setProductFilter({
                filter: productFilter.filter,
                sale: false,
              })
            }
          }}></input>
          <label htmlFor='sale-checkbox'>&nbsp;&nbsp;&nbsp;Sale</label>
        </span> : ""}

    </div>
    </div>
  )
}

export default Sidebar