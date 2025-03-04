import { useEffect, useState } from 'react'
import Nav from '../Layout/Components/Nav'
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../utils/firebase';
import {useDispatch, useSelector} from 'react-redux';
import { resetGeneratorData, setGeneratorData } from '../app/feature/generatorSlice';
import { Link } from 'react-router';


function Home() {

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
    if(!generatorData){
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

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto py-12 px-4'>
        {generatorData && generatorData.map((item) => (
          <div key={item.id} className='border rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow bg-white'>
            {/* Image Section */}
            <div className='relative h-48 overflow-hidden'>
              <img
                src={item.images[0].src} // Use the first image from the array
                alt={item.images[0].alt}
                className='w-full h-full object-cover'
              />
            </div>

            {/* Content Section */}
            <div className='p-6'>
              <h2 className='text-2xl font-bold mb-2'>{item.title}</h2>
              <p className='text-gray-600 line-clamp-3 mb-4'>
                {item.data.find((d) => d.type === 'Paragraph')?.content || 'No description available.'}
              </p>
              <button className='w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors'>
                <Link to={`/generator/${item.id}`} className='block w-full h-full'>
                  View Details
                </Link>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
