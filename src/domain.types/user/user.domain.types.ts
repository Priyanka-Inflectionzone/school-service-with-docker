
import { BaseSearchFilters, BaseSearchResults } from "../miscellaneous/base.search.types";
import { Gender, integer, uuid } from "../miscellaneous/system.types";

export interface UserCreateModel {
    RoleId     : integer;
    SchoolId   : integer;
    UserName   : string;
    Prefix     : string;
    FirstName  : string;
    LastName   : string;
    Phone      : string;
    Email      : string;
    Gender     : Gender;
    BirthDate  : Date;
    Password   : string;
}

export interface UserUpdateModel {
    RoleId?     : integer;
    SchoolId?   : integer
    UserName?   : string;
    Prefix?     : string;
    FirstName?  : string;
    LastName?   : string;
    Phone?      : string;
    Email?      : string;
    Gender?     : Gender;
    BirthDate?  : Date;
}

export interface UserDto {
    id         : uuid;
    RoleId     : integer;
    SchoolId   : integer;
    UserName   : string;
    Prefix     : string;
    FirstName  : string;
    LastName   : string;
    Phone      : string;
    Email      : string;
    Gender     : Gender;
    BirthDate  : Date;
}

export interface UserSearchFilters extends BaseSearchFilters {
    RoleId?     : integer;
    SchoolId?   : integer;
    FirstName?  : string;
    LastName?   : string;
    Gender?      : string;
    Email?      : string;
}

export interface UserSearchResults extends BaseSearchResults {
    Items: UserDto[];
}
