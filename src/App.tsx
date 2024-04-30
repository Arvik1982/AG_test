
import { useState } from 'react'
import styles from'./app.module.css'
import AppRoutes from "./routes/AppRoutes"

function App() {

  const [currentPage, setCurrentPage]=useState('')

  return (    
      <div className={styles.content__block}>
        <AppRoutes currentPage={currentPage} setCurrentPage={setCurrentPage}/>
      </div>    
  )
}

export default App
