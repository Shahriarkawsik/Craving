"use client";
import { getAllRider, RiderPayload, updateRiderStatus } from "@/app/action/auth/allApi";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Switch } from "@/components/ui/switch";
import { toast } from "react-toastify";

const AllRiders = () => {
  const [riders, setRiders] = useState<RiderPayload[]>([]);

  const fetchAllRiders = async () => {
    try {
      const response = await getAllRider();
      if (Array.isArray(response)) {
        setRiders(response);
      } else {
        setRiders([]);
      }
    } catch (error) {
      console.error("Error fetching rider applications:", error);
      setRiders([]); // ensure it's always an array
    }
  };


  // handle block and unblock
  const handleToggleRiderStatus = async (e: boolean, id: string, indx: number) => {
    const status: string = e ? 'Blocked' : 'Active';

    // update ui
    setRiders(prev =>
      prev.map((rider, i) =>
        i === indx ? { ...rider, riderStatus: status } : rider
      )
    );

    const result = await updateRiderStatus(id, status);
    
    if(result.acknowledged){
      if(e){
        toast.success('Rider is Blocked!');
      }else{
        toast.success('Rider is Unblocked!');
      }
    }else{
      toast.error('Something went wrong!');
    }
  }

  useEffect(() => {
    fetchAllRiders();
  }, []);

  return (
    <div className="space-y-5">
      <section>
        <h1 className="uppercase text-2xl">All Riders</h1>
      </section>

      <section className="overflow-auto w-full bg-white">
        <table className="table w-full border-collapse border border-gray-300">
          {/* Table Head */}
          <thead>
            <tr className="bg-gray-200">
              <th className="p-4 whitespace-nowrap w-[10%]">SL NO</th>
              <th className="p-4 text-left w-[20%]">Rider</th>
              <th className="p-4 text-left w-[20%]">Contact</th>
              <th className="p-4 whitespace-nowrap w-[20%]">Identification</th>
              <th className="p-4 whitespace-nowrap w-[10%]">Vehicle Type</th>
              <th className="p-4 w-[20%]">Actions</th>
            </tr>
          </thead>

          {/* table body */}
          <tbody>
            {riders.length > 0 ? riders.map((rider, indx) => (
              <tr key={rider._id} className="border-b border-gray-300 text-center even:bg-gray-100">
                <td className='font-semibold px-4'>{indx + 1}</td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <div className="h-10 w-10">
                      <Image
                        src={rider.riderImage!}
                        width={40}
                        height={40}
                        className="rounded-full object-cover"
                        alt="Image"
                      />
                    </div>
                    <div>
                      <h1 className="font-medium whitespace-nowrap capitalize">{rider.riderName}</h1>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-left">
                  <p className="whitespace-nowrap">Email: {rider.riderEmail}</p>
                  <p className="whitespace-nowrap">Number: {rider.riderNumber}</p>
                </td>
                <td className="p-4 whitespace-nowrap">{rider.riderIdentification}</td>
                <td className="p-4 whitespace-nowrap capitalize">{rider.vehicleType}</td>
                <td className='p-4 whitespace-nowrap'>
                  Unblock <div className="mx-2 inline-block">
                    <Switch onCheckedChange={(e) => handleToggleRiderStatus(e, rider._id!, indx)} checked={rider.riderStatus !== 'Active'} id="airplane-mode" className="data-[state=checked]:bg-amber-500 transition-colors cursor-pointer" />
                  </div> Block
                </td>
              </tr>
            )) : <tr><td colSpan={6} className='text-xl py-5 font-medium text-center text-red-400'>Rider is not found!</td></tr>}
          </tbody>

        </table>
      </section>
    </div>
  );
};

export default AllRiders;