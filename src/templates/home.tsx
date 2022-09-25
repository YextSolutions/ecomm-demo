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
import { CategorySearchGrid } from "../components/search/CategorySearchGrid";

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

/**
 * Defines the path that the generated file will live at for production.
 *
 * NOTE: This currently has no impact on the local dev path. Local dev urls currently
 * take on the form: featureName/entityId
 */
export const getPath: GetPath<TemplateProps> = () => {
  return `index.html`;
};

/**
 * This is the main template. It can have any name as long as it's the default export.
 * The props passed in here are the direct result from `getStaticProps`.
 */
const Home: Template<TemplateRenderProps> = ({
  document,
}: TemplateRenderProps) => {
  const { _site } = document;
  const site: Site = _site;

  React.useEffect(() => {
    console.log("site", site);
  }, []);

  return (
    <>
      <PageLayout
        header={false}
        containerCss="pt-0 h-screen max-w-none px-0 md:px-0 mx-0 "
      >
        <CoverPhotoHero coverPhotos={site.c_homePhotos ?? []} />
        <div className=" bg-light-orange py-8 px-8">
          <CategorySearchGrid
            title={"Browse Categories"}
            categoryPhotos={site.c_categoryPhotos}
            categoryPhotoContainerCss={
              "grid grid-cols-1 sm:grid-cols-2 justify-items-center gap-2 "
            }
          />
        </div>
      </PageLayout>
    </>
  );
};

export default Home;
