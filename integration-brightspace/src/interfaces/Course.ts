export interface Course {
  Identifier: string;
  Name: string;
  Code: string;
  IsActive: boolean;
  CanSelfRegister: boolean;
  Description: {
    Text: string;
    Html: string;
  };
  Path: string;
  StartDate: string;
  EndDate: string;
  CourseTemplate: {
    Identifier: string;
    Name: string;
    Code: string;
  };
  Semester: {
    Identifier: string;
    Name: string;
    Code: string;
  };
  Department: {
    Identifier: string;
    Name: string;
    Code: string;
  };
}
