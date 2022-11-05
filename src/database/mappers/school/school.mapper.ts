/* eslint-disable linebreak-style */
import {
    SchoolDto
} from '../../../domain.types/school/school.domain.types';

///////////////////////////////////////////////////////////////////////////////////

export class SchoolMapper {

    static toDto = (school: any): SchoolDto => {
        if (school == null) {
            return null;
        }
        const dto: SchoolDto = {
            id         : school.id,
            SchoolName : school.SchoolName,
            Address    : school.Address
        };
        return dto;
    };

}
