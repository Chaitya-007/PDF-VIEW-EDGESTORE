"use client"
import React, { ChangeEvent, FormEvent } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {useState} from 'react'

import {Viewer, Worker} from '@react-pdf-viewer/core'
import {defaultLayoutPlugin} from '@react-pdf-viewer/default-layout'
import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'

function PDFViewer() {



  const [pdfFile, setPdfFile] = useState(null)
  const [viewPdf, setViewPdf] = useState(null)

  const fileType = ['application/pdf']
  const handleChange = (e) => {
    let selectedFile = e.target.files ? e.target.files[0] : null;
    if (selectedFile) {
      if (selectedFile && fileType.includes(selectedFile.type)) {
        let reader = new FileReader()
        reader.readAsDataURL(selectedFile)
        reader.onload = (e) => {
          setPdfFile(e.target.result)
        }
        
      } else {
        setPdfFile(null)
        alert('Please select the PDF file')
      }
    } else {
      console.log('Select your file')
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if(pdfFile !== null) {
    setViewPdf(pdfFile)
  }
  else{
    setViewPdf(null)
  }
}

const newPlugin = defaultLayoutPlugin()
  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
          <input type="file" className="form-control-file" id="pdfFile" onChange={handleChange}/>
        <button type="submit" className="btn btn-primary">View PDF</button>
       </form>

      <h2>View PDF</h2>
      <div className='pdf-container'>
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
      {viewPdf && <> 
      <Viewer fileUrl={viewPdf} plugins={[newPlugin]} />
      </>}
      {!viewPdf && <>No PDF file selected</>}
</Worker>

      </div>
     
    </div>
  )
}

export default PDFViewer