/* eslint-disable linebreak-style */
import { UUID } from "aws-sdk/clients/cloudtrail";
import { BaseSearchFilters, BaseSearchResults } from "../miscellaneous/base.search.types";
import { uuid } from "../miscellaneous/system.types";

export interface SubjectCreateModel {
    SubjectTeacherId  : UUID;
    SubjectName       : string;
   
}

export interface SubjectUpdateModel {
    SubjectTeacherId?  : UUID;
    SubjectName?       : string;
}

export interface SubjectDto {
    id                : uuid;
    SubjectTeacherId  : UUID;
    SubjectName       : string;
}

export interface SubjectSearchFilters extends BaseSearchFilters {
    SubjectTeacherId?  : UUID;
    SubjectName?       : string;
}

export interface SubjectSearchResults extends BaseSearchResults {
    Items: SubjectDto[];
}
