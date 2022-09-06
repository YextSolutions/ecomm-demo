/* eslint-disable react/prop-types */
import * as React from "react";
import {
  Template,
  GetPath,
  TemplateRenderProps,
  GetHeadConfig,
  HeadConfig,
  TemplateProps,
  TemplateConfig,
} from "@yext/pages";
import "../index.css";
import PageLayout from "../components/PageLayout";
import SearchLayout from "../components/SearchLayout";
import { Matcher } from "@yext/search-headless-react";
import Site from "../types/Site";

export const config: TemplateConfig = {
  stream: {
    $id: "categoryFilterSearch",
    fields: [
      "name",
      "c_parentCategory.name",
      "c_parentCategory.slug",
      "c_subCategories.name",
      "c_subCategories.slug",
      "slug",
    ],
    filter: {
      savedFilterIds: ["1233320565"],
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

const FilterSearch: Template<TemplateRenderProps> = ({ document }) => {
  const { _site } = document;
  const site: Site = _site;
  // TODO: get correct photo
  const coverPhoto = site.c_coverPhotos?.find(
    (photo) => photo.name === "Home"
  )?.photo;
  // TODO: type
  const initialFilter = {
    fieldId: "c_beverageCategories.name",
    value: document.name,
    matcher: Matcher.Equals,
    selected: true,
  };

  return (
    <PageLayout>
      <SearchLayout
        coverPhoto={coverPhoto}
        initialFilter={initialFilter}
        title={document.name}
      />
    </PageLayout>
  );
};

export default FilterSearch;
