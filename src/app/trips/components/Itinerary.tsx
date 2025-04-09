import { Container } from "@mui/material";
import { ClockCircleOutlined, EnvironmentOutlined } from "@ant-design/icons";
import { Timeline } from "antd";

interface ItineraryProps {
    data: string;
}

const Itinerary = ({ data }: ItineraryProps) => {
    const itineraryItems = data?.split(/\s*-\s*/).map((item, index) => ({
      children: item.trim(), // Trim whitespace from each item
      dot:
        index % 2 === 0 ? (
          <EnvironmentOutlined style={{ fontSize: "16px" }} />
        ) : (
          <ClockCircleOutlined style={{ fontSize: "16px" }} />
        ),
      color: index % 3 === 1 ? "green" : index % 3 === 2 ? "red" : undefined,
    }));
    return (
        <div className="pt-10" id="Itinerary">
            <Container className="bg-white rounded-xl ">
                <div className=" py-10">
                    <div className="text-[32px] font-semibold text-[hsl(0,0%,20%)] font-roboto leading-[48px] mr-4 mb-4">
                        Itinerary
                    </div>
                    <div className="ml-20">
                        <Timeline mode="alternate" items={itineraryItems} />
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Itinerary;
