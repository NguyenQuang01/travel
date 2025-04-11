import Image from "next/image";
import logo from "@/app/assets/imgs/TODITOUR-02.png";

export default function Footer() {
  return (
    <footer className="bg-[#dcdcdc99] text-gray-700 pb-10 mt-0">
      <div className="container mx-auto px-6 md:px-12 pt-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Logo & Description */}
          <div>
            <Image
              src={logo}
              alt="Logo"
              width={201}
              height={44}
              priority={true}
              className="w-auto h-[42px]"
              loading="eager"
            />
            <p className="mt-4 text-sm text-gray-600">
              Travelstride helps you search and compare 50,000+ expert-planned
              trips from 1,000+ companies. Get the real picture with both
              traveler and expert reviews.
            </p>
          </div>

          {/* Travelstride Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Travelstride
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-gray-600">
              <li>About Travelstride</li>
              <li>Why Travelstride</li>
              <li>Member Benefits</li>
              <li>Press</li>
              <li>Travel Expert</li>
              <li>Blog</li>
              <li>Why Group Tours</li>
              <li>Travelstride Gives Back</li>
            </ul>
          </div>

          {/* Connect Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Connect</h3>
            <ul className="mt-4 space-y-2 text-sm text-gray-600">
              <li>Join the Community</li>
              <li>Write a Review</li>
              <li>Tour Operators</li>
              <li>Careers</li>
              <li>FAQs & Help</li>
              <li>Blog</li>
              <li>Contact</li>
              <li>Affiliate Program</li>
            </ul>
          </div>
        </div>

        {/* Featured By */}
        <div className="mt-10 border-t pt-6 text-center">
          <h3 className="text-sm font-semibold text-gray-700">
            Tours & Operators on Travelstride Awarded and Featured by:
          </h3>
          <div className="flex justify-center gap-6 mt-4">
            {/* <img
                            src="https://upload.wikimedia.org/wikipedia/commons/3/30/National_Geographic_logo.svg"
                            alt="National Geographic"
                            className="h-6"
                        />
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/e/ef/Cond%C3%A9_Nast_Traveler_logo.svg"
                            alt="Traveler"
                            className="h-6"
                        />
                        <img
                            src="https://upload.wikimedia.org/wikipedia/en/thumb/2/23/Travel_%2B_Leisure_logo.svg/1200px-Travel_%2B_Leisure_logo.svg.png"
                            alt="Travel Leisure"
                            className="h-6"
                        />
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/The_New_York_Times_logo_variation.jpg/640px-The_New_York_Times_logo_variation.jpg"
                            alt="New York Times"
                            className="h-6"
                        /> */}
          </div>
        </div>

        {/* Social Icons */}
        <div className="mt-6 flex justify-center space-x-6">
          <i className="fab fa-facebook text-2xl text-gray-600 hover:text-gray-900"></i>
          <i className="fab fa-pinterest text-2xl text-gray-600 hover:text-gray-900"></i>
          <i className="fab fa-twitter text-2xl text-gray-600 hover:text-gray-900"></i>
          <i className="fab fa-instagram text-2xl text-gray-600 hover:text-gray-900"></i>
        </div>
      </div>
    </footer>
  );
}
