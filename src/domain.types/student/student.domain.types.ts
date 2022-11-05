/* eslint-disable linebreak-style */
import { UUID } from "aws-sdk/clients/cloudtrail";
import { BaseSearchFilters, BaseSearchResults } from "../miscellaneous/base.search.types";
import { uuid } from "../miscellaneous/system.types";

export interface StudentCreateModel {
    UserId     : UUID;
    ClassId    : UUID;
    ParentId   : UUID;
}

export interface StudentUpdateModel {
    ClassId?    : UUID;
}

export interface StudentDto {
    id         : uuid;
    UserId     : UUID;
    ClassId    : UUID;
    ParentId   : UUID;
}

export interface StudentSearchFilters extends BaseSearchFilters {
    ClassId    : UUID;
    ParentId   : UUID;
}

export interface StudentSearchResults extends BaseSearchResults {
    Items: StudentDto[];
}
