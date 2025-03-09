import { useEffect, useState } from 'react';
import Nav from '../Layout/Components/Nav';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../utils/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { resetGeneratorData, setGeneratorData } from '../app/feature/generatorSlice';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

function Home() {
  const dispatch = useDispatch();
  const { generatorData } = useSelector((state) => state.generatorData);

  const fetchData = async () => {
    try {
      const generatorRef = collection(db, "generator");
      const querySnapshot = await getDocs(generatorRef);
      const generatorData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      dispatch(setGeneratorData(generatorData));
    } catch (error) {
      console.error("Error fetching car data:", error);
      alert("Failed to fetch car data. Please try again.");
    }
  };

  useEffect(() => {
    if (!generatorData) {
      fetchData();
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Nav />
      
      {/* Sync Button */}
      <div className="flex justify-end max-w-7xl mx-auto py-4 px-6">
        <Button onClick={() => {
          dispatch(resetGeneratorData());
          fetchData();
        }} variant="outline" className="flex items-center space-x-2">
          <RefreshCw size={18} />
          <span>Sync</span>
        </Button>
      </div>
      
      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto py-6 px-6">
        {generatorData && generatorData.map((item) => (
          <div key={item.id} className="border rounded-xl overflow-hidden shadow-md bg-white hover:shadow-lg transition-shadow">
            {/* Image Section */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={item.images[0].src}
                alt={item.images[0].alt}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content Section */}
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
              <Button className="w-full">
                <Link to={`/generator/${item.id}`} className="block w-full h-full text-center">
                  View Details
                </Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
