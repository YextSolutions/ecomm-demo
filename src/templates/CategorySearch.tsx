/* eslint-disable react/prop-types */
import * as React from "react";
import {
  Template,
  GetPath,
  TemplateConfig,
  TemplateRenderProps,
  GetHeadConfig,
  HeadConfig,
  TemplateProps,
} from "@yext/pages";
import "../index.css";
import PageLayout from "../components/page-layout";
import SearchLayout from "../components/SearchLayout";
import BeverageCategory from "../types/beverage_categories";

export const config: TemplateConfig = {
  stream: {
    $id: "categorySearch",
    fields: ["name", "c_categoryPhotos", "slug"],
    filter: {
      savedFilterIds: ["1232408134"],
    },
    localization: {
      locales: ["en"],
      primary: false,
    },
  },
};

export const getPath: GetPath<TemplateProps> = (props) => {
  return props.document.slug;
};

export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = (
  props
): HeadConfig => {
  return {
    title: props.document.name,
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
  };
};

const CategorySearch: Template<TemplateRenderProps> = (props) => {
  const { document } = props;
  const beverageCategory: BeverageCategory = document;

  return (
    <PageLayout>
      <SearchLayout
        // coverPhoto={site.c_coverPhoto}
        title={beverageCategory.name}
        categoryPhotos={beverageCategory.c_categoryPhotos}
      />
    </PageLayout>
  );
};

export default CategorySearch;
