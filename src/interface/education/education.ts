const data = {
  id_education_progress: 3,
  id_user: 'db31bfb8-ec15-4cb1-9cbe-ebe3edaca323',
  title: 'Học trên trường',
  progress_notes: 'tình hình ko ổn, lười học quá',
  school_info: 'địa chỉ cơ sở 2 nguyễn văn cừ, đh khoa học tự nhiên',
  created_at: '2024-04-09T04:29:20.875Z',
  updated_at: '2024-04-09T04:39:57.716Z',
  avatar: null,
  firstname: 'Tang',
  lastname: 'Long',
  subjects: [
    {
      id_subject: 6,
      subject_name: 'Introduction to Statistics',
    },
    {
      id_subject: 4,
      subject_name: 'Discrete mathematics',
    },
  ],
};
export interface Subject {
  id_subject: number;
  subject_name: string;
}
export interface Education {
  id_education_progress: number;
  id_user: string;
  title: string;
  progress_notes: string;
  school_info: string;
  created_at: string;
  updated_at: string;
  avatar: string | undefined;
  firstname: string;
  lastname: string;
  subjects: Subject[];
}
