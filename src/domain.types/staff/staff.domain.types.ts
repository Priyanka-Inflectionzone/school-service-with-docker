/* eslint-disable linebreak-style */
import { UUID } from "aws-sdk/clients/cloudtrail";
import { BaseSearchFilters, BaseSearchResults } from "../miscellaneous/base.search.types";
import { uuid } from "../miscellaneous/system.types";

export interface StaffCreateModel {
    UserId     : UUID;
    StaffType  : string;
    Salary     : string;
   
}

export interface StaffUpdateModel {
    StaffType?  : string;
    Salary?     : string;
}

export interface StaffDto {
    id         : uuid;
    UserId     : UUID;
    StaffType  : string;
    Salary     : string;
}

export interface StaffSearchFilters extends BaseSearchFilters {
    StaffType?  : string;
    Salary?     : string;
}

export interface StaffSearchResults extends BaseSearchResults {
    Items: StaffDto[];
}
