import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import ListingItem from "../components/ListingItem";

export default function Home() {
  const [offerLitings, setOfferListings] = useState([]);
  const [saleLitings, setSaleListings] = useState([]);
  const [rentLitings, setRentListings] = useState([]);
  SwiperCore.use([Navigation]);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch("/api/listing/get?offer=true&limit=4");
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error.message);
      }
    };

    const fetchRentListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=rent&limit=4");
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error.message);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=sale&limit=4");
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchOfferListings();
  }, []);
  return (
    <div>
      {/* Top */}
      <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
        <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl">
          Find your next <span className="text-slate-500">perfect</span> <br />
          place with ease
        </h1>
        <div className="text-gray-400 font-semibold text-xs sm:text-sm">
          CityHomes is the best place to find your dream house to live <br />
          We have a wide range of properties from different countries for you to
          choose from.
        </div>
        <Link
          to={"/search"}
          className="text-xs sm:text-sm text-blue-800 font-bold hover:underline"
        >
          Let's start now...
        </Link>
      </div>

      {/* Swipper */}
      <Swiper navigation>
        {offerLitings &&
          offerLitings.length > 0 &&
          offerLitings.map((listing) => (
            <SwiperSlide>
              <div
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                  backgroundSize: "cover",
                }}
                className="h-[500px]"
                key={listing._id}
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>

      {/* listing results for offer, sale and rent */}
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
        {offerLitings && offerLitings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-bold text-slate-600 ">
                Recent offers
              </h2>
              <Link
                className="text-sm font-semibold text-blue-800 hover:underline"
                to={"/search?offer=true"}
              >
                Show more offers
              </Link>
            </div>
            <div className="flex md:flex-row flex-col gap-4">
              {offerLitings.map((listing) => (
                <ListingItem listing={listing} key={listing._id}></ListingItem>
              ))}
            </div>
          </div>
        )}
        {rentLitings && rentLitings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-bold text-slate-600 ">
                Recent places for rent
              </h2>
              <Link
                className="text-sm font-semibold text-blue-800 hover:underline"
                to={"/search?type=rent"}
              >
                Show more places for rent
              </Link>
            </div>
            <div className="flex md:flex-row flex-col gap-4">
              {rentLitings.map((listing) => (
                <ListingItem listing={listing} key={listing._id}></ListingItem>
              ))}
            </div>
          </div>
        )}
        {saleLitings && saleLitings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-bold text-slate-600 ">
                Recent places for sale
              </h2>
              <Link
                className="text-sm font-semibold text-blue-800 hover:underline"
                to={"/search?type=sale"}
              >
                Show more places for sale
              </Link>
            </div>
            <div className="flex md:flex-row flex-col gap-4">
              {saleLitings.map((listing) => (
                <ListingItem listing={listing} key={listing._id}></ListingItem>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
