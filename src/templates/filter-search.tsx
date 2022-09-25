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
import SearchLayout from "../components/search/SearchLayout";
import { Matcher, SelectableStaticFilter } from "@yext/search-headless-react";
import Site from "../types/Site";
import { flattenCategoryAncestors } from "../util";
import { CategoryLink } from "../types/kg";

export const config: TemplateConfig = {
  stream: {
    $id: "categoryFilterSearch",
    fields: [
      "name",
      "c_parentCategory.name",
      "c_parentCategory.slug",
      "c_parentCategory.c_parentCategory.name",
      "c_parentCategory.c_parentCategory.slug",
      "c_subCategories.name",
      "c_subCategories.slug",
      "slug",
      "c_searchSlug",
    ],
    filter: {
      entityTypes: ["ce_beverageCategory"],
    },
    localization: {
      locales: ["en"],
      primary: false,
    },
  },
};

export const getPath: GetPath<TemplateProps> = (props) => {
  return props.document.c_searchSlug ?? props.document.slug;
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
  const initialFilter: SelectableStaticFilter = {
    selected: true,
    filter: {
      fieldId: "c_beverageCategories.name",
      value: document.name,
      matcher: Matcher.Equals,
      kind: "fieldValue",
    },
  };
  const links: CategoryLink[] | undefined = document.c_parentCategory?.[0]
    ? flattenCategoryAncestors(document.c_parentCategory[0])?.reverse()
    : undefined;

  return (
    <PageLayout>
      <SearchLayout
        coverPhoto={coverPhoto}
        initialFilter={initialFilter}
        title={document.name}
        breadcrumbs={{
          currentPage: document.name,
          links,
        }}
        categories={document.c_subCategories}
      />
    </PageLayout>
  );
};

export default FilterSearch;
