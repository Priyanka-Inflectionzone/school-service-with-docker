/* eslint-disable key-spacing */
/* eslint-disable linebreak-style */
import {
    ClassDto
} from '../../../domain.types/class/class.domain.types';

///////////////////////////////////////////////////////////////////////////////////

export class ClassMapper {

    static toDto = (classes: any): ClassDto => {
        if (classes == null) {
            return null;
        }
        const dto: ClassDto = {
            id               : classes.id,
            ClassName        : classes.ClassName,
            ClassTeacherId   : classes.ClassTeacherId,
            NumberOfStudents : classes.NumberOfStudents

        };
        return dto;
    };

}
