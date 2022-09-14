import { useState } from 'react';
import classes from './idle.module.scss';

type IdleProps = {
  onSubmit: (value: string) => void;
};

export const Idle: React.FC<IdleProps> = ({ onSubmit }) => {
  const [value, setValue] = useState('');

  const handleChange = () => {
    return (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setValue(e.target.value);
    };
  };

  const handleSubmit = () => {
    onSubmit(value);
  };

  return (
    <div className={classes.container}>
      <textarea rows={3} value={value} onChange={handleChange()} />
      <button onClick={handleSubmit}>שליחה לעיבוד</button>
    </div>
  );
};
