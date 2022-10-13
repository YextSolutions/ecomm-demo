import {
  GetHeadConfig,
  GetPath,
  HeadConfig,
  Template,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
} from "@yext/pages";
import * as React from "react";
import PageLayout from "../components/PageLayout";
import "../index.css";
import StaticMap from "../components/map/StaticMap";
import { ComplexImageType } from "@yext/pages/components";
import { Image } from "@yext/pages/components";
import Location, { Coordinate, Day } from "../types/locations";
import Hours, { sortByDay } from "../components/Hours";
import Breadcrumbs from "../components/Breadcrumbs";

export const config: TemplateConfig = {
  stream: {
    $id: "locations",
    fields: [
      "id",
      "name",
      "address",
      "yextDisplayCoordinate",
      "photoGallery",
      "hours",
      "emails",
      "mainPhone",
      "description",
    ],
    filter: {
      entityTypes: ["location"],
    },
    localization: {
      locales: ["en"],
      primary: false,
    },
  },
};

export const getPath: GetPath<TemplateProps> = ({ document }) => {
  return document.slug ? document.slug : document.id.toString();
};

export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  document,
}): HeadConfig => {
  return {
    title: `Toast | ${document.name}`,
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    tags: [
      {
        type: "meta",
        attributes: {
          description: document.description,
        },
      },
    ],
  };
};

// get link to google maps from coordinates
function getGoogleMapsLink(coordinates: Coordinate) {
  return `https://www.google.com/maps/search/?api=1&query=${coordinates.latitude},${coordinates.longitude}`;
}

const LocationTemplate: Template<TemplateRenderProps> = ({
  document,
}: TemplateRenderProps) => {
  const {
    name,
    yextDisplayCoordinate,
    address,
    photoGallery,
    hours,
    mainPhone,
    emails,
    description,
  } = document as Location;

  const coverPhoto: ComplexImageType | undefined = photoGallery?.[0];

  const renderCurrentStatus = () => {
    if (hours) {
      const today = new Date();
      const hour = today.getHours();
      const minute = today.getMinutes();
      const time = hour + minute / 60;

      const week = sortByDay(hours);
      const todayHours: Day = Object.values(week)[0];

      const open = getNumberFromTime(todayHours.openIntervals[0].start);
      const close = getNumberFromTime(todayHours.openIntervals[0]?.end);

      if (open && close) {
        if (time >= open && time < close) {
          return (
            <p className="flex items-center">
              <span className="font-bold">Open </span>
              <span className="mx-3 inline-block h-2 w-2 rounded-full bg-black"></span>
              <span>Closes at {getTimeFromNumber(close)}</span>
            </p>
          );
        } else {
          return (
            <p className="flex items-baseline">
              <span className="font-bold">Closed </span>
              <span className="mx-3 inline-block h-2 w-2 rounded-full bg-black"></span>
              <span>Opens at {getTimeFromNumber(open)}:00</span>
            </p>
          );
        }
      }
    }

    return <></>;
  };

  // get number from 24 hour time
  const getNumberFromTime = (time: string) => {
    const [hour, minute] = time.split(":");
    return parseInt(hour) + parseInt(minute) / 60;
  };

  // get 12 hour time with AM/PM from number
  const getTimeFromNumber = (time: number) => {
    const hour = Math.floor(time);
    const minute = Math.round((time - hour) * 60);
    const minuteString = minute < 10 ? `0${minute}` : minute.toString();
    const ampm = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minuteString} ${ampm}`;
  };

  // remove country code from phone number, surround area code with parentheses and put hyphen between prefix and line number
  const formatPhoneNumber = (phoneNumber: string) => {
    const phone = phoneNumber.replace("+1", "");
    const areaCode = phone.slice(0, 3);
    const prefix = phone.slice(3, 6);
    const lineNumber = phone.slice(6, 10);
    return `(${areaCode}) ${prefix}-${lineNumber}`;
  };

  return (
    <>
      <PageLayout>
        <div className="py-4">
          <Breadcrumbs
            currentPage={address.line1}
            links={[{ name: "Locations", slug: "/locations" }]}
          />
        </div>
        <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2">
          <a href="/">
            {coverPhoto && (
              <Image className="min-h-[400px]" image={coverPhoto} />
            )}
          </a>
          <div className="div flex flex-col py-2 md:py-8">
            <div className="mb-4 ">
              <div className="">{name}</div>
              <p className="text-3xl font-bold text-dark-orange">
                {address.line1}
              </p>
            </div>
            <div className="mb-4">
              <p className="">{address.line1}</p>
              <p className="font-bold text-black">
                {address.city}, {address.region}, {address.postalCode}{" "}
              </p>
            </div>
            <p>{renderCurrentStatus()}</p>
            <div className="mt-auto flex gap-4 py-4">
              <a
                href={getGoogleMapsLink(yextDisplayCoordinate)}
                target="_blank"
                rel="noreferrer"
              >
                <div className=" rounded-md border border-dark-orange px-4 py-2 text-dark-orange hover:bg-dark-orange hover:text-white">
                  Get Directions
                </div>
              </a>
              <a href="/locations">
                <div className=" rounded-md border border-dark-orange px-4 py-2 text-dark-orange hover:bg-dark-orange hover:text-white">
                  Find Another Location
                </div>
              </a>
            </div>
          </div>
          <Hours title="Hours of Operation" hours={hours} />
          <div className="flex flex-col bg-light-orange p-2 ">
            <div className="mb-4 text-xl font-semibold">Store Details</div>
            <div>
              <p className="">{address.line1}</p>
              <p className="font-bold text-black">
                {address.city}, {address.region}, {address.postalCode}{" "}
              </p>
            </div>
            {/* TODO: stream data from KG */}
            {mainPhone && (
              <p className="pt-2">{formatPhoneNumber(mainPhone)}</p>
            )}
            <p className="pt-2">{emails?.[0]}</p>
          </div>
          <div>
            {yextDisplayCoordinate && (
              <StaticMap
                longitude={yextDisplayCoordinate.longitude}
                latitude={yextDisplayCoordinate.latitude}
              />
            )}
          </div>
          <div className="flex flex-col bg-light-orange p-2 ">
            <div className="mb-4 text-xl font-semibold">About Toast</div>
            <p>{description}</p>
          </div>
        </div>
      </PageLayout>
    </>
  );
};

export default LocationTemplate;
