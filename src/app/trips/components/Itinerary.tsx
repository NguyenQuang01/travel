import { Container } from "@mui/material";
import { ClockCircleOutlined, EnvironmentOutlined } from "@ant-design/icons";
import { Timeline } from "antd";

const Itinerary = () => {
    return (
        <div className="pt-10" id="Itinerary">
            <Container className="bg-white rounded-xl ">
                <div className=" py-10">
                    <div className="text-[32px] font-semibold text-[hsl(0,0%,20%)] font-roboto leading-[48px] mr-4 mb-4">
                        Itinerary
                    </div>
                    <div className="ml-20">
                        <Timeline
                            mode="alternate"
                            items={[
                                {
                                    children:
                                        "Create a services site 2015-09-01",
                                    dot: (
                                        <EnvironmentOutlined
                                            style={{ fontSize: "16px" }}
                                        />
                                    ),
                                },
                                {
                                    children:
                                        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
                                    color: "green",
                                },
                                {
                                    dot: (
                                        <ClockCircleOutlined
                                            style={{ fontSize: "16px" }}
                                        />
                                    ),
                                    children: `Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.`,
                                },
                                {
                                    color: "red",
                                    children:
                                        "Network problems being solved 2015-09-01",
                                },
                                {
                                    children:
                                        "Create a services site 2015-09-01",
                                },
                                {
                                    dot: (
                                        <ClockCircleOutlined
                                            style={{ fontSize: "16px" }}
                                        />
                                    ),
                                    children: "Technical testing 2015-09-01",
                                },
                            ]}
                        />
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Itinerary;
