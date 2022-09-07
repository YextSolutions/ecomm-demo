import * as React from "react";
import { v4 as uuid } from "uuid";
import { CategoryLink } from "../types/kg";

export interface BreadcrumbsProps {
  currentPage: string;
  links?: CategoryLink[];
}

const Breadcrumbs = ({ links, currentPage }: BreadcrumbsProps) => {
  return (
    <div className="py-2 text-sm">
      <span>
        <a className="text-dark-orange" href="/">
          Toast
        </a>
        {(currentPage || links) && <span className="px-2">/</span>}
      </span>
      {links?.map((link) => {
        return (
          <span key={uuid()}>
            <a className="text-dark-orange" href={link.slug}>
              {link.name}
            </a>
            <span className="px-2">/</span>
          </span>
        );
      })}
      {currentPage && <span>{currentPage}</span>}
    </div>
  );
};

export default Breadcrumbs;
