/* eslint-disable linebreak-style */
import {
    StaffDto
} from '../../../domain.types/staff/staff.domain.types';

///////////////////////////////////////////////////////////////////////////////////

export class StaffMapper {

    static toDto = (staff: any): StaffDto => {
        if (staff == null) {
            return null;
        }
        const dto: StaffDto = {
            id        : staff.id,
            UserId    : staff.UserId,
            StaffType : staff.StreetAddress,
            Salary    : staff.City,

        };
        return dto;
    };

}
