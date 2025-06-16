import { Prisma } from "@prisma/client";

export * as PrismaModel from "@prisma/client";

// classes
export type getAllClassWithSectionType = Prisma.ClassModelGetPayload<{
  include: {
    SectionModel: true;
  };
}>;

export type getAllClassWithSectionNStudentType = Prisma.ClassModelGetPayload<{
  include: {
    SectionModel: true;
    students: true;
  };
}>;

export type getAllClassNSectionWithNullClassHeadType =
  Prisma.ClassModelGetPayload<{
    include: {
      SectionModel: true;
    };
  }>;

export type getClassModelWithSectionNStudentsType =
  Prisma.ClassModelGetPayload<{
    include: {
      students: true;
      SectionModel: true;
      TeacherModel: true;
    };
  }>;

// teacher
export type getAllTeachersType = Prisma.TeacherModelGetPayload<{}>;

export type getAllStudentsByClassIdType = Prisma.StudentModelGetPayload<{}>;

export type getAllStudentsType = Prisma.StudentModelGetPayload<{
  include: {
    ClassModel: {
      include: {
        SectionModel: true;
        students: true;
      };
    };
  };
}>;

// subject
export type getAllSubjectType = Prisma.SubjectModelGetPayload<{}>;

//teacher subject
export type getAllTeachersSubjectsByTeacherIdType =
  Prisma.TeacherSubjectsGetPayload<{
    include: {
      subject: true;
      subjectClass: {
        include: {
          SectionModel: true;
        };
      };
    };
  }>;

export type getAllTeachersWithClassNSectionType =
  Prisma.TeacherModelGetPayload<{
    include: {
      headClass: {
        include: {
          SectionModel: true;
        };
      };
      TeacherSubjects: true;
    };
  }>;

export type getAllTeachersSubjectsByClassNameType =
  Prisma.TeacherSubjectsGetPayload<{
    include: {
      subject: true;
    };
  }>;
