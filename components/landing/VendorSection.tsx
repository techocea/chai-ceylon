import { Button } from "@/components/ui/button";

const VendorSection = () => {
    return (
        <section className="wrapper">
            <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-3 md:grid-rows-2 gap-8 md:gap-16 place-items-center py-8 md:py-16">
                <VendorDetails
                    title="Tea Kiosk"
                    subTitle="Compact, stylish, and full of flavor"
                    description=" Own a shop on a main road or in a crowded area? We’ll set up a kiosk at your location. You can either sell and earn directly, or let us provide staff and pay you rent."
                />
                <VendorDetails
                    title="Tea Box"
                    subTitle="A curated tea experience in a box"
                    description="Have a bike? We’ll provide you with a custom Tea Box setup and all necessary materials to sell our tea around your local area."
                />
                <div className="col-span-1 md:col-span-2 place-items-center lg:justify-self-center w-full">
                    <VendorDetails
                        title="Tea Wheel"
                        subTitle="Bring the authentic taste to your event"
                        description=" Have a three-wheeler? We’ll help convert it into a mobile tea unit under a two-year agreement. A refundable deposit and terms will apply. Earn by selling at outdoor events, street corners, or busy marketplaces."
                    />
                </div>
            </div>
        </section>
    );
};

export default VendorSection;

function VendorDetails({
    title,
    subTitle,
    description,
}: {
    title: string;
    subTitle: string;
    description: string;
}) {
    return (
        <div className="flex flex-col items-center text-center w-full max-w-xs sm:max-w-sm md:max-w-md">
            <h2 className="title text-primary">{title}</h2>
            <p className="text-primary">{subTitle}</p>
            <p className="my-4 text-muted-foreground font-medium">
                {description}
            </p>
            <div>
                <Button>Proceed Now</Button>
            </div>
        </div>
    );
}
