import { useEffect, useState } from 'react'
import Nav from '../Layout/Components/Nav'
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../utils/firebase';
import {useDispatch, useSelector} from 'react-redux';
import { resetGeneratorData, setGeneratorData } from '../app/feature/generatorSlice';
import { Link } from 'react-router';


function Home() {
  // const [data,
  //   setData] = useState([]);

  const dispatch = useDispatch();
  const {generatorData} = useSelector((state) => state.generatorData)

  const fetchData = async () => {
    try {
      const generatorRef = collection(db, "generator");
      const querySnapshot = await getDocs(generatorRef);
      const generatorData = querySnapshot
          .docs
          .map((doc) => ({
              id: doc.id,
              ...doc.data()
          }));
      // setData(generatorData);
      dispatch(setGeneratorData(generatorData));
      
  } catch (error) {
      console.error("Error fetching car data:", error);
      alert("Failed to fetch car data. Please try again.");
  }
  }
  useEffect(() => {

    console.log(2)
    if(generatorData){
      console.log(1)
      fetchData()
    }
    console.log(3)
  }, [])

  console.log(generatorData)

  // console.log(data)
  return (
    <div className=''>
      
      {/* <Button >hello</Button> */}
      {/* <button onClick={() => {
        dispatch(resetGeneratorData())
        fetchData()
      }}>
        Reset
      </button> */}

      <div className='grid grid-cols-2 w-1/2 mx-auto gap-4 mt-10'>
      {
        generatorData && generatorData.map((item, index) => (
          <div key={index} className='border p-4 '>
            <h2>{item.title}</h2>
            <button className='bg-blue-500 text-white p-2 rounded mt-2'>
              <Link to={`/generator/${item.id}`}>View</Link>
            </button>
          </div>
        ))
      }
      </div>
    </div>
  )
}

export default Home
