import { getSingleFood } from '@/app/action/auth/allApi';

interface Props {
  params: { foodID: string };
}

const Page = async ({ params }: Props) => {
  const food = await getSingleFood(params.foodID);

  return (
    <div>
      {food?.foodName}
    </div>
  );
};

export default Page;