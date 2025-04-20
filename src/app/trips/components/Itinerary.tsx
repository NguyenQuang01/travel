import { Container } from "@mui/material";
import { ClockCircleOutlined, EnvironmentOutlined } from "@ant-design/icons";
import { Timeline } from "antd";
import { useMediaQuery } from "@mui/material";

interface ItineraryProps {
  data: string;
}

const Itinerary = ({ data }: ItineraryProps) => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const isTablet = useMediaQuery("(max-width:960px)");

  const itineraryItems = data?.split(/\s*-\s*/).map((item, index) => ({
    children: item.trim(), // Trim whitespace from each item
    dot:
      index % 2 === 0 ? (
        <EnvironmentOutlined style={{ fontSize: isMobile ? "14px" : "16px" }} />
      ) : (
        <ClockCircleOutlined style={{ fontSize: isMobile ? "14px" : "16px" }} />
      ),
    color: index % 3 === 1 ? "green" : index % 3 === 2 ? "red" : undefined,
  }));

  return (
    <div className={`pt-${isMobile ? "5" : "10"}`} id="Itinerary">
      <Container className="bg-white rounded-xl">
        <div className={`py-${isMobile ? "5" : "10"}`}>
          <div className="grid grid-cols-12 gap-8">
            {/* Left Column - Title */}
            <div className="col-span-12 md:col-span-3">
              <div className="text-[32px] font-semibold text-[hsl(0,0%,20%)] font-roboto leading-[48px]">
                Itinerary
              </div>
            </div>

            {/* Right Column - Map and Timeline */}
            <div className="col-span-12 md:col-span-9">
              {/* Timeline */}
              <div>
                <Timeline
                  mode={isMobile ? "left" : "left"}
                  items={itineraryItems}
                  className="ml-4"
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Itinerary;
