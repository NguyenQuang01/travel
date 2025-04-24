import { Container } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import Image from "next/image";

const TopAttractions = (prop: any) => {
  const { attractions } = prop;
  const isMobile = useMediaQuery("(max-width:600px)");
  console.log("🚀 ~ TopAttractions ~ data:", attractions);

  return (
    <div className={`pt-${isMobile ? "5" : "10"}`} id="TopAttractions">
      <Container className="bg-white rounded-xl">
        <div className={`py-${isMobile ? "5" : "10"}`}>
          <div className="grid grid-cols-12 gap-8">
            {/* Left Column - Title */}
            <div className="col-span-12 md:col-span-3">
              <div className="text-[32px] font-semibold text-[hsl(0,0%,20%)] font-roboto leading-[48px]">
                Top Attractions
              </div>
            </div>

            {/* Right Column - Map and Timeline */}
            <div className="col-span-12 md:col-span-9">
              <div className="list-disc pl-5 space-y-2">
                {attractions[0].content
                  .split("-")
                  .map((item: any, index: number) => (
                    <div className="flex items-center gap-2" key={index}>
                      <Image
                        src="https://client.travelstride.com/app/_next/static/media/shuriken.783f5b17.svg"
                        alt="bullet point"
                        className="w-4 h-4"
                        width={24}
                        height={24}
                      />
                      {item.trim()}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default TopAttractions;
