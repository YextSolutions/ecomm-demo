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
import PageLayout from "../components/PageLayout";
import SearchLayout from "../components/SearchLayout";
import BeverageCategory from "../types/beverage_categories";
import Site from "../types/Site";
import { ComplexImage } from "../types/beverages";

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
  const site: Site | undefined = beverageCategory._site;
  const coverPhoto: ComplexImage = site?.c_coverPhotos?.find(
    (photo) => beverageCategory.name === photo.name
  )?.photo;

  return (
    <PageLayout>
      <SearchLayout
        coverPhoto={coverPhoto}
        title={beverageCategory.name}
        categoryPhotos={beverageCategory.c_categoryPhotos}
      />
    </PageLayout>
  );
};

export default CategorySearch;
