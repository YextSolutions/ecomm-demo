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
import PageLayout from "../components/page-layout";

export const config: TemplateConfig = {
  name: "home",
};

export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  document,
}): HeadConfig => {
  const { name } = document;
  return {
    title: name,
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

  return (
    <>
      <PageLayout _site={_site}></PageLayout>
    </>
  );
};

export default Home;
