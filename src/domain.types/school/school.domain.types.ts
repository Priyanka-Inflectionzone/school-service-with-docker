/* eslint-disable linebreak-style */
import { UUID } from "aws-sdk/clients/cloudtrail";
import { BaseSearchFilters, BaseSearchResults } from "../miscellaneous/base.search.types";
import { Gender, integer, uuid } from "../miscellaneous/system.types";

export interface SchoolCreateModel {
    SchoolName  : string;
    Address     : string;
}

export interface SchoolUpdateModel {
  
    SchoolName?  : string;
    Address?     : string;
}

export interface SchoolDto {
    id          : integer;
    SchoolName  : string;
    Address     : string;
}

export interface SchoolSearchFilters extends BaseSearchFilters {
    SchoolName?  : string;
    Address?     : string;
}

export interface SchoolSearchResults extends BaseSearchResults {
    Items: SchoolDto[];
}
