import * as yup from 'yup';

export type markInputType = {
  subjectName: string;
  mark: string;
  totalMark: string;
};

const markValidationSchema = yup.object({
  subjectName: yup.string().required('Subject name is required.'),
  mark: yup
    .string()
    .required('Mark is required.')
    .test(value => /[0-9]*/.test(value || '')),
  totalMark: yup
    .string()
    .required('Mark is required.')
    .test(value => /[0-9]*/.test(value || '')),
});

export default markValidationSchema;
