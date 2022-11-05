/* eslint-disable linebreak-style */
import {
    ParentDto
} from '../../../domain.types/parent/parent.domain.types';

///////////////////////////////////////////////////////////////////////////////////

export class ParentMapper {

    static toDto = (parent: any): ParentDto => {
        if (parent == null) {
            return null;
        }
        const dto: ParentDto = {
            id     : parent.id,
            UserId : parent.UserId
        };
        return dto;
    };

}

