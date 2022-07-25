import {nanoid} from 'nanoid/non-secure';
import React, {Dispatch, SetStateAction} from 'react';
import {Mark} from '../types/Mark';

type GradeContextType = [Mark[], Dispatch<SetStateAction<Mark[]>>];
const MarkContext = React.createContext<GradeContextType>([[], () => {}]);

type Props = {children: React.ReactNode};

export default ({children}: Props) => {
  const [marks, setMarks] = React.useState<Mark[]>([
    {id: nanoid(), subjectName: 'Subject 1', mark: 30, totalMark: 50},
  ]);
  const value: GradeContextType = [marks, setMarks];

  return <MarkContext.Provider value={value}>{children}</MarkContext.Provider>;
};

export const useMarks = () => {
  const [marks, setMarks] = React.useContext(MarkContext);

  const addMark = (mark: Omit<Mark, 'id'>) => {
    setMarks(_marks => [..._marks, {id: nanoid(), ...mark}]);
  };

  const editMark = (id: string, mark: Omit<Mark, 'id'>) => {
    setMarks(_marks => _marks.map(m => (m.id === id ? {id, ...mark} : m)));
  };

  const removeMark = (id: string) => {
    setMarks(_marks => _marks.filter(m => m.id !== id));
  };

  const getGrade = () => {
    if (marks.length === 0) {
      return null;
    }

    const percentage =
      marks.map(m => (m.mark * 100) / m.totalMark).reduce((p, c) => p + c, 0) /
      marks.length;
    const grade = _getGrade(percentage);

    return {percentage, grade};
  };

  const _getGrade = (percentage: number) => {
    if (percentage >= 90) {
      return 'S';
    } else if (percentage >= 80) {
      return 'A';
    } else if (percentage >= 70) {
      return 'B';
    } else if (percentage >= 60) {
      return 'C';
    } else if (percentage >= 50) {
      return 'D';
    } else {
      return 'F';
    }
  };

  return {marks, addMark, editMark, removeMark, getGrade};
};
