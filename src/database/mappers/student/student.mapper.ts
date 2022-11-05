/* eslint-disable key-spacing */
/* eslint-disable linebreak-style */
import {
    StudentDto
} from '../../../domain.types/student/student.domain.types';

///////////////////////////////////////////////////////////////////////////////////

export class StudentMapper {

    static toDto = (student: any): StudentDto => {
        if (student == null) {
            return null;
        }
        const dto: StudentDto = {
            id       : student.id,
            UserId   : student.UserId,
            ClassId  : student.ClassId,
            ParentId : student.ParentId

        };
        return dto;
    };

}
