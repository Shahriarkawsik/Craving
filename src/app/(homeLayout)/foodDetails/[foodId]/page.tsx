


const FoodDetails = async ({ params }: { params: { foodId: string }}) => {
    
    console.log(params.foodId);

    return (
        <div>
            <h2>this is food details page</h2>
        </div>
    );
};

export default FoodDetails;