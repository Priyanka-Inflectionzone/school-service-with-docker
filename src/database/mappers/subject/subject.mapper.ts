/* eslint-disable linebreak-style */
import {
    SubjectDto
} from '../../../domain.types/subject/subject.domain.types';

///////////////////////////////////////////////////////////////////////////////////

export class SubjectMapper {

    static toDto = (subject: any): SubjectDto => {
        if (subject == null) {
            return null;
        }
        const dto: SubjectDto = {
            id               : subject.id,
            SubjectName      : subject.SubjectName,
            SubjectTeacherId : subject.SubjectTeacherId,

        };
        return dto;
    };

}
