import React , { useEffect  } from 'react'

const Table = ( {rows,headings} ) => {
    
    useEffect(() => {
       

    }, [])

    return (
        <div>
            {/* table */}
            {( rows && headings )?
            <table id="datatable">
                <tr key='1' >
                    { 
                    
                    headings.map( (e,i)=>{
                        return( <th  style={{border:"1px solid black"}} key={ 'h'+i }> {e} </th> )
                    }) 
                    
                    }
                </tr>
                    
                    {
                        rows.map( (e,i)=>{
                            return (
                                <tr key={"r"+i}>
                                    {
                                        headings.map((el,j)=>{
                                            return(
                                            <td  style={{border:"1px solid black"}} key={"r"+i+"h"+j}> 
                                            { rows[i][el].toString()  }
                                             </td>
                                             )
                                        })
                                    }
                                </tr>
                            )
                        } )   
                    }

            </table>
            :
            <h1> "No Data To display."</h1>
            }
        </div> 
        )
        
}

export default Table
