import Image from 'next/image';
import { ApplicationInfo } from '../page';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { CommonPayload } from '@/app/action/auth/allApi';
import { useState } from 'react';



type Props = {
    applications: ApplicationInfo[];
    acceptApplication: (ID: string) => Promise<void>;
    rejectedApplication: (ID: string) => Promise<void>;
    allData: CommonPayload[];
}

const ApplicationTable = ({ applications, acceptApplication, rejectedApplication, allData }: Props) => {

    const [singleData, setSingleData] = useState<CommonPayload>({});
    // sort based on date
    applications = applications.sort(
        (a, b) => a.date.getTime() - b.date.getTime()
    );

    // handle modal
    const handleModal = (id: string) => {
        const filterSingleData = allData.filter(data => data._id === id);
        setSingleData(filterSingleData[0]);
    }

    return (
        <Dialog>
            <div className="overflow-auto w-full">
                <table className="table w-full border-collapse border border-gray-300">
                    {/* Table Head */}
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="p-4 w-[10%]">SL NO</th>
                            <th className="p-4 text-left w-[20%]">Applicant</th>
                            <th className="p-4 text-left w-[15%]">Eamil</th>
                            <th className="p-4 w-[15%]">Identification</th>
                            <th className="p-4 w-[15%]">Date</th>
                            <th className="p-4 w-[25%]">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {applications.map((application, indx) => (
                            <tr key={application.id} className="border-b border-gray-200 text-center even:bg-gray-100">
                                <td className='font-semibold px-4'>{indx + 1}</td>

                                <td className="p-4">
                                    <div className="flex items-center gap-2">
                                        <div className="h-10 w-10">
                                            <Image
                                                src={application.image}
                                                width={40}
                                                height={40}
                                                className="rounded-full object-cover"
                                                alt="Image"
                                            />
                                        </div>
                                        <div>
                                            <h1 className="font-medium whitespace-nowrap">{application.name}</h1>
                                        </div>
                                    </div>
                                </td>

                                <td className="p-4 whitespace-nowrap text-left">{application.email}</td>
                                <td className="p-4 whitespace-nowrap">{application.identification}</td>
                                <td className="p-4 whitespace-nowrap">{application.date.toLocaleDateString()}</td>
                                <td className='p-4 flex items-center justify-center gap-2'>
                                    <DialogTrigger onClick={() => handleModal(application.id)} className='w-fit font-medium px-4 py-1.5 border border-gray-200 cursor-pointer bg-gray-300 hover:bg-gray-400 transition-colors duration-200 ease-in-out'>Details</DialogTrigger>
                                    <button onClick={() => acceptApplication(application.id)} className='w-fit font-medium px-4 py-1.5 border border-gray-200 cursor-pointer bg-green-300 hover:bg-green-400 transition-colors duration-200 ease-in-out'>Accept</button>
                                    <button onClick={() => rejectedApplication(application.id)} className='w-fit font-medium px-4 py-1.5 border border-gray-200 cursor-pointer bg-red-300 hover:bg-red-400 transition-colors duration-200 ease-in-out'>Reject</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>


            {/* modal for owner */}
            {
                'restaurantOwnerEmail' in singleData && <DialogContent>
                    <DialogHeader>
                        <DialogHeader>
                            <DialogTitle className="text-xl font-semibold text-center uppercase text-gray-800">
                                Restaurant Informations
                            </DialogTitle>

                            {/* Logo/Image Section */}
                            <DialogDescription className="flex justify-center my-5">
                                <Image
                                    src={singleData.restaurantLogo!}
                                    alt="Restaurant Logo"
                                    width={200}
                                    height={200}
                                    className="rounded-full object-cover shadow-md border-4 border-gray-300"
                                />
                            </DialogDescription>

                            {/* Info Table */}
                            <div className="mx-auto w-full max-w-xl p-4 bg-gray-50 rounded-lg shadow-sm">
                                <table className="w-full text-left border-separate border-spacing-y-3">
                                    <tbody>
                                        <tr>
                                            <th className="text-gray-600 w-1/3 font-medium">Owner Name</th>
                                            <td className="text-gray-800">: {singleData.restaurantOwnerName}</td>
                                        </tr>
                                        <tr>
                                            <th className="text-gray-600 w-1/3 font-medium">Owner Email</th>
                                            <td className="text-gray-800">: {singleData.restaurantOwnerEmail}</td>
                                        </tr>
                                        <tr>
                                            <th className="text-gray-600 w-1/3 font-medium">Identification No.</th>
                                            <td className="text-gray-800">: {singleData.ownerIdentification}</td>
                                        </tr>
                                        <tr>
                                            <th className="text-gray-600 w-1/3 font-medium">Restaurant Name</th>
                                            <td className="text-gray-800">: {singleData.restaurantName}</td>
                                        </tr>
                                        <tr>
                                            <th className="text-gray-600 w-1/3 font-medium">Restaurant Email</th>
                                            <td className="text-gray-800">: {singleData.restaurantEmail}</td>
                                        </tr>
                                        <tr>
                                            <th className="text-gray-600 w-1/3 font-medium">Phone Number</th>
                                            <td className="text-gray-800">: {singleData.restaurantNumber}</td>
                                        </tr>
                                        <tr>
                                            <th className="text-gray-600 w-1/3 font-medium">Address</th>
                                            <td className="text-gray-800">: {singleData.restaurantAddress}</td>
                                        </tr>
                                        <tr>
                                            <th className="text-gray-600 w-1/3 font-medium">Description</th>
                                            <td className="text-gray-800">: {singleData.restaurantDescription}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </DialogHeader>
                    </DialogHeader>
                </DialogContent>
            }

            {/* modal for rider */}
            {
                'riderEmail' in singleData && <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="text-xl font-semibold text-center uppercase text-gray-800">
                            Rider Informations
                        </DialogTitle>

                        {/* Image Section */}

                        <DialogDescription className="flex justify-center my-5">
                            <Image
                                src={singleData.riderImage!}
                                alt="Rider Image"
                                width={200}
                                height={200}
                                className="rounded-full object-cover shadow-md border-4 border-gray-300"
                            />
                        </DialogDescription>

                        {/* Info Table */}
                        <div className="mx-auto w-full max-w-xl p-4 bg-gray-50 rounded-lg shadow-sm">
                            <table className="w-full text-left border-separate border-spacing-y-3">
                                <tbody>
                                    <tr>
                                        <th className="text-gray-600 w-1/3 font-medium">Name</th>
                                        <td className="text-gray-800">: {singleData.riderName}</td>
                                    </tr>
                                    <tr>
                                        <th className="text-gray-600 w-1/3 font-medium">Email</th>
                                        <td className="text-gray-800">: {singleData.riderEmail}</td>
                                    </tr>
                                    <tr>
                                        <th className="text-gray-600 w-1/3 font-medium">Phone Number</th>
                                        <td className="text-gray-800">: {singleData.riderNumber}</td>
                                    </tr>
                                    <tr>
                                        <th className="text-gray-600 w-1/3 font-medium">Identification No.</th>
                                        <td className="text-gray-800">: {singleData.riderIdentification}</td>
                                    </tr>
                                    <tr>
                                        <th className="text-gray-600 w-1/3 font-medium">Vehicle Type</th>
                                        <td className="text-gray-800">: {singleData.vehicleType}</td>
                                    </tr>
                                    <tr>
                                        <th className="text-gray-600 w-1/3 font-medium">Address</th>
                                        <td className="text-gray-800">: {singleData.riderAddress}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </DialogHeader>
                </DialogContent>
            }
        </Dialog>
    );
};

export default ApplicationTable;