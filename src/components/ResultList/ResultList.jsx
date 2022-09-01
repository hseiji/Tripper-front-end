import React, { useContext, useEffect } from 'react'
import { AppContext } from '../hooks/useAppContext'
import { ListItem } from '../ListItem/ListItem'

export const ResultList = () => {

  const { results } = useContext(AppContext);

  useEffect(() => {

  },[results])

  return (
    <div className="results-wrapper">
      {results.length > 0 && <h3 style={{"marginLeft": "40px","fontFamily":"Copperplate", "fontSize":"25px"}}>Results:</h3>}
      <ul style={{"listStyle": "none"}}>
        {
          // console.log("props:", props.result)
          results.map((item) => {
            return (
              <ListItem 
                key = {item.id}
                results={item}
              /> 
          )
          })
        }
      </ul>
    </div>
  )
}
