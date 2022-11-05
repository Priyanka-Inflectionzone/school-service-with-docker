/* eslint-disable linebreak-style */
import { UUID } from "aws-sdk/clients/cloudtrail";
import { BaseSearchFilters, BaseSearchResults } from "../miscellaneous/base.search.types";
import { uuid } from "../miscellaneous/system.types";

export interface ClassCreateModel {
    ClassTeacherId      : UUID;
    ClassName           : string;
    NumberOfStudents    : string;
   
}

export interface ClassUpdateModel {
    ClassTeacherId?      : UUID;
    ClassName?           : string;
    NumberOfStudents?    : string;
}

export interface ClassDto {
    id                  : uuid;
    ClassTeacherId      : UUID;
    ClassName           : string;
    NumberOfStudents    : string;
}

export interface ClassSearchFilters extends BaseSearchFilters {
    ClassTeacherId?      : UUID;
    ClassName?           : string;
    NumberOfStudents?    : string;
}

export interface ClassSearchResults extends BaseSearchResults {
    Items: ClassDto[];
}
