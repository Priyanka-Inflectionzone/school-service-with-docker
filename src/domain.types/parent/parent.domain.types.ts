import { UUID } from "aws-sdk/clients/cloudtrail";
import { BaseSearchFilters, BaseSearchResults } from "../miscellaneous/base.search.types";
import { uuid } from "../miscellaneous/system.types";

export interface ParentCreateModel {
    UserId     : UUID;
}

export interface ParentDto {
    id         : uuid;
    UserId     : UUID;
}

export interface ParentSearchFilters extends BaseSearchFilters {
    UserId?     : UUID;
}

export interface ParentSearchResults extends BaseSearchResults {
    Items: ParentDto[];
}
