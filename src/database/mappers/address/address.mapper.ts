/* eslint-disable linebreak-style */
import {
    AddressDto
} from '../../../domain.types/address/address.domain.types';

///////////////////////////////////////////////////////////////////////////////////

export class AddressMapper {

    static toDto = (address: any): AddressDto => {
        if (address == null) {
            return null;
        }
        const dto: AddressDto = {
            id            : address.id,
            UserId        : address.UserId,
            StreetAddress : address.StreetAddress,
            City          : address.City,
            State         : address.State,
            Country       : address.Country,
            Pincode       : address.Pincode
        };
        return dto;
    };

}
