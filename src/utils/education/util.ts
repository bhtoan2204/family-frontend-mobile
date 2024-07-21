import {Subject} from 'src/interface/education/education';

export const calculateScore = (data: Subject) => {
  if (data.component_scores) {
    let total = 0;
    data.component_scores.forEach(item => {
      if (item.score) total += item.score;
    });
    return total / data.component_scores.length;
  }
  return 0;
};

export const calculateProgress = (data: Subject) => {
  const i = 2; //Điểm của final và midterm
  const isFinalDone = data.final_score ? (data.final_score.score ? 1 : 0) : 0;
  const isMidtermDone = data.midterm_score
    ? data.midterm_score.score
      ? 1
      : 0
    : 0;
  if (data.component_scores) {
    let total = 0;
    data.component_scores.forEach(item => {
      if (item.score) total += 1;
    });
    return (
      ((total + isFinalDone + isMidtermDone) * 100) /
      (data.component_scores.length + i)
    );
  }
  return 0;
};
