import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store';
import {Guildline, GuildLineDetail} from 'src/interface/guideline/guideline';
import {
  Education,
  Subject,
  ComponentScore,
} from 'src/interface/education/education';

const initialState: Education[] = [];

const educationSlice = createSlice({
  name: 'educations',
  initialState,
  reducers: {
    setEducation(state, action: PayloadAction<Education[]>) {
      const newEducation = action.payload.map(education => {
        return {
          ...education,
          subjects: education.subjects.map(subject => {
            return {
              ...subject,
              midterm_score: {
                component_name: 'Midterm',
                score: subject.midterm_score,
              },
              final_score: {
                component_name: 'Final',
                score: subject.final_score,
              },
            };
          }),
        };
      });
      return action.payload;
    },
    clearEducation(state) {
      state = [];
    },
    deleteEducation(state, action: PayloadAction<number>) {
      return state.filter(
        education => education.id_education_progress !== action.payload,
      );
    },
    addEducation(state, action: PayloadAction<Education>) {
      state.push(action.payload);
    },
    updateEducation(
      state,
      action: PayloadAction<{
        id_education_progress: number;
        id_family: number;
        title: string;
        progress_notes: string;
        school_info: string;
      }>,
    ) {
      const index = state.findIndex(
        education =>
          education.id_education_progress ===
          action.payload.id_education_progress,
      );
      if (index !== -1) {
        state[index] = {
          ...state[index],
          title: action.payload.title,
          progress_notes: action.payload.progress_notes,
          school_info: action.payload.school_info,
        };
      }
    },
    addSubject(state, action: PayloadAction<Subject>) {
      const index = state.findIndex(
        education =>
          education.id_education_progress ===
          action.payload.id_education_progress,
      );
      if (index !== -1) {
        // const newSubject: Subject = {
        //   id_subject: action.payload.id_subject,
        //   id_education_progress: action.payload.id_education_progress,
        //   subject_name: action.payload.subject_name,
        //   description: action.payload.description,
        //   component_scores: [],
        //   midterm_score: null,
        //   final_score: null,
        //   bonus_score: null,
        //   status: 'in_progress',
        // };
        state[index].subjects.push(action.payload);
      }
    },
    deleteSubject(
      state,
      action: PayloadAction<{
        id_education_progress: number;
        id_subject: number;
        id_family: number;
      }>,
    ) {
      const index = state.findIndex(
        education =>
          education.id_education_progress ===
          action.payload.id_education_progress,
      );
      if (index !== -1) {
        state[index].subjects = state[index].subjects.filter(
          subject => subject.id_subject !== action.payload.id_subject,
        );
      }
    },
    addComponentScoreToSubject(
      state,
      action: PayloadAction<{
        id_subject: number;
        score: number | null;
        id_family: number;
        component_name: string;
        id_education_progress: number;
      }>,
    ) {
      const index = state.findIndex(
        education =>
          education.id_education_progress ===
          action.payload.id_education_progress,
      );
      if (index !== -1) {
        const subjectIndex = state[index].subjects.findIndex(
          subject => subject.id_subject === action.payload.id_subject,
        );
        if (subjectIndex !== -1) {
          const newComponentScore: ComponentScore = {
            component_name: action.payload.component_name,
            score: action.payload.score,
          };
          state[index].subjects[subjectIndex].component_scores.push(
            newComponentScore,
          );
        }
      }
    },
    updateComponentScoreOfSubject(
      state,
      action: PayloadAction<{
        id_subject: number;
        id_education_progress: number;
        score: number;
        index: number;
      }>,
    ) {
      const index = state.findIndex(
        education =>
          education.id_education_progress ===
          action.payload.id_education_progress,
      );
      if (index !== -1) {
        const subjectIndex = state[index].subjects.findIndex(
          subject => subject.id_subject === action.payload.id_subject,
        );
        if (subjectIndex !== -1) {
          if (action.payload.index == -1) {
            state[index].subjects[subjectIndex].final_score = {
              ...state[index].subjects[subjectIndex].final_score,
              score: action.payload.score,
            };
          } else if (action.payload.index == -2) {
            state[index].subjects[subjectIndex].midterm_score = {
              ...state[index].subjects[subjectIndex].midterm_score,
              score: action.payload.score,
            };
          } else {
            state[index].subjects[subjectIndex].component_scores[
              action.payload.index
            ] = {
              // component_name: action.payload.component_name,
              ...state[index].subjects[subjectIndex].component_scores[
                action.payload.index
              ],
              score: action.payload.score,
            };
          }
        }
      }
    },
    updateExpectedScoreOfSubject(
      state,
      action: PayloadAction<{
        id_subject: number;
        id_education_progress: number;
        score: number;
        index: number;
      }>,
    ) {
      const index = state.findIndex(
        education =>
          education.id_education_progress ===
          action.payload.id_education_progress,
      );
      if (index !== -1) {
        const subjectIndex = state[index].subjects.findIndex(
          subject => subject.id_subject === action.payload.id_subject,
        );
        if (subjectIndex !== -1) {
          if (action.payload.index === -1) {
            state[index].subjects[subjectIndex].final_score = {
              ...state[index].subjects[subjectIndex].final_score,
              score: action.payload.score,
            };
          } else if (action.payload.index === -2) {
            state[index].subjects[subjectIndex].midterm_score = {
              ...state[index].subjects[subjectIndex].midterm_score,
              score: action.payload.score,
            };
          } else {
            state[index].subjects[subjectIndex].component_scores[
              action.payload.index
            ] = {
              ...state[index].subjects[subjectIndex].component_scores[
                action.payload.index
              ],
              // component_name: action.payload.component_name,
              expected_score: action.payload.score,
            };
          }
        }
      }
    },
    // updateMidtermScoreOfSubject(state,action:PayloadAction){},
    clearScoreOfSubject(
      state,
      action: PayloadAction<{
        id_subject: number;
        id_education_progress: number;
        index: number;
      }>,
    ) {
      const index = state.findIndex(
        education =>
          education.id_education_progress ===
          action.payload.id_education_progress,
      );
      if (index !== -1) {
        const subjectIndex = state[index].subjects.findIndex(
          subject => subject.id_subject === action.payload.id_subject,
        );
        if (subjectIndex !== -1) {
          if (action.payload.index === -1) {
            state[index].subjects[subjectIndex].final_score = {
              ...state[index].subjects[subjectIndex].final_score,
              score: null,
            };
          } else if (action.payload.index === -2) {
            state[index].subjects[subjectIndex].midterm_score = {
              ...state[index].subjects[subjectIndex].midterm_score,
              score: null,
            };
          } else {
            state[index].subjects[subjectIndex].component_scores[
              action.payload.index
            ] = {
              ...state[index].subjects[subjectIndex].component_scores[
                action.payload.index
              ],
              expected_score: null,
              score: null,
            };
          }
        }
      }
    },
  },
});

export const {
  setEducation,
  clearEducation,
  deleteEducation,
  addEducation,
  updateEducation,
  addSubject,
  deleteSubject,
  addComponentScoreToSubject,
  updateComponentScoreOfSubject,
  updateExpectedScoreOfSubject,
  clearScoreOfSubject,
} = educationSlice.actions;

export default educationSlice.reducer;
