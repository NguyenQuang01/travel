import { Card, Row, Col, Typography, Space, Tag } from "antd";
import {
    CompassOutlined,
    TeamOutlined,
    IdcardOutlined,
    CarOutlined,
    FlagOutlined,
    EnvironmentOutlined,
} from "@ant-design/icons";
import { Container } from "@mui/material";

const Details = (props: any) => {
    const { data, themes, destinations, activities } = props;
    return (
      <div className="pt-10" id="Details">
        <Container className="bg-white rounded-xl px-4 sm:px-6">
          <div className="py-6 sm:py-10">
            <div className="grid grid-cols-12 gap-8">
              {/* Left Column - Title */}
              <div className="col-span-12 md:col-span-3">
                <div className="text-[32px] font-semibold text-[hsl(0,0%,20%)] font-roboto leading-[48px]">
                  Details
                </div>
              </div>

              {/* Right Column - Content */}
              <div className="col-span-12 md:col-span-9">
                {/* Top Row - Three Items */}
                <div className="grid grid-cols-3 gap-6 mb-8">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <CompassOutlined className="text-xl mt-1" />
                      <div>
                        <div className="text-gray-500 text-sm">
                          Itinerary focus
                        </div>
                        <div className="mt-1">{data.itineraryFocus}</div>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <TeamOutlined className="text-xl mt-1" />
                      <div>
                        <div className="text-gray-500 text-sm">Group size</div>
                        <div className="mt-1">
                          Group - max of {data.maxGroupSize} people
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <IdcardOutlined className="text-xl mt-1" />
                      <div>
                        <div className="text-gray-500 text-sm">Age range</div>
                        <div className="mt-1">
                          {data.ageRange || "6 years and up"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Flight and Cities Section */}
                <div className="border rounded-lg p-4">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="flex items-start gap-3">
                      <CarOutlined className="text-xl mt-1" />
                      <div>
                        <div className="text-gray-500 text-sm">
                          Flights and transport
                        </div>
                        <div className="mt-1">{data.flyAndTransport}</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-start gap-2">
                        <EnvironmentOutlined className="text-xl" />
                        <div>
                          <div className="text-gray-500 text-sm">
                            Start City
                          </div>
                          <div>{data.startCity}</div>
                        </div>
                      </div>

                      <div className="border-t border-gray-300 w-24 mx-4 mt-3"></div>

                      <div className="flex items-start gap-2">
                        <FlagOutlined className="text-xl" />
                        <div>
                          <div className="text-gray-500 text-sm">End City</div>
                          <div>{data.endCity}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tags Sections */}
                <div className="space-y-6 mt-8">
                  <div>
                    <div className="text-gray-700 font-medium mb-2">
                      Travel Themes
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {themes.map((theme: any) => (
                        <span
                          key={theme.themeId}
                          className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                        >
                          {theme.name}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="text-gray-700 font-medium mb-2">
                      Destinations
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {destinations.map((item: any) => (
                        <span
                          key={item.destination}
                          className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                        >
                          {item.destination}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="text-gray-700 font-medium mb-2">
                      Activities
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {activities.map((activity: any) => (
                        <span
                          key={activity.id}
                          className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                        >
                          {activity.activity}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    );
};

export default Details;
