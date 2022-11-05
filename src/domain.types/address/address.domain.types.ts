/* eslint-disable linebreak-style */
import { UUID } from "aws-sdk/clients/cloudtrail";
import { BaseSearchFilters, BaseSearchResults } from "../miscellaneous/base.search.types";
import { uuid } from "../miscellaneous/system.types";

export interface AddressCreateModel {
    UserId         : UUID;
    StreetAddress  : string;
    City           : string;
    State          : string;
    Country        : string;
    Pincode        : string;
}

export interface AddressUpdateModel {
  
    StreetAddress?  : string;
    City?           : string;
    State?          : string;
    Country?        : string;
    Pincode?        : string;
}

export interface AddressDto {
    id             : uuid;
    UserId         : uuid;
    StreetAddress  : string;
    City           : string;
    State          : string;
    Country        : string;
    Pincode        : string;
}

export interface AddressSearchFilters extends BaseSearchFilters {
    City?           : string;
    State?          : string;
    Country?        : string;
    Pincode?        : string;
}

export interface AddressSearchResults extends BaseSearchResults {
    Items: AddressDto[];
}
