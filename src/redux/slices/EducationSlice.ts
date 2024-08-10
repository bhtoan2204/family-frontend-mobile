import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store';
import {Guildline, GuildLineDetail} from 'src/interface/guideline/guideline';
import {
  Education,
  Subject,
  ComponentScore,
} from 'src/interface/education/education';

const initialState: {
  loading: boolean;
  educations: Education[];
} = {
  loading: false,
  educations: [],
};

const educationSlice = createSlice({
  name: 'educations',
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setEducation(state, action: PayloadAction<Education[]>) {
      // return action.payload;
      state.educations = action.payload;
    },
    clearEducation(state) {
      // return [];
      state.educations = [];
    },
    deleteEducation(state, action: PayloadAction<number>) {
      state.educations = state.educations.filter(
        education => education.id_education_progress !== action.payload,
      );
    },
    addEducation(state, action: PayloadAction<Education>) {
      state.educations.unshift(action.payload);
    },
    updateEducation(
      state,
      action: PayloadAction<{
        id_education_progress: number;
        id_family: number;
        title: string;
        progress_notes: string;
        school_info: string;
        is_shared: boolean | null;
      }>,
    ) {
      const index = state.educations.findIndex(
        education =>
          education.id_education_progress ===
          action.payload.id_education_progress,
      );
      if (index !== -1) {
        state.educations[index] = {
          ...state.educations[index],
          title: action.payload.title,
          progress_notes: action.payload.progress_notes,
          school_info: action.payload.school_info,
          is_shared: action.payload.is_shared
            ? action.payload.is_shared
            : state.educations[index].is_shared,
        };
      }
    },
    addSubject(state, action: PayloadAction<Subject>) {
      const index = state.educations.findIndex(
        education =>
          education.id_education_progress ===
          action.payload.id_education_progress,
      );
      if (index !== -1) {
        state.educations[index].subjects.unshift(action.payload);
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
      const index = state.educations.findIndex(
        education =>
          education.id_education_progress ===
          action.payload.id_education_progress,
      );
      if (index !== -1) {
        state.educations[index].subjects = state.educations[
          index
        ].subjects.filter(
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
      const index = state.educations.findIndex(
        education =>
          education.id_education_progress ===
          action.payload.id_education_progress,
      );
      if (index !== -1) {
        const subjectIndex = state.educations[index].subjects.findIndex(
          subject => subject.id_subject === action.payload.id_subject,
        );
        if (subjectIndex !== -1) {
          const newComponentScore: ComponentScore = {
            component_name: action.payload.component_name,
            score: action.payload.score,
          };
          if (
            state.educations[index].subjects[subjectIndex].component_scores ===
            null
          ) {
            state.educations[index].subjects[subjectIndex].component_scores =
              [];
          }
          state.educations[index].subjects[subjectIndex].component_scores.push(
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
      const index = state.educations.findIndex(
        education =>
          education.id_education_progress ===
          action.payload.id_education_progress,
      );
      if (index !== -1) {
        const subjectIndex = state.educations[index].subjects.findIndex(
          subject => subject.id_subject === action.payload.id_subject,
        );
        if (subjectIndex !== -1) {
          state.educations[index].subjects[subjectIndex].component_scores[
            action.payload.index
          ] = {
            // component_name: action.payload.component_name,
            ...state.educations[index].subjects[subjectIndex].component_scores[
              action.payload.index
            ],
            score: action.payload.score,
          };
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
      const index = state.educations.findIndex(
        education =>
          education.id_education_progress ===
          action.payload.id_education_progress,
      );
      if (index !== -1) {
        const subjectIndex = state.educations[index].subjects.findIndex(
          subject => subject.id_subject === action.payload.id_subject,
        );
        if (subjectIndex !== -1) {
          state.educations[index].subjects[subjectIndex].component_scores[
            action.payload.index
          ] = {
            ...state.educations[index].subjects[subjectIndex].component_scores[
              action.payload.index
            ],
            // component_name: action.payload.component_name,
            expected_score: action.payload.score,
          };
        }
      }
    },
    updateNameOfComponentScore(
      state,
      action: PayloadAction<{
        id_subject: number;
        id_education_progress: number;
        index: number;
        name: string;
      }>,
    ) {
      const index = state.educations.findIndex(
        education =>
          education.id_education_progress ===
          action.payload.id_education_progress,
      );
      if (index !== -1) {
        const subjectIndex = state.educations[index].subjects.findIndex(
          subject => subject.id_subject === action.payload.id_subject,
        );
        if (subjectIndex !== -1) {
          state.educations[index].subjects[subjectIndex].component_scores[
            action.payload.index
          ] = {
            ...state.educations[index].subjects[subjectIndex].component_scores[
              action.payload.index
            ],
            component_name: action.payload.name,
          };
        }
      }
    },
    deleteComponentScoreOfSubject(
      state,
      action: PayloadAction<{
        id_subject: number;
        id_education_progress: number;
        index: number;
      }>,
    ) {
      const index = state.educations.findIndex(
        education =>
          education.id_education_progress ===
          action.payload.id_education_progress,
      );
      if (index !== -1) {
        const subjectIndex = state.educations[index].subjects.findIndex(
          subject => subject.id_subject === action.payload.id_subject,
        );
        if (subjectIndex !== -1) {
          state.educations[index].subjects[subjectIndex].component_scores =
            state.educations[index].subjects[
              subjectIndex
            ].component_scores.filter((_, i) => i !== action.payload.index);
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
      const index = state.educations.findIndex(
        education =>
          education.id_education_progress ===
          action.payload.id_education_progress,
      );
      if (index !== -1) {
        const subjectIndex = state.educations[index].subjects.findIndex(
          subject => subject.id_subject === action.payload.id_subject,
        );
        if (subjectIndex !== -1) {
          state.educations[index].subjects[subjectIndex].component_scores[
            action.payload.index
          ] = {
            ...state.educations[index].subjects[subjectIndex].component_scores[
              action.payload.index
            ],
            expected_score: null,
            score: null,
          };
        }
      }
    },
  },
});

export const {
  setLoading,
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
  updateNameOfComponentScore,
  deleteComponentScoreOfSubject,
} = educationSlice.actions;

export default educationSlice.reducer;
