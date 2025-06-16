"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../lib/prisma";
import { AccType } from "@/app/students/page";

// class Model
export async function getTotalClassModelCount() {
  return await prisma.classModel.count();
}

export async function createNewClass(formData: FormData) {
  const className = formData.get("selectedClass") as string;
  const sectionName = formData.get("selectedSection") as string;
  try {
    if (!className) {
      throw new Error("select class");
    } else if (!sectionName) {
      throw new Error("select class");
    }
    const a = await prisma.classModel.create({
      data: {
        name: className,
        SectionModel: {
          create: {
            name: sectionName,
          },
        },
      },
      include: {
        SectionModel: true,
      },
    });
    return `Class ${a.name}${a.SectionModel?.name} ${" "} Added!!`;
  } catch (e: any) {
    return "failed!!";
  } finally {
    revalidatePath("/");
  }
}

export async function getAllClassWithSection() {
  return await prisma.classModel.findMany({
    include: {
      SectionModel: true,
    },
  });
}

export async function getAllClassWithSectionNStudent() {
  return await prisma.classModel.findMany({
    include: {
      SectionModel: true,
      students: true,
    },
  });
}

export async function getAllClassNSectionWithNullClassHead() {
  return await prisma.classModel.findMany({
    where: {
      TeacherModel: null,
    },
    include: {
      SectionModel: true,
    },
  });
}

export async function getClassModelWithSectionNStudents() {
  return await prisma.classModel.findMany({
    include: {
      students: true,
      SectionModel: true,
      TeacherModel: true,
    },
  });
}

export async function removeClassWithSection(formData: FormData) {
  const classId = formData.get("selectedClassId") as string;
  try {
    if (!classId) {
      throw new Error("Please, Select Class");
    }
    await prisma.classModel.delete({
      where: {
        id: classId,
      },
    });

    return "Deleted !!!";
  } catch {
    return "Error !!";
  } finally {
    revalidatePath("/");
  }
}

// teacher model
export async function getTotalteacherModelCount() {
  return await prisma.teacherModel.count();
}

export async function createNewTeacher(formData: FormData) {
  const firstName = formData.get("teacherFirstName") as string;
  const lastName = formData.get("teacherLastName") as string;

  try {
    if (!firstName) {
      throw new Error("first name");
    } else if (!lastName) {
      throw new Error("last name");
    }
    const a = await prisma.teacherModel.create({
      data: {
        firstName: firstName.toLocaleLowerCase(),
        lastName: lastName.toLocaleLowerCase(),
      },
    });
    return `Mr./Mrs ${a.firstName.toLocaleUpperCase()} ${a.lastName.toLocaleUpperCase()} Added!!`;
  } catch (e: any) {
    return "failed";
  } finally {
    revalidatePath("/");
  }
}
// get all teacts with null class id
export async function getAllTeachers() {
  return await prisma.teacherModel.findMany({
    where: {
      classModelId: null,
    },
  });
}

//get all teachers
export async function getAllTeacher() {
  return await prisma.teacherModel.findMany({});
}

export async function getAllTeachersWithClassNSection() {
  const a = await prisma.teacherModel.findMany({
    include: {
      headClass: {
        include: {
          SectionModel: true,
        },
      },
      TeacherSubjects: true,
    },
    orderBy: [{ firstName: "asc" }, { lastName: "asc" }],
  });
  return a;
}

// remove teacher from db
export async function removeTeacher(formData: FormData, pathName: string) {
  const teacherId = formData.get("selectedTeacherId") as string;
  try {
    if (!teacherId) {
      throw new Error("Please, Select Teacher");
    }
    const a = await prisma.teacherModel.delete({
      where: {
        id: teacherId,
      },
    });

    return "Deleted !!!";
  } catch {
    return "Error !!";
  } finally {
    if (pathName == "/teachers") {
      revalidatePath("/teachers");
    }
    revalidatePath("/");
  }
}

export async function assignClassHead(formData: FormData) {
  const teacherId = formData.get("selectedTeacherId") as string;
  const classId = formData.get("selectedClassId") as string;
  try {
    if (!teacherId) {
      throw new Error("teacherId");
    } else if (!classId) {
      throw new Error("classId");
    }
    await prisma.teacherModel.update({
      where: {
        id: teacherId,
      },
      data: {
        classModelId: classId,
      },
    });
    return "Success !!";
  } catch {
    return "failed";
  } finally {
    revalidatePath("/classes");
  }
}

export async function removeClassHead(classId: string) {
  try {
    if (!classId) {
      throw new Error("teacherId Error");
    }
    await prisma.teacherModel.update({
      where: {
        classModelId: classId,
      },
      data: {
        classModelId: null,
      },
    });
  } catch {
  } finally {
    revalidatePath("/classes");
  }
}

// student model
export async function getTotalStudentModelCount() {
  return prisma.studentModel.count();
}

export async function createNewStudent(formData: FormData) {
  const firstName = formData.get("studentFirstName") as string;
  const lastName = formData.get("studentLastName") as string;
  const classId = formData.get("studentClassId") as string;

  try {
    if (!firstName) {
      throw new Error("firstname error");
    } else if (!lastName) {
      throw new Error("lastname error");
    } else if (!classId) {
      throw new Error("lastname error");
    }

    const a = await prisma.studentModel.create({
      data: {
        firstName: firstName.toLowerCase(),
        lastName: lastName.toLowerCase(),
        classModelId: classId,
      },
    });
    return "success!!";
  } catch {
    return "failed!!";
  } finally {
    revalidatePath("/students");
  }
}

export async function getAllStudents() {
  return await prisma.studentModel.findMany({
    include: {
      ClassModel: {
        include: {
          SectionModel: true,
          students: true,
        },
      },
    },
  });
}

export async function getAllStudent() {
  return await prisma.studentModel.findMany({});
}

export async function getAllStudentsByClassId(classId: string) {
  return await prisma.studentModel.findMany({
    where: {
      classModelId: classId,
    },
  });
}

export async function removeStudentOfClass(studentId: string | null) {
  try {
    console.log(studentId);
    if (!studentId) {
      throw new Error("select Student");
    }
    await prisma.studentModel.delete({
      where: {
        id: studentId,
      },
    });
    return "Success";
  } catch {
    return "Failed 11";
  } finally {
    revalidatePath("/students");
  }
}

export async function removeStudentById(formData: FormData) {
  const studentId = formData.get("selectedStudentId") as string;
  try {
    if (!studentId) {
      throw new Error("select student");
    }
    await prisma.studentModel.delete({
      where: {
        id: studentId,
      },
    });
    return "success";
  } catch {
    return "failed";
  } finally {
    revalidatePath("/");
  }
}

// Subject Model

//create new subject from Main DashBoard
export async function createNewSubject(formData: FormData) {
  const subjectName = formData.get("subjectName") as string;
  const subjectCode = formData.get("subjectCode") as string;
  const subjectClass = formData.get("subjectClass") as string;
  try {
    if (!subjectName) {
      throw new Error("subject Name");
    } else if (!subjectCode) {
      throw new Error("subject subjectCode");
    } else if (!subjectClass) {
      throw new Error("subject subjectClass");
    }
    await prisma.subjectModel.create({
      data: {
        subjectClass: subjectClass,
        subjectCode: subjectCode,
        subjectName: subjectName,
      },
    });
    return "success";
  } catch {
    return "failed";
  } finally {
    revalidatePath("/");
  }
}
// create new subject from /subject
export async function createNewSubjectFromSD(formData: FormData) {
  const subjectName = formData.get("subjectName") as string;
  const subjectCode = formData.get("subjectCode") as string;
  const subjectClass = formData.get("subjectClass") as string;
  try {
    if (!subjectName) {
      throw new Error("subject Name");
    } else if (!subjectCode) {
      throw new Error("subject subjectCode");
    } else if (!subjectClass) {
      throw new Error("subject subjectClass");
    }
    await prisma.subjectModel.create({
      data: {
        subjectClass: subjectClass,
        subjectCode: subjectCode,
        subjectName: subjectName,
      },
    });
    return "success";
  } catch {
    return "failed";
  } finally {
    revalidatePath("/subjects");
  }
}

export async function getAllSubjectCount() {
  return await prisma.subjectModel.count();
}

export async function getAllSubject() {
  return await prisma.subjectModel.findMany({
    orderBy: {
      subjectName: "asc",
    },
  });
}

// from main dashboard
export async function removeSubjectById(formData: FormData) {
  const subjectId = formData.get("subjectId") as string;
  try {
    if (!subjectId) {
      throw new Error("select subject");
    }
    await prisma.subjectModel.delete({
      where: {
        id: subjectId,
      },
    });
    return "Success";
  } catch {
    return "failed";
  } finally {
    revalidatePath("/");
  }
}
// remove from subject dashboard
export async function removeSubjectByIdFromSD(formData: FormData) {
  const subjectId = formData.get("subjectId") as string;
  try {
    if (!subjectId) {
      throw new Error("select subject");
    }
    await prisma.subjectModel.delete({
      where: {
        id: subjectId,
      },
    });
    return "Success";
  } catch {
    return "failed";
  } finally {
    revalidatePath("/subjects");
  }
}

// teachers subjects Model

export async function getAllTeachersSubjectsByTeacherId(teacherId: string) {
  const a = await prisma.teacherSubjects.findMany({
    where: {
      teacherModelId: teacherId,
    },
    include: {
      subject: true,
    },
  });
  return a;
}

export async function createTeacherSubject(formData: FormData) {
  const subjectId = formData.get("selectedSubjectId") as string;
  const teacherId = formData.get("teacherId") as string;

  try {
    if (!subjectId) {
      throw new Error("failed");
    }
    await prisma.teacherSubjects.create({
      data: {
        subjectModelId: subjectId,
        teacherModelId: teacherId,
      },
    });
    return "success";
  } catch {
    return "failed";
  } finally {
    revalidatePath("/teachers");
  }
}

export async function removeTeacherSubjectById(formData: FormData) {
  const teacherSubjectId = formData.get("teacherSubjectId") as string;
  try {
    if (!teacherSubjectId) {
      throw new Error("failed");
    }
    await prisma.teacherSubjects.delete({
      where: {
        id: teacherSubjectId,
      },
    });
    return "success";
  } catch {
    return "failed";
  } finally {
    revalidatePath("/teacher");
  }
}

export async function getAllTeachersSubjectsByClassName(classNam: string) {
  const a = await prisma.teacherSubjects.findMany({
    where: {
      subject: {
        subjectClass: classNam,
      },
    },
    include: {
      subject: true,
    },
  });
  return a;
}

// timetable model

export async function createTimeTableByClassId(
  classId: string,
  day: string,
  time: string,
  subjectId: string | undefined
) {
  try {
    if (!classId) {
      throw new Error("failed11");
    } else if (!subjectId) {
      throw new Error("failed11");
    }

    // find if time slot exist
    const a = await prisma.timeTableSlot.findFirst({
      where: {
        day: day,
        time: time,
      },
    });

    // if exits create new ttModel
    if (a) {
      console.log("timeslot exist");
      // find ttmodel of that subject and slot exist
      const ttSubSlotExits = await prisma.timeTableModel.findFirst({
        where: {
          classModelId: classId,
          timeTableSlot: {
            day: day,
            time: time,
          },
        },
      });

      // subject not exist in ttmodel then create it
      if (!ttSubSlotExits) {
        console.log("tt subject dont exist");
        const data1 = await prisma.timeTableModel.create({
          data: {
            classModelId: classId,
            teacherSubjectsId: subjectId,
            timeTableSlotId: a.id,
          },
        });
      }
      // update data subject
      else if (ttSubSlotExits.teacherSubjectsId) {
        console.log("tt sub exist so update");
        const data2 = await prisma.timeTableModel.update({
          where: {
            id: ttSubSlotExits.id,
          },
          data: {
            teacherSubjectsId: subjectId,
          },
        });
      }
    }
    // if dont exist
    else {
      console.log("no time slot so create timeslot and ttmodel");
      const createdTT = await prisma.timeTableSlot.create({
        data: {
          day: day,
          time: time,
        },
      });
      await prisma.timeTableModel.create({
        data: {
          classModelId: classId,
          teacherSubjectsId: subjectId,
          timeTableSlotId: createdTT.id,
        },
      });
    }
    return "suceess";
  } catch (e: any) {
    return `failed12 ${e.message}`;
  } finally {
    revalidatePath("/timetables");
  }
}

export async function getTimetableByClassId(classId: string) {
  return await prisma.timeTableModel.findMany({
    where: {
      classModelId: classId,
    },
    include: {
      TeacherSubjects: {
        include: {
          subject: true,
        },
      },
      timeTableSlot: true,
    },
  });
}

export async function removeSubjectOfClassFromTimetableModel(
  day: string,
  time: string,
  classId: string
) {
  try {
    const findTTModel = await prisma.timeTableModel.findFirst({
      where: {
        classModelId: classId,
        timeTableSlot: {
          day: day,
          time: time,
        },
      },
    });
    if (findTTModel) {
      await prisma.timeTableModel.delete({
        where: {
          id: findTTModel.id,
        },
      });
    }
    console.log("deleted");
  } catch {
    return "failed";
  } finally {
    revalidatePath("/timetables/");
  }
}
