import './index.css'
import Header from '../Header'

const Home = (props) => {
  const navigateJobs=()=>{
    const {history}=props
    history.push('/jobs')
  }

  return (
    <>
      <Header />
      <div className="home-container">
        <h1 className="home-header">Find The Job That Fits Your Life</h1>
        <p className="home-description">
          Millions of people searching for jobs
        </p>
        <button className="homeBtn" onClick={navigateJobs}>Find Jobs</button>
      </div>
    </>
  )
}
export default Home
