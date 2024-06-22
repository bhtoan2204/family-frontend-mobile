import {Member} from '../member/member';

const dataEducation = {
  id_education_progress: 1,
  id_user: 'db31bfb8-ec15-4cb1-9cbe-ebe3edaca323',
  title: 'Discrete Mathematic',
  progress_notes: 'M',
  school_info: 'Hcmus',
  created_at: '2024-04-30T08:59:03.177Z',
  updated_at: '2024-04-30T08:59:03.177Z',
  avatar: '[NULL]',
  firstname: 'Tang',
  lastname: 'Long',
};

const dataEducationDetail = {
  id_education_progress: 1,
  education_progress_info: {
    id_education_progress: 1,
    id_family: 96,
    id_user: 'db31bfb8-ec15-4cb1-9cbe-ebe3edaca323',
    title: 'Discrete Mathematic',
    progress_notes: 'M',
    created_at: '2024-04-30T08:59:03.17782',
    updated_at: '2024-04-30T08:59:03.17782',
    school_info: 'Hcmus',
  },
  subjects_info: [
    {
      id_subject: 1,
      subject_name: 'Math',
      description: 'Mathematics',
      status: 'in_progress',
    },
    {
      id_subject: 2,
      subject_name: 'Math',
      description: 'Mathematics',
      status: 'in_progress',
    },
  ],
};

const subjectData = {
  id_subject: 1,
  subject_name: 'Math',
  description: 'Mathematics',
  component_scores: null,
  midterm_score: null,
  final_score: null,
  bonus_score: null,
  status: 'in_progress',
};

export interface Education {
  id_education_progress: number;
  id_family: number;
  id_user: string;
  title: string;
  progress_notes: string;
  school_info: string;
  created_at: string;
  updated_at: string;
  subjects: Subject[];
  user: {
    firstname: string;
    lastname: string;
    avatar: string;
    genre?: string | null;
    birthdate?: string | null;
  };
}
export interface EducationDetail {
  id_education_progress: number;
  education_progress_info: {
    id_education_progress: number;
    id_family: number;
    id_user: string;
    title: string;
    progress_notes: string;
    created_at: string;
    updated_at: string;
    school_info: string;
  };
  subjects_info: {
    id_subject: number;
    subject_name: string;
    description: string;
    status: string;
  }[];
}

export interface Subject {
  id_subject: number;
  id_education_progress: number;
  subject_name: string;
  description: string;
  component_scores: ComponentScore[];
  midterm_score: ComponentScore | null;
  final_score: ComponentScore | null;
  // midterm_score?: number | null;
  // final_score?: number | null;
  bonus_score?: number | null;
  status: string;
}

export interface ComponentScore {
  expected_score?: number | null;
  score?: number | null;
  component_name?: string;
  // id_family: number;
  // id_education_progress: number;
  // id_subject: number;
}
