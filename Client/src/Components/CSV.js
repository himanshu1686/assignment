import React, {  useState } from 'react'
import { CSVReader } from 'react-papaparse'
import axios from 'axios'
import Table from './Table'
const buttonRef = React.createRef();
const CSV = () => {

  const [rows, setrows] = useState([]);
  const [headings,setheadings] =  useState([]);
  const parseData =async (heading,data)=>{
      let arr = [];
      console.log(heading);
      console.log(data);
      for(let i=1;i<data.length;i++){
        let obj = {};
        for(let j=0;j<heading.length;j++){
        obj[ heading[j] ]= data[i].data[j] ;
        }
      arr.push(obj);
      }
      console.log(arr);
      return arr
  }
  const handleOnFileLoad = async(ev) => {
    console.log(ev);
    //dimensions include the headers
    let heading = ev[0].data;
    
    let rows = await parseData(heading,ev);

     const sss = await axios.post('/api/adddata',{rows:rows,headings:heading});
    console.log(sss);
    if( sss.data.success ){
      alert('Addition to  mongo successful.');
      let addedHeading = await axios.get('/api/getheadings'); 
      let addedRows =await  axios.get('/api/getrows');
      alert('fetching data from mongo successful.');

      setheadings(addedHeading.data.headings);
      setrows(addedRows.data.rows);
      let rr=await axios.delete('/api/data');
      if(rr.data.success){alert('Data deleted from Db ');}else{alert('error in data deletion');return;}
    }
    else{
      alert('Addition to mongodb failed please try again.')
      return;
    }
  }

  const handleOnError = (ev) => {
    console.log(ev);
  }
  const handleOpenDialog = (ev) => {
    console.log(ev);
    if (buttonRef.current) {
      buttonRef.current.open(ev);
    }
  }
  const handleRemoveFile = (ev) => {
    console.log(ev);
    setrows([])
    setheadings([])
    if (buttonRef.current) {
      buttonRef.current.removeFile(ev);
    }
  }
  const handleOnRemoveFile = (ev) => {
    console.log(ev);

  }

  return (
    <div>
      <h5 id="heading" >CSV File Rader</h5>
      <CSVReader
        ref={buttonRef}
        onFileLoad={handleOnFileLoad}
        onError={handleOnError}
        noClick
        noDrag
        onRemoveFile={handleOnRemoveFile}
        config={{ dynamicTyping: true }}
      >
        {({ file }) => (
          <aside
            style={{
              display: 'flex',
              flexDirection: 'row',
              marginBottom: 10,
            }}
          >
            <button
              type="button"
              onClick={handleOpenDialog}
              style={{
                borderRadius: 0,
                marginLeft: 0,
                marginRight: 0,
                width: '40%',
                paddingLeft: 0,
                paddingRight: 0,
              }}
            >
              Browse file
              </button>
            <div
              style={{
                borderWidth: 1,
                borderStyle: 'solid',
                borderColor: '#ccc',
                height: 45,
                lineHeight: 2.5,
                marginTop: 5,
                marginBottom: 5,
                paddingLeft: 13,
                paddingTop: 3,
                width: '60%',
              }}
            >
              {file && file.name}
            </div>
            <button
              style={{
                borderRadius: 0,
                marginLeft: 0,
                marginRight: 0,
                paddingLeft: 20,
                paddingRight: 20,
              }}
              onClick={handleRemoveFile}
            >
              Remove
              </button>
          </aside>
        )}
      </CSVReader>
      
      <Table headings={headings} rows={rows} />
        

    </div>

  )
}

export default CSV
