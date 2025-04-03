"use client";
import { CommonPayload, getAllRider } from "@/app/action/auth/allApi";
import { useEffect, useState } from "react";

// interface RiderDataType {
//   // _id: string;
//   riderEmail: string;
//   riderName: string;
//   riderNumber: string; // Change to string to handle phone numbers correctly
//   riderAddress: string;
//   description: string;
//   vehicleType: string;
//   created_at: string; // Keep as string (ISO string or custom formatted)
// }

const Applications = () => {
  const [riderApplications, setRiderApplications] = useState<CommonPayload[]>(
    []
  );

  useEffect(() => {
    const fetchRiderApplications = async () => {
      try {
        const response: CommonPayload[] = await getAllRider();
        setRiderApplications(response);
      } catch (error) {
        console.error("Error fetching rider applications:", error);
      }
    };
    fetchRiderApplications();
  }, []);

  return (
    <section>
      <div className="w-11/12 mx-auto space-y-10">
        <div>
          <h1>This is restaurant owner applications</h1>
        </div>
        <hr />
        <div>
          <h1>This is rider applications</h1>
          <ul>
            {riderApplications.map((rider) => (
              <li key={rider._id}>
                <strong>{rider.riderName}</strong> - {rider.vehicleType} (
                {rider.riderEmail}) - {rider.riderNumber}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Applications;
