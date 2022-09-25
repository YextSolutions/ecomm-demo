import * as React from "react";
import "../index.css";
import {
  Template,
  GetPath,
  TemplateConfig,
  TemplateRenderProps,
  GetHeadConfig,
  HeadConfig,
  TemplateProps,
} from "@yext/pages";
import PageLayout from "../components/PageLayout";
import Site from "../types/Site";
import CoverPhotoHero from "../components/CoverPhotoHero";
import BeverageCarousel from "../components/BeverageCarousel";
import { v4 as uuid } from "uuid";

export const config: TemplateConfig = {
  name: "home",
};

export const getHeadConfig: GetHeadConfig<
  TemplateRenderProps
> = (): HeadConfig => {
  return {
    title: "Toast",
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
  };
};

export const getPath: GetPath<TemplateProps> = () => {
  return `index.html`;
};

const Home: Template<TemplateRenderProps> = ({
  document,
}: TemplateRenderProps) => {
  const { _site } = document;
  const site: Site = _site;

  return (
    <>
      <PageLayout
        header={false}
        containerCss="pt-0 h-screen max-w-none px-0 md:px-0 mx-0 "
      >
        <CoverPhotoHero coverPhotos={site.c_homePhotos ?? []} />
        <div className="mx-auto max-w-screen-xl px-5 pt-12 md:px-14">
          {site.c_featuredCollections &&
            site.c_featuredCollections.map((collection) => (
              <BeverageCarousel
                key={uuid()}
                title={collection.name}
                beverages={collection.c_associatedBeverages}
                limit={8}
                viewAllLink={collection.slug}
              />
            ))}
        </div>
      </PageLayout>
    </>
  );
};

export default Home;
