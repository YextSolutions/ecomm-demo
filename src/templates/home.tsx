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
<<<<<<< HEAD
import PageLayout from "../components/PageLayout";
import Site from "../types/Site";
import CategorySearchGrid from "../components/search/CategorySearchGrid";
=======
import PageLayout from "../components/page-layout";
import Site from "../types/Site";
import SearchLayout from "../components/SearchLayout";
>>>>>>> c30bded (home page)

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
const Home: Template<TemplateRenderProps> = ({ document }) => {
  const { _site } = document;
  const site: Site = _site;
<<<<<<< HEAD
  const coverPhoto = site.c_coverPhotos?.find(
    (photo) => photo.name === "Home"
  )?.photo;
=======
>>>>>>> c30bded (home page)

  return (
    <>
      <PageLayout>
<<<<<<< HEAD
        <CategorySearchGrid
          coverPhoto={coverPhoto}
=======
        <SearchLayout
          coverPhoto={site.c_coverPhoto}
>>>>>>> c30bded (home page)
          title={"Browse Categories"}
          categoryPhotos={site.c_categoryPhotos}
          categoryPhotoContainerCss={
            "md:flex md:justify-center md:space-x-8 grid grid-cols-2 justify-items-center gap-2"
          }
        />
      </PageLayout>
    </>
  );
};

export default Home;
