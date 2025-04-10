"use client";
import StepsComponent from "@/app/components/Steps";
import useStore from "@/store/useStore";
import { Container } from "@mui/material";
import { Button, Checkbox, Col, Input, Row, message } from "antd";
import Image from "next/image";
import { postFinish } from "../hook";
import ButtonPrev from "@/app/components/ButtonPrev";
import MyTripSummary from "@/app/components/MyTripSummary";
const { TextArea } = Input;
const BudgetForm = () => {
    const { tripData, setTripData } = useStore();
    const [messageApi, contextHolder] = message.useMessage();

    const success = () => {
        messageApi.open({
            type: "success",
            content: "We will contact you soon",
        });
    };
    const errorAnt = () => {
        messageApi.open({
            type: "error",
            content: "Lỗi hệ thống",
        });
    };
    const handelFinish = async () => {
        try {
            const res: any = await postFinish(tripData);
            if (res?.data?.status && res?.data?.status !== 200) {
                errorAnt();
                return;
            }
            success();
        } catch (error) {
            errorAnt();
            console.log(error);
        }
    };
    return (
      <Container className="my-10">
        {" "}
        <StepsComponent />
        {contextHolder}
        <Row gutter={[16, 16]} className="mt-10">
          <Col xs={24} md={24} lg={16}>
            <div className="flex items-start p-4 md:p-6 bg-white rounded-2xl shadow-lg mt-10 flex-col ">
              <div className="hidden">
                {tripData.budgetStrictness}
                {tripData.description}
              </div>
              <div className="flex flex-col md:flex-row items-start">
                <Image
                  src="https://images.pexels.com/photos/19479799/pexels-photo-19479799/free-photo-of-canh-tay-dan-ba-hoa-d-ng.jpeg?auto=compress&cs=tinysrgb&w=1200&lazy=load"
                  alt="img"
                  width={200}
                  height={200}
                  priority={true}
                  loading="eager"
                  className="w-[40px] md:w-[80px] h-[40px] md:h-[80px] object-cover rounded-full mb-4 md:mb-0 md:mr-5"
                />
                <div className="flex-1">
                  <h2 className="text-xl md:text-2xl font-bold">
                    What is your budget per person?
                  </h2>
                  <p className="text-gray-600 mt-2 text-sm md:text-base">
                    Good trip planners work hard to organize your trip, and
                    their services are in high demand...
                  </p>
                  <div className="mt-4 flex flex-col md:flex-row gap-4">
                    <select
                      value={tripData.budgetPerPerson}
                      onChange={(e) =>
                        setTripData({
                          budgetPerPerson: Number(e.target.value),
                        })
                      }
                      className="border p-2 rounded w-full md:w-1/2"
                    >
                      <option value="0">0</option>
                      <option value="1000">1,000</option>
                      <option value="1500">1,500</option>
                      <option value="2000">2,000</option>
                      <option value="2500">2,500</option>
                      <option value="3000">3,000</option>
                      <option value="3500">3,500</option>
                      <option value="4000">4,000</option>
                      <option value="4500">4,500</option>
                      <option value="5000">5,000</option>
                      <option value="5500">5,500</option>
                      <option value="6000">6,000+</option>
                    </select>
                    <select
                      value={tripData.currency}
                      onChange={(e) =>
                        setTripData({
                          currency: e.target.value,
                        })
                      }
                      className="border p-2 rounded w-full md:w-1/2"
                    >
                      <option value="USD">US Dollars</option>
                      <option value="AUD">Australian Dollars</option>
                      <option value="EUR">Euros</option>
                    </select>
                  </div>
                  <h3 className="text-lg font-semibold mt-6">
                    How strict is this budget?
                  </h3>
                  <div className="space-y-4 mt-2">
                    <label className="flex items-start space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="budget-flexibility"
                        value="flexible"
                        checked={tripData.budgetStrictness === "flexible"}
                        onChange={() =>
                          setTripData({
                            budgetStrictness: "flexible",
                          })
                        }
                        className="w-5 h-5 mt-1 text-green-600 accent-green-600"
                      />
                      <span className="font-medium text-sm md:text-base">
                        It's just an estimate, I'm flexible depending on what's
                        included in my trip and how much things cost in my
                        chosen destination(s)
                      </span>
                    </label>
                    <label className="flex items-start space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="budget-flexibility"
                        value="somewhat_flexible"
                        checked={
                          tripData.budgetStrictness === "somewhat_flexible"
                        }
                        onChange={() =>
                          setTripData({
                            budgetStrictness: "somewhat_flexible",
                          })
                        }
                        className="w-5 h-5 mt-1 text-green-600 accent-green-600"
                      />
                      <span className="font-medium text-sm md:text-base">
                        My budget is somewhat flexible
                      </span>
                    </label>
                    <label className="flex items-start space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="budget-flexibility"
                        value="strict"
                        checked={tripData.budgetStrictness === "strict"}
                        onChange={() =>
                          setTripData({
                            budgetStrictness: "strict",
                          })
                        }
                        className="w-5 h-5 mt-1 text-green-600 accent-green-600"
                      />
                      <span className="font-medium text-sm md:text-base">
                        This is my absolute maximum budget
                      </span>
                    </label>
                  </div>
                  <div className="mt-6 space-y-3 text-sm md:text-base">
                    <p className="text-gray-500 leading-6">
                      <span className="font-bold">
                        The budget usually includes
                      </span>{" "}
                      lodging, any guided tours and excursions, transfers,
                      transportation, and some meals such as breakfast.
                    </p>
                    <p className="text-gray-500 leading-6">
                      <span className="font-bold">
                        The budget usually does not include
                      </span>{" "}
                      international flights and most meals.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-start mt-10 w-full">
                <Image
                  src="https://images.pexels.com/photos/19479799/pexels-photo-19479799/free-photo-of-canh-tay-dan-ba-hoa-d-ng.jpeg?auto=compress&cs=tinysrgb&w=1200&lazy=load"
                  alt="img"
                  width={200}
                  height={200}
                  priority={true}
                  loading="eager"
                  className="w-[40px] md:w-[80px] h-[40px] md:h-[80px] object-cover rounded-full mb-4 md:mb-0 md:mr-5"
                />

                <div className="flex-1 w-full">
                  <h2 className="text-xl md:text-2xl font-bold">
                    Tell us more about what you want to do.
                  </h2>
                  <p className="text-gray-600 mt-2 text-sm md:text-base">
                    (Optional) Your Dream Trip Details! 🌟
                  </p>

                  <div className="mt-4 w-full">
                    <TextArea
                      rows={4}
                      className="w-full"
                      defaultValue={tripData.description}
                      onChange={(e) =>
                        setTripData({
                          description: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-start mt-10 w-full">
                <Image
                  src="https://images.pexels.com/photos/19479799/pexels-photo-19479799/free-photo-of-canh-tay-dan-ba-hoa-d-ng.jpeg?auto=compress&cs=tinysrgb&w=1200&lazy=load"
                  alt="img"
                  width={200}
                  height={200}
                  priority={true}
                  loading="eager"
                  className="w-[40px] md:w-[80px] h-[40px] md:h-[80px] object-cover rounded-full mb-4 md:mb-0 md:mr-5"
                />

                <div className="flex-1 w-full">
                  <h2 className="text-xl md:text-2xl font-bold">
                    How should we contact you?
                  </h2>
                  <p className="text-gray-600 mt-2 text-sm md:text-base">
                    We need your contact information to send your saved trip
                    request and communicate with you during the process. There's
                    no charge to start planning.
                  </p>

                  <div className="mt-4 w-full">
                    <Row gutter={[16, 16]}>
                      <Col xs={24} sm={12}>
                        <Input
                          placeholder="First Name"
                          size="large"
                          value={tripData.firstName}
                          onChange={(e) =>
                            setTripData({
                              firstName: e.target.value,
                            })
                          }
                        />
                      </Col>
                      <Col xs={24} sm={12}>
                        <Input
                          placeholder="Last Name"
                          size="large"
                          value={tripData.lastName}
                          onChange={(e) =>
                            setTripData({
                              lastName: e.target.value,
                            })
                          }
                        />
                      </Col>
                      <Col xs={24} sm={12}>
                        <Input
                          placeholder="Email address"
                          size="large"
                          value={tripData.email}
                          onChange={(e) =>
                            setTripData({
                              email: e.target.value,
                            })
                          }
                        />
                      </Col>
                      <Col xs={24} sm={12}>
                        <Input
                          placeholder="Number Phone"
                          size="large"
                          value={tripData.phoneNumber}
                          onChange={(e) =>
                            setTripData({
                              phoneNumber: e.target.value,
                            })
                          }
                        />
                      </Col>
                    </Row>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
                      <Checkbox.Group
                        style={{ width: "100%" }}
                        onChange={(value) =>
                          setTripData({
                            contactMethod: value.join(", "),
                          })
                        }
                        value={tripData.contactMethod.split(", ")}
                      >
                        {["Email", "Call Me", "Text Me", "WhatsApp"].map(
                          (contact) => (
                            <div
                              key={contact}
                              className="border-gray-300 rounded-lg border p-2 px-4 mb-2"
                            >
                              <Checkbox value={contact}>{contact}</Checkbox>
                            </div>
                          )
                        )}
                      </Checkbox.Group>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row justify-between items-center mt-6 w-full gap-4">
                <ButtonPrev url="/client/my-custom-trip/home" />
                <Button
                  type="primary"
                  size="large"
                  style={{ backgroundColor: "#16a34a" }}
                  className="hover:!bg-green-700 w-full sm:w-auto"
                  onClick={handelFinish}
                >
                  Finish
                </Button>
              </div>
            </div>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <MyTripSummary />
          </Col>
        </Row>
      </Container>
    );
};

export default BudgetForm;
