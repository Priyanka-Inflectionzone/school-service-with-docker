/* eslint-disable linebreak-style */
import { BaseSearchFilters, BaseSearchResults } from "./miscellaneous/base.search.types";
import { integer } from "./miscellaneous/system.types";

//////////////////////////////////////////////////////////////////////////////////////////////////

export interface RoleCreateModel {
    RoleName     : string;
    Description  : string;

}

export interface RoleUpdateModel {
    RoleName     : string;
    Description?  : string;

}

export interface RoleDto {
    id            : integer,
    RoleName      : string;
    Description?  : string;

}

export interface RoleSearchFilters extends BaseSearchFilters {
    RoleName?     : string;
    Description?  : string;
}

export interface RoleSearchResults extends BaseSearchResults {
    Items: RoleDto[];
}

