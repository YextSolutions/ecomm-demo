/* eslint-disable react/prop-types */
import * as React from "react";
import {
  Template,
  GetPath,
  TemplateRenderProps,
  GetHeadConfig,
  HeadConfig,
  TemplateProps,
} from "@yext/pages";
import "../index.css";
import PageLayout from "../components/PageLayout";
import SearchLayout from "../components/search/SearchLayout";

export const getPath: GetPath<TemplateProps> = (props) => {
  return "/search";
};

export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = (
  props
): HeadConfig => {
  return {
    title: `Toast | Search`,
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
  };
};

const Search: Template<TemplateRenderProps> = ({ document }) => {
  return (
    <PageLayout excludedFieldIds={["f_c_soldAt.address.line1"]}>
      <SearchLayout
        categories={[
          { name: "Beer", slug: "/beer" },
          { name: "Wine", slug: "/wine" },
          { name: "Liquor", slug: "/liquor" },
        ]}
      />
    </PageLayout>
  );
};

export default Search;
