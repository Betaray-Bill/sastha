import { useEffect, useState } from 'react'
import Nav from '../Layout/Components/Nav'
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../utils/firebase';

function Home() {
  const [data,
    setData] = useState([]);
  useEffect(() => {
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
        setData(generatorData);
    } catch (error) {
        console.error("Error fetching car data:", error);
        alert("Failed to fetch car data. Please try again.");
    }
    }

    fetchData()
  }, [])

  console.log(data)
  return (
    <div className=''>
      
      {/* <Button >hello</Button> */}
    </div>
  )
}

export default Home
